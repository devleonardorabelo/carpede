import React, { useState } from 'react';
import { View, Text, AsyncStorage, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../../global';
import api from '../../../services/api';

import { Header } from '../../../components/Header'; 
import { InputPassword, Input } from '../../../components/Input';
import { Button, ButtonTransparent } from "../../../components/Button";;

export default function Signin(){

    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ alert, setAlert ] = useState();
    const [ status, setStatus ] = useState();
    const navigation = useNavigation();

    async function saveUser(store) {

        await AsyncStorage.clear();
        await AsyncStorage.setItem('@Carpede:storeToken', store);
        
        return navigation.navigate('StorePanel');

    }

    async function handleSignin() {

        setStatus('loading');

        const { data } = await api.post('signin', { email, password });
        if(data.error) {
            setStatus();
            setAlert(data.error);
            return;
        };
        const store = data;
        setStatus('done');
        await saveUser(store);

    }

    const navigateToSignup = () => navigation.navigate('StoreSignup')

    return(<>
        <SafeAreaView style={styles.container}>
            <Header title={'entrar'}/>
            <View style={styles.column}>
                <Text style={[styles.title,{ marginBottom: 16 }]}>Entre na sua conta</Text>
                <Input
                    title={'Email'}
                    name={'email'}
                    action={email => setEmail(email)}
                    capitalize={'none'}
                    focus={true}
                    maxLength={30}
                    error={alert}
                />
                <InputPassword
                    title={'Senha'}
                    name={'password'}
                    action={password => setPassword(password)}
                    error={alert}
                />
                <Button action={handleSignin} title={'Entrar'} status={status}/>
                <ButtonTransparent action={navigateToSignup} title={'Quero criar uma conta'} icon='account-plus-outline' />
            </View>
            
        </SafeAreaView>
    </>)
}