import React, { useState } from 'react';
import { View, Image, TextInput, Text, TouchableOpacity, AsyncStorage, Alert } from 'react-native';
import Header from '../../../components/Header'
import { useRoute, useNavigation } from '@react-navigation/native';
import api from '../../../services/axios';
import { FontAwesome5 as FA } from '@expo/vector-icons'

import styles from '../../global';

import productImage from '../../../assets/uploads/1.png';

export default function EditProduct() {

    const route = useRoute();
    const product = route.params.product;
    const navigation = useNavigation();

    const [ name, setName ] = useState(product.name);
    const [ price, setPrice ] = useState(product.price);
    const [ status, setStatus ] = useState('');
    const [ alertZ, setAlertZ ] = useState(-999);
    const [ alertColor, setAlertColor ] = useState('');

    async function handleUpdate(id) {
        
        const storeToken = await AsyncStorage.getItem('@Carpede:storeToken');
        
        const { data } = await api.post('products/edit', {
            id,
            name,
            price
        } , { headers: { 'Authorization': `Bearer ${storeToken}` } });

        if(data.status !== undefined) {
            setStatus(data.status);
            setAlertColor('#6FCF97');
        }
        if(data.error !== undefined){
            setStatus(data.error);
            setAlertColor('#FF3A4F');
        }

        setAlertZ(999);

        setTimeout(() => {
            setAlertZ(-999);
            if(data.status !== undefined) navigation.navigate('StoreProducts')
        }, 1000)


    }

    async function handleDelete(id) {

        const storeToken = await AsyncStorage.getItem('@Carpede:storeToken');
        const { data } = await api.post('products/delete', {
            id
        } , { headers: { 'Authorization': `Bearer ${storeToken}` } });

        if(data.status !== undefined) {
            setStatus(data.status);
            setAlertColor('#6FCF97');
        }
        if(data.error !== undefined){
            setStatus(data.error);
            setAlertColor('#FF3A4F');
        }

        setAlertZ(999);

        setTimeout(() => {
            setAlertZ(-999);
            if(data.status !== undefined) navigation.navigate('StoreProducts')
        }, 1000)

    }

    return(<>
        <View style={styles.container}>
            <Header title={'Editar Produto'}/>
            <Image source={productImage} style={styles.fullImage}/>
            <View style={styles.groupInput}>
                <Text style={styles.labelInput}>Nome do Produto</Text>
                <TextInput
                    style={styles.textInput}
                    defaultValue={product.name}
                    onChangeText={e => setName(e)}
                />
            </View>
            <View style={styles.groupInput}>
                <Text style={styles.labelInput}>Preço</Text>
                <TextInput
                    style={[styles.textInput, { width: 100 }]}
                    defaultValue={product.price}
                    onChangeText={e => setPrice(e)}
                />
            </View>
            <TouchableOpacity style={styles.buttonGreen} onPress={() => handleUpdate(product._id)}>
                <Text style={styles.buttonWhiteText}>Salvar</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.buttonTransparent} onPress={() => handleDelete(product._id)}>
                <FA
                    style={{ paddingRight: 10 }}
                    name='trash'
                    size={16}
                    color='#585858'
                />
                <Text style={styles.buttonBlackText}>Apagar este produto</Text>
            </TouchableOpacity>
        </View>
        <View style={[styles.alertError, { zIndex: alertZ, backgroundColor: `${alertColor}` }]}>
            <Text style={styles.alertText}>{status}</Text>
        </View>
    </>)
}