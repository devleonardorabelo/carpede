import React, { useState } from 'react';
import { View, Image, TextInput, Text, TouchableOpacity, AsyncStorage } from 'react-native';
import Header from '../../../components/Header'
import api from '../../../services/axios'

import styles from '../../global';

import product from '../../../assets/more/upload.png';

export default function NewProduct() {

    const [ name, setName ] = useState('');
    const [ price, setPrice ] = useState('');

    async function handleNewProduct() {
        const storeToken = await AsyncStorage.getItem('@Carpede:storeToken');
        const { data } = await api.post('products/new',{
            name,
            price
        }, { headers : { 'Authorization': `Bearer ${storeToken}` } })

        console.log(data)

    }

    return(
        <View style={styles.container}>
            <Header title={'Novo Produto'}/>
            <Image source={product} style={styles.fullImage}/>
            <View style={styles.groupInput}>
                <Text style={styles.labelInput}>Nome do Produto</Text>
                <TextInput
                    style={styles.textInput}
                    onChangeText={e => setName(e)}
                />
            </View>
            <View style={styles.groupInput}>
                <Text style={styles.labelInput}>Preço</Text>
                <TextInput
                    style={[styles.textInput, { width: 100 }]}
                    onChangeText={e => setPrice(e)}
                    keyboardType={'decimal-pad'}
                />
            </View>
            <TouchableOpacity style={styles.buttonGreen} onPress={handleNewProduct}>
                <Text style={styles.buttonWhiteText}>Salvar</Text>
            </TouchableOpacity>
        </View>
    )
}