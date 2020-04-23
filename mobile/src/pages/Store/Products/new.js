import React, { useState } from 'react';
import { View, Image, TextInput, Text, TouchableOpacity, AsyncStorage, Alert } from 'react-native';
import Header from '../../../components/Header';
import api from '../../../services/axios';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';

import styles from '../../global';

import product from '../../../assets/more/upload.png';

export default function NewProduct() {

    const navigation = useNavigation();
    const [ productImage, setProductImage ] = useState(product);
    const [ name, setName ] = useState('');
    const [ price, setPrice ] = useState('');
    const [ alert, setAlert ] = useState('');
    const [ alertZ, setAlertZ ] = useState(-999);

    const imagePicker = async () => {
        
        let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();
    
        if (permissionResult.granted === false) {
          Alert('Para selecionar uma imagem, precisamos da sua autorização');
          return;
        }
    
        let result = await ImagePicker.launchImageLibraryAsync();
        
        if(result.cancelled) return

        const data = new FormData();
        data.append('fileData', {
        uri : result.uri,
            type: "image/jpg",
            name: "filme1231.jpg",
        });

        
        const storeToken = await AsyncStorage.getItem('@Carpede:storeToken');

        const config = {
            method: 'POST',
            headers: {
             'Accept': 'application/json',
             'Content-Type': 'multipart/form-data',
             'Authorization': `Bearer ${storeToken}`,
            },
            body: data,
        };
        
        const response = await fetch("http://192.168.25.139:21068/upload", config);

        console.log(JSON.stringify(response))


    };

    const cameraPicker = async () => {
        
        let permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    
        if (permissionResult.granted === false) {
          Alert('Para tirar uma foto, precisamos que nos permita');
          return;
        }
    
        let pickerResult = await ImagePicker.launchCameraAsync();
        if(pickerResult.cancelled) return
        setProductImage({ uri: pickerResult.uri })
    };

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
            <View style={{ backgroundColor: '#cc2233', justifyContent: 'flex-end' }}>
                <Image
                    source={productImage}
                    style={styles.fullImage}
                    resizeMode='cover'
                />
                <View style={styles.groupFloatButton}>
                    <TouchableOpacity style={[styles.buttonFloat, { marginRight: 16 }]} onPress={imagePicker}><Text>G</Text></TouchableOpacity>
                    <TouchableOpacity style={styles.buttonFloat} onPress={cameraPicker}><Text>C</Text></TouchableOpacity>    
                </View>  
            </View>
            
            
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