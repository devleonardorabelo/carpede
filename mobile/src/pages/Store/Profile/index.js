import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, ScrollView, AsyncStorage } from 'react-native';
import api from '../../../services/axios';

import styles from '../../global';
import Header from '../../../components/Header';
import Loading from '../../../components/Loading';
import { Input, TextArea } from '../../../components/Input';
import { Button } from '../../../components/Button';

export default function Profile() {

    const [ name, setName ] = useState('');
    const [ description, setDescription ] = useState('');
    const [ whatsapp, setWhatsapp ] = useState('');
    const [ phone, setPhone ] = useState('');
    const [ tags, setTags ] = useState('');
    const [ status, setStatus ] = useState('');
    const [ alertZ, setAlertZ ] = useState(-999);
    const [ alertColor, setAlertColor ] = useState('');
    const [ loadedPage, setLoadedPage ] = useState(false);
    const [ done, setDone ] = useState(false);

    async function loadProfile() {
        
        const storeToken = await AsyncStorage.getItem('@Carpede:storeToken');
        const { data } = await api.get('profile', { headers : { 'Authorization': `Bearer ${storeToken}` } });

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

    async function handleUpdate() {
        
        setDone(true);

        const storeToken = await AsyncStorage.getItem('@Carpede:storeToken');
        
        const { data } = await api.post('profile', {
            name,
            description,
            whatsapp,
            phone,
            tags
        } , { headers: { 'Authorization': `Bearer ${storeToken}` } });

        if(data.status !== undefined) {
            setDone(false);
            setStatus(data.status);
            setAlertColor('#6FCF97');
        }
        if(data.error !== undefined){
            setStatus(data.error);
            setAlertColor('#FF3A4F');
        }

        setAlertZ(999);

        return setTimeout(() => {
            setAlertZ(-999);
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
                    />
                    <Input
                        title={'Telefone'}
                        default={phone}
                        action={e => setPhone(e)}
                        keyboard={'numeric'}
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
            <View style={[styles.alertError, { zIndex: alertZ, backgroundColor: `${alertColor}` }]}>
                <Text style={styles.alertText}>{status}</Text>
            </View>
        </>
            ) : (
            <Loading />            
        )}
    </>)        
}
