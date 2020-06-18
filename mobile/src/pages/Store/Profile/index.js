import React, { useState, useEffect } from 'react';
import { Text, SafeAreaView, ScrollView } from 'react-native';
import styles from '../../../global';
import { Header } from '../../../components/Header';
import Loading from '../../../components/Loading';
import { Input, TextArea } from '../../../components/Input';
import { Avatar } from '../../../components/Item';
import { Button } from '../../../components/Button';
import apiReq from '../../../services/reqToken';
import { API_DOMAIN } from '../../../constants/api';

import { format } from '@buttercup/react-formatted-input';
import { WhatsappFormat, PhoneFormat } from '../../../utils/treatString';

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
    const [ pickedImage, setPickedImage ] = useState(false);
    const [ status, setStatus ] = useState();


    async function loadProfile() {
        
        const { data } = await apiReq.get('profile');

        if(data.avatar) {
            setAvatar({uri: `${API_DOMAIN}/uploads/${data.avatar}`});
            setFileName(data.avatar)    
        }
        
        setName(data.name);
        setDescription(data.description);
        setWhatsapp(format(data.whatsapp, WhatsappFormat));
        setPhone(format(data.phone, PhoneFormat));
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

        setStatus('loading');

        if(pickedImage) setFileName(await uploadImage(avatar))

        const { data } = await apiReq.post('profile', {
            avatar: fileName,
            name,
            description,
            whatsapp: whatsapp.raw,
            phone: phone.raw,
            tags
        });

        if(data.error) {
            setStatus();
            setAlert(data.error);
            return;
        };

        setStatus('done');

        setTimeout(() => { navigation.navigate('StorePanel') }, 500);
    }

    const maskWhatsapp = phone => setWhatsapp(format(phone, WhatsappFormat))
    const maskPhone = phone => setPhone(format(phone, PhoneFormat))

    if(!loadedPage) return <Loading />

    return(
        <SafeAreaView style={styles.container}>

            <Header title={'perfil'}/>

            <ScrollView
                style={styles.column}
                showsVerticalScrollIndicator={false}
            >

                <Avatar
                    image={avatar}
                    title={name}
                    subtitle={whatsapp.formatted}
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
                    default={whatsapp.formatted}
                    action={number => maskWhatsapp(number)}
                    keyboard={'phone-pad'}
                    maxLength={16}
                    error={alert}
                />
                <Input
                    title={'Telefone'}
                    default={phone.formatted}
                    action={number => maskPhone(number)}
                    keyboard={'numeric'}
                    maxLength={14}
                />
                <TextArea
                    title={'Principais Produtos'}
                    default={tags}
                    action={e => setTags(e)}
                    placeholder={'ex:  sapato, camisa, meia, tênis, calça, bermuda'}
                />
                <Button action={handleUpdate} title={'Salvar'} status={status}/>
            </ScrollView>
        
        </SafeAreaView>
    )        
}
