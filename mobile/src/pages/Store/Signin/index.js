import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, AsyncStorage, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome5 as FA, MaterialIcons as MI } from '@expo/vector-icons'
import Header from '../../../components/Header'; 
import styles from '../../global';
import api from '../../../services/axios';
import email from '../../../assets/more/mail.svg'

export default function Signin(){

    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ done, setDone ] = useState(false);
    const [ alertZ, setAlertZ ] = useState(-999);
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
                <View style={styles.boxInput}>
                    <MI
                        style={styles.iconInput}
                        name='mail'
                        size={16}
                        color='#585858'
                    />
                    <TextInput
                        style={styles.textInput}
                        onChangeText={email => setEmail(email)}
                        autoCapitalize='none'
                        autoFocus={true}                    
                    />    
                </View>
            </View>
            <View style={styles.groupInput}>
                <Text style={styles.labelInput}>Sua senha</Text>
                <View style={styles.boxInput}>
                    <FA
                        style={styles.iconInput}
                        name='lock'
                        size={16}
                        color='#585858'
                    />
                    <TextInput 
                        style={styles.textInput} 
                        onChangeText={password => setPassword(password)}
                        secureTextEntry={true}
                        password={true}
                    />
                </View>
                
            </View>
            <TouchableOpacity style={[styles.buttonGreen, { backgroundColor: done ? '#BACFC3' : '#6FCF97' }]} onPress={handleSignin} disabled={done}>
                {done ?
                    <ActivityIndicator size="large" color="#fff" />
                : (
                    <Text style={styles.buttonWhiteText}>Entrar</Text>
                )}
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonTransparent} onPress={navigateToSignup}>
                <FA
                    style={{ paddingRight: 5 }}
                    name='arrow-right'
                    size={16}
                    color='#585858'
                />
                <Text style={styles.buttonBlackText}>Quero criar uma conta</Text>
            </TouchableOpacity>
        </View>
        <View style={[styles.alertError, { zIndex: alertZ }]}>
            <Text style={styles.alertText}>{alert}</Text>
        </View>
    </>)
}