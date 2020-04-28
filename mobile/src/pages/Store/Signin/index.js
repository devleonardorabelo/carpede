import React, { useState } from 'react';
import { View, Text, AsyncStorage } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../../global';
import api from '../../../services/api';

import Alert from '../../../components/Alert';
import Header from '../../../components/Header'; 
import { InputPassword, Input } from '../../../components/Input';
import { Button, ButtonTransparent } from "../../../components/Button";;

export default function Signin(){

    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ done, setDone ] = useState(false);
    const [ alertShow, setAlertShow ] = useState(false);
    const [ alert, setAlert ] = useState('');

    const navigation = useNavigation();

    async function saveUser(store) {

        await AsyncStorage.clear();
        await AsyncStorage.setItem('@Carpede:storeToken', store);
        setDone(false);
        return navigation.navigate('StorePanel');

    }

    async function handleSignin() {

        setDone(true);
        const { data } = await api.post('signin', { email, password });
        if(data.error !== undefined) {
            setDone(false);
            setAlert(data.error);
            setAlertShow(true);
            return setTimeout(() => {
                setAlertShow(false);
            }, 3000)
        };
        const store = data;
        await saveUser(store);

    }

    const navigateToSignup = () => navigation.navigate('StoreSignup')

    return(<>
        <View style={styles.container}>
            <Header />
            <Text style={styles.title}>Entrar</Text>
            <Input
                title={'Email'}
                action={email => setEmail(email)}
                capitalize={'none'}
                focus={true}
            />
            <InputPassword
                title={'Senha'}
                action={password => setPassword(password)}
            />
            <Button action={handleSignin} title={'Entrar'} done={done}/>
            <ButtonTransparent action={navigateToSignup} title={'Quer criar uma conta'} icon='arrow-right' />
        </View>
        <Alert show={alertShow} alert={alert}/>
    </>)
}