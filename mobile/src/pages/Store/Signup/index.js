import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Header from '../../../components/Header'; 
import styles from '../../global';

export default function Signup(){
    
    const navigation = useNavigation();

    function navigateToSignin() {
        navigation.navigate('StoreSignin');
    }
    function handleSignup() {
        navigation.navigate('StorePanel');
    }

    return (
        <View style={styles.container}>
            <Header title={'Cadastre sua loja'} />
            <View style={styles.groupInput}>
                <Text style={styles.labelInput}>Nome da loja</Text>
                <TextInput
                    style={styles.textInput}
                    placeholder={'ex: Pizzaria do João'}
                />
            </View>
            <View style={styles.groupInput}>
                <Text style={styles.labelInput}>Email</Text>
                <TextInput
                    style={styles.textInput}
                    placeholder={'seu email'}
                />
            </View>
            <View style={styles.groupInput}>
                <Text style={styles.labelInput}>Senha</Text>
                <TextInput
                    style={styles.textInput}
                    placeholder={'sua senha'}
                />
            </View>
            <TouchableOpacity style={styles.buttonOrange} onPress={handleSignup}>
                <Text style={styles.buttonWhiteText}>Pronto!</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonTransparent} onPress={navigateToSignin}>
                <Text style={styles.buttonBlackText}>Já tenho uma conta</Text>
            </TouchableOpacity>
        </View>
    )
}