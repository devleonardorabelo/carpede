import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, AsyncStorage } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Header from '../../../components/Header'; 
import styles from '../../global';
import api from '../../../services/axios';

export default function Signup(){
    
    const navigation = useNavigation();

    const [ name, setName ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ whatsapp, setWhatsapp ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ alertZ, setAlertZ ] = useState(-999);
    const [ alert, setAlert ] = useState('');

    async function saveUser(store) {
        await AsyncStorage.clear();
        await AsyncStorage.setItem('@Carpede:storeToken', store);
        return navigation.navigate('StorePanel');
    }

    async function handleSignup() {
        


        const { data } = await api.post('signup',
            {
                name,
                whatsapp,
                email,
                password
            }
        );

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

    function navigateToSignin() {
        navigation.navigate('StoreSignin');
    }

    return (<>
        <View style={styles.container}>
            <Header title={'Cadastre sua loja'} />
            <View style={styles.groupInput}>
                <Text style={styles.labelInput}>Nome da loja</Text>
                <TextInput
                    style={styles.textInput}
                    placeholder={'ex: Pizzaria do João'}
                    onChangeText={e => setName(e)}
                    autoFocus={true}
                />
            </View>
            <View style={styles.groupInput}>
                <Text style={styles.labelInput}>Whatsapp</Text>
                <TextInput
                    style={styles.textInput}
                    placeholder={'ex: Pizzaria do João'}
                    onChangeText={e => setWhatsapp(e)}
                    keyboardType={'numeric'}
                    maxLength={11}
                />
            </View>
            <View style={styles.groupInput}>
                <Text style={styles.labelInput}>Email</Text>
                <TextInput
                    style={styles.textInput}
                    placeholder={'seu email'}
                    onChangeText={e => setEmail(e)}
                    autoCapitalize={'none'}
                />
            </View>
            <View style={styles.groupInput}>
                <Text style={styles.labelInput}>Senha</Text>
                <TextInput
                    style={styles.textInput}
                    placeholder={'sua senha'}
                    onChangeText={e => setPassword(e)}
                    secureTextEntry={true}
                    password={true}
                />
            </View>
            <TouchableOpacity style={styles.buttonGreen} onPress={handleSignup}>
                <Text style={styles.buttonWhiteText}>Pronto!</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonTransparent} onPress={navigateToSignin}>
                <Text style={styles.buttonBlackText}>Já tenho uma conta</Text>
            </TouchableOpacity>
        </View>
        <View style={[styles.alertError, { zIndex: alertZ }]}>
            <Text style={styles.alertText}>{alert}</Text>
        </View>
    </>)
}