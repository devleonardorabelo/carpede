import React, { useState, useEffect } from 'react';
import { Text, SafeAreaView, ScrollView } from 'react-native';
import styles from '../../global';
import Header from '../../../components/Header';
import Loading from '../../../components/Loading';
import { Input, TextArea } from '../../../components/Input';
import { Avatar } from '../../../components/Item';
import { Button } from '../../../components/Button';
import apiReq from '../../../services/reqToken';
import { API_DOMAIN } from '../../../constants/api';

import { imagePicker, uploadImage } from '../../../utils/ImagePicker';

export default function Profile() {
    
    const [ name, setName ] = useState('');
    const [ avatar, setAvatar ] = useState();
    const [ fileName, setFileName ] = useState();
    const [ description, setDescription ] = useState('');
    const [ whatsapp, setWhatsapp ] = useState('');
    const [ phone, setPhone ] = useState('');
    const [ tags, setTags ] = useState('');
    const [ alert, setAlert ] = useState();
    const [ loadedPage, setLoadedPage ] = useState(false);
    const [ done, setDone ] = useState(false);
    const [ pickedImage, setPickedImage ] = useState(false);

    async function loadProfile() {
        
        const { data } = await apiReq.get('profile');

        if(data.avatar) {
            setAvatar({uri: `${API_DOMAIN}/uploads/${data.avatar}`});
            setFileName(data.avatar)    
        } 
        setName(data.name);
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
        setPickedImage(true);
    }

    async function handleUpdate() {

        setDone(true);

        if(pickedImage) setFileName(await uploadImage(avatar))

        const { data } = await apiReq.post('profile', {
            avatar: fileName,
            name,
            description,
            whatsapp,
            phone,
            tags
        });

        if(data.error) {
            setDone(false);
            setAlert(data.error);
            return;
        };

        setDone(false);

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
                        name={'name'}
                        default={name}
                        action={e => setName(e)}
                        error={alert}
                    />
                    <TextArea
                        title={'Descrição'}
                        default={description}
                        action={e => setDescription(e)}
                    />
                    <Input
                        title={'Whatsapp'}
                        name={'whatsapp'}
                        default={whatsapp}
                        action={e => setWhatsapp(e)}
                        keyboard={'numeric'}
                        maxLength={11}
                        error={alert}
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
        </>
            ) : (
            <Loading />            
        )}
    </>)        
}
