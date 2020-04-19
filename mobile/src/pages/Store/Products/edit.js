import React, { useState } from 'react';
import { View, Image, TextInput, Text, TouchableOpacity, AsyncStorage } from 'react-native';
import Header from '../../../components/Header'
import { useRoute, useNavigation } from '@react-navigation/native';
import api from '../../../services/axios';

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

    async function handleUpdate() {
        
        const storeToken = await AsyncStorage.getItem('@Carpede:storeToken');
        
        const { data } = await api.post('products/edit', {
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
            if(data.status !== undefined) navigation.navigate('StoreProducts', {newProduct: true})
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
            <TouchableOpacity style={styles.buttonGreen} onPress={handleUpdate}>
                <Text style={styles.buttonWhiteText}>Salvar</Text>
            </TouchableOpacity>
        </View>
        <View style={[styles.alertError, { zIndex: alertZ, backgroundColor: `${alertColor}` }]}>
            <Text style={styles.alertText}>{status}</Text>
        </View>
    </>)
}