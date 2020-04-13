import React, { useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Button, AsyncStorage } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Header from '../../../components/Header'; 
import Input from '../../../components/Input';
import styles from '../../global';
import api from '../../../services/axios';
import { Form } from '@unform/core';

export default function Signin({ onSubmit, initialValues }){

    const navigation = useNavigation();

    function navigateToSignup() {
        navigation.navigate('StoreSignup');
    }

    const formRef = useRef(null);

    async function handleSubmit(data) {
        const response = await api.post('signin', data);
        await AsyncStorage.setItem('@Carpede:storeToken', JSON.stringify(response.data));

        navigation.navigate('StorePanel')
        
    }

    return (
        <View style={styles.container}>
            <Header title={'Entrar na minha conta'} />
            <Form ref={formRef} onSubmit={handleSubmit}>
                <View style={styles.groupInput}>
                    <Text style={styles.labelInput}>seu email</Text>
                    <Input style={styles.textInput} name={'email'}/>
                </View>
                <View style={styles.groupInput}>
                    <Text style={styles.labelInput}>sua senha</Text>
                    <Input style={styles.textInput} name={'password'}/>
                </View>
                <TouchableOpacity style={styles.buttonGreen} onPress={() => formRef.current.submitForm()}>
                    <Text style={styles.buttonWhiteText}>Entrar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonTransparent} onPress={navigateToSignup}>
                    <Text style={styles.buttonBlackText}>Quero criar uma conta</Text>
                </TouchableOpacity>
            </Form>
        </View>
    )
}