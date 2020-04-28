import React, { useState } from 'react';
import { View, Text, AsyncStorage } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../../global';
import api from '../../../services/api';

import Header from '../../../components/Header';
import Alert from '../../../components/Alert'; 
import { Input, InputPassword } from '../../../components/Input';
import { Button, ButtonTransparent } from '../../../components/Button';

export default function Signup(){
    
    const navigation = useNavigation();

    const [ name, setName ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ whatsapp, setWhatsapp ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ alertShow, setAlertShow ] = useState(false);
    const [ alert, setAlert ] = useState('');
    const [ done, setDone ] = useState(false);

    async function saveUser(store) {
        await AsyncStorage.clear();
        await AsyncStorage.setItem('@Carpede:storeToken', store);
        setDone(false);
        return navigation.navigate('StorePanel');
    }

    async function handleSignup() {

        setDone(true);
        const { data } = await api.post('signup', {name,whatsapp,email,password});

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

    function navigateToSignin() {
        navigation.navigate('StoreSignin');
    }

    return (<>
        <View style={styles.container}>
            <Header/>
            <Text style={styles.title}>Criar uma conta</Text>
            <Input
                title={'Nome da Loja'}
                placeholder={'Pizzaria do João'}
                action={e => setName(e)}
                focus={true}
            />
            <Input
                title={'Whatsapp'}
                placeholder={'01234567890'}
                action={e => setWhatsapp(e)}
                keyboard={'numeric'}
            />
            <Input
                title={'Email'}
                placeholder={'email@email.com'}
                action={e => setEmail(e)}
            />
            <InputPassword
                title={'Senha'}
                placeholder={'* * * * * * * *'}
                action={e => setPassword(e)}
            />
            <Button action={handleSignup} title={'Começar agora!'} done={done}/>
            <ButtonTransparent action={navigateToSignin} title={'Já tenho uma conta'} icon={'log-in'} />
        </View>
        <Alert show={alertShow} alert={alert}/>
    </>)
}