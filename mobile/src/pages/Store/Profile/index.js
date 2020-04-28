import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, ScrollView, AsyncStorage } from 'react-native';
import api from '../../../services/api';

import styles from '../../global';
import Header from '../../../components/Header';
import Loading from '../../../components/Loading';
import Alert from '../../../components/Alert';
import { Input, TextArea } from '../../../components/Input';
import { Button } from '../../../components/Button';
import apiReq from '../../../services/reqToken';

export default function Profile() {

    const [ name, setName ] = useState('');
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
        
        const { data } = await apiReq.post('profile', {
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
            <Alert show={alertShow} alert={alert} error={alertError}/>
        </>
            ) : (
            <Loading />            
        )}
    </>)        
}
