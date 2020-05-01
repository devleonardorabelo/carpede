import React, { useState, useEffect } from 'react';
import { Text, SafeAreaView, ScrollView, AsyncStorage } from 'react-native';
import styles from '../../global';
import Header from '../../../components/Header';
import Loading from '../../../components/Loading';
import Alert from '../../../components/Alert';
import { Input, TextArea } from '../../../components/Input';
import { Avatar } from '../../../components/Item';
import { Button } from '../../../components/Button';
import apiReq from '../../../services/reqToken';
import { API_DOMAIN } from '../../../constants/api';

import { imagePicker, uploadImage } from '../../../utils/ImagePicker';

export default function Profile() {
    
    const [ name, setName ] = useState('');
    const [ avatar, setAvatar ] = useState();
    const [ description, setDescription ] = useState('');
    const [ whatsapp, setWhatsapp ] = useState('');
    const [ phone, setPhone ] = useState('');
    const [ tags, setTags ] = useState('');
    const [ alert, setAlert ] = useState('');
    const [ alertShow, setAlertShow ] = useState(false);
    const [ alertError, setAlertError ] = useState(false);
    const [ loadedPage, setLoadedPage ] = useState(false);
    const [ done, setDone ] = useState(false);

    async function loadProfile() {
        
        const { data } = await apiReq.get('profile');

        if(data.avatar) {
            var currentAvatar = {uri: `${API_DOMAIN}/uploads/${data.avatar}`}
        } else {
            var currentAvatar;
        }

        setName(data.name);
        setAvatar(currentAvatar);
        setDescription(data.description);
        setWhatsapp(data.whatsapp);
        setPhone(data.phone);
        setTags(data.tags);
        setLoadedPage(true);
    }

    useEffect(() => {
        loadProfile();
    }, [])

    const getImage = async () => {
        let picker = await imagePicker();
        if(!picker) return;
        setAvatar({ uri: picker });
    }

    async function handleUpdate() {

        setDone(true);

        if(avatar === currentAvatar) {
            var image = avatar
        } else {
            var image = await uploadImage(avatar)
        }

        const { data } = await apiReq.post('profile', {
            avatar: image,
            name,
            description,
            whatsapp,
            phone,
            tags
        });

        if(data.status !== undefined) {
            setAlert(data.status);
            setAlertError(false);
        }
        if(data.error !== undefined){
            setAlert(data.error);
            setAlertError(true);
        }

        setDone(false);

        setAlertShow(true);

        return setTimeout(() => {
            setAlertShow(false);
        }, 2000)

    }
    return(<>
        {loadedPage ? (
        <>
            <SafeAreaView style={styles.container}>
                <Header/>
                <ScrollView
                    style={styles.scrollView}
                    showsVerticalScrollIndicator={false}
                >
                    <Text style={styles.title}>Perfil</Text>
                    <Avatar
                        image={avatar}
                        title={name}
                        subtitle={whatsapp}
                        action={getImage}
                        icon='image'
                        transparent={avatar}
                        isChangeable
				    />
                    <Input
                        title={'Nome da Loja'}
                        default={name}
                        action={e => setName(e)}
                    />
                    <TextArea
                        title={'Descrição'}
                        default={description}
                        action={e => setDescription(e)}
                    />
                    <Input
                        title={'Whatsapp'}
                        default={whatsapp}
                        action={e => setWhatsapp(e)}
                        keyboard={'numeric'}
                        maxLength={11}
                    />
                    <Input
                        title={'Telefone'}
                        default={phone}
                        action={e => setPhone(e)}
                        keyboard={'numeric'}
                        maxLength={11}
                    />
                    <TextArea
                        title={'Principais Produtos'}
                        default={tags}
                        action={e => setTags(e)}
                        placeholder={'ex:  sapato, camisa, meia, tênis, calça, bermuda'}
                    />
                    <Button action={handleUpdate} title={'Salvar'} done={done}/>
                </ScrollView>
            </SafeAreaView>
            <Alert show={alertShow} alert={alert} error={alertError}/>
        </>
            ) : (
            <Loading />            
        )}
    </>)        
}
