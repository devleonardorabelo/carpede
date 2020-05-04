import React, { useState } from 'react';
import { View, Text, AsyncStorage } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../../global';
import api from '../../../services/api';

import Header from '../../../components/Header'; 
import { InputPassword, Input } from '../../../components/Input';
import { Button, ButtonTransparent } from "../../../components/Button";;

export default function Signin(){

    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ done, setDone ] = useState(false);
    const [ alert, setAlert ] = useState();

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
        if(data.error) {
            setDone(false);
            setAlert(data.error);
            return;
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
            <Button action={handleSignin} title={'Entrar'} done={done}/>
            <ButtonTransparent action={navigateToSignup} title={'Quer criar uma conta'} icon='arrow-right' />
        </View>
    </>)
}