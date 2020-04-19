import React, { useState } from 'react';
import { View, Image, TextInput, Text, TouchableOpacity, AsyncStorage } from 'react-native';
import Header from '../../../components/Header'
import api from '../../../services/axios'
import { useNavigation } from '@react-navigation/native'

import styles from '../../global';

import product from '../../../assets/more/upload.png';

export default function NewProduct() {

    const navigation = useNavigation();

    const [ name, setName ] = useState('');
    const [ price, setPrice ] = useState('');
    const [ alert, setAlert ] = useState('');
    const [ alertZ, setAlertZ ] = useState(-999);

    async function handleNewProduct() {
        const storeToken = await AsyncStorage.getItem('@Carpede:storeToken');
        const { data } = await api.post('products/new',{
            name,
            price
        }, { headers : { 'Authorization': `Bearer ${storeToken}` } })

        if(data.error !== undefined) {
            setAlert(data.error);
            setAlertZ(999);

            return setTimeout(() => {
                setAlertZ(-999);
            }, 3000)

        };

       navigation.navigate('StoreProducts', { new: true })

    }

    return(<>
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
        <View style={[styles.alertError, { zIndex: alertZ }]}>
            <Text style={styles.alertText}>{alert}</Text>
        </View>
    </>)
}