import React, { useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Button, AsyncStorage } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Header from '../../../components/Header'; 
import styles from '../../global';
import api from '../../../services/axios';


export default function Signin(){

    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ alertZ, setAlertZ ] = useState(-999);
    const [ alert, setAlert ] = useState('');

    const navigation = useNavigation();

    async function saveUser(store) {
        await AsyncStorage.clear();
        await AsyncStorage.setItem('@Carpede:storeToken', store);
        return navigation.navigate('StorePanel');
    }
    async function handleSignin() {
        const { data } = await api.post('signin', { email, password });

        if(data.error !== undefined) {
            setAlert(data.error);
            setAlertZ(999);

            return setTimeout(() => {
                setAlertZ(-999);
            }, 3000)

        };

        const store = data;

        await saveUser(store);
    }

    function navigateToSignup() {
        navigation.navigate('StoreSignup')
    }

    return(<>
        <View style={styles.container}>
            <Header title={'Entrar na minha conta'} />
            <View style={styles.groupInput}>
                <Text style={styles.labelInput}>Seu email</Text>
                <TextInput
                    style={styles.textInput}
                    onChangeText={email => setEmail(email)}
                    autoCapitalize='none'
                    autoFocus={true}
                />
            </View>
            <View style={styles.groupInput}>
                <Text style={styles.labelInput}>Sua senha</Text>
                <TextInput 
                    style={styles.textInput} 
                    onChangeText={password => setPassword(password)}
                    secureTextEntry={true}
                    password={true}
                />
            </View>
            <TouchableOpacity style={styles.buttonGreen} onPress={handleSignin}>
                <Text style={styles.buttonWhiteText}>Entrar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonTransparent} onPress={navigateToSignup}>
                <Text style={styles.buttonBlackText}>Quero criar uma conta</Text>
            </TouchableOpacity>
        </View>
        <View style={[styles.alertError, { zIndex: alertZ }]}>
            <Text style={styles.alertText}>{alert}</Text>
        </View>
    </>)
}