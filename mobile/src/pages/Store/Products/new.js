import React, { useState } from 'react';
import { View, Image, TextInput, Text, TouchableOpacity, AsyncStorage, SafeAreaView, ScrollView } from 'react-native';
import apiReq from '../../../services/reqToken';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { API_DOMAIN } from '../../../constants/api';
import Header from '../../../components/Header';
import Alert from '../../../components/Alert';
import { PreviewImage } from '../../../components/Image';
import { Input } from '../../../components/Input';
import { Button } from '../../../components/Button';

import styles from '../../global';

import defaultImage from '../../../assets/more/upload.png';

export default function NewProduct() {

    const navigation = useNavigation();
    const [ previewImage, setPreviewImage ] = useState(defaultImage);
    const [ name, setName ] = useState('');
    const [ description, setDescription ] = useState('');
    const [ price, setPrice ] = useState('');
    const [ alert, setAlert ] = useState('');
    const [ alertShow, setAlertShow ] = useState(false);
    const [ alertError, setAlertError ] = useState(false);
    const [ done, setDone ] = useState(false);

    const imagePicker = async () => {
        
        let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();
        if (permissionResult.granted === false) return;
        let result = await ImagePicker.launchImageLibraryAsync();
        if(result.cancelled) return;
        setPreviewImage({ uri: result.uri });
        return;

    };

    const cameraPicker = async () => {
        
        let permissionResult = await ImagePicker.requestCameraPermissionsAsync();
        if (permissionResult.granted === false) return;
        let result = await ImagePicker.launchCameraAsync();
        if(result.cancelled) return;
        setPreviewImage({ uri: result.uri });
        return;

    };

    async function uploadImage(file) {

        const body = new FormData();
        body.append('fileData', {
            uri : file.uri,
            type: "image/jpg",
            name: "image.jpg",
        });

        const storeToken = await AsyncStorage.getItem('@Carpede:storeToken');

        const config = {
            method: 'POST',
            headers: {
             'Accept': 'application/json',
             'Content-Type': 'multipart/form-data',
             'Authorization': `Bearer ${storeToken}`,
            },
            body: body,
        };
        
        let response = await fetch(`${API_DOMAIN}/upload`, config);
        
        let data = await response.json();

        return data.file;

    }

    async function handleNewProduct() {
        
        const storeToken = await AsyncStorage.getItem('@Carpede:storeToken');
        let image;

        if(previewImage !== defaultImage) {
           image = await uploadImage(previewImage);
        } 

        let { data } = await apiReq.post('products/new',{
            image,
            name,
            description,
            price
        }, { headers : { 'Authorization': `Bearer ${storeToken}` } })

        if(data.status !== undefined) {
            setAlert(data.status);
            setAlertError(false);
        }
        if(data.error !== undefined){
            setAlert(data.error);
            setAlertError(true);
        }

        setAlertShow(true);

        setTimeout(() => {
            setAlertShow(false);
            if(data.status !== undefined) navigation.navigate('StoreProducts')
        }, 2000);

    }
 
    return(<>
        <SafeAreaView style={styles.container}>
            <Header />
            <ScrollView showsVerticalScrollIndicator={false}>
                <Text style={styles.title}>Novo Produto</Text>
                <PreviewImage
                    image={previewImage}
                    action1={imagePicker}
                    icon1='image'
                    action2={cameraPicker}
                    icon2='camera'
                />
                <Input title={'Nome'} action={e => setName(e)} maxLength={40}/>
                <Input title={'Descrição'} action={e => setDescription(e)} maxLength={50}/>
                <Input title={'Preço'} keyboard={'numeric'} action={e => setPrice(e)} maxLength={8}/>
                
                <Button action={handleNewProduct} title={'Salvar'} done={done}/>      
            </ScrollView>
        </SafeAreaView>
        <Alert show={alertShow} alert={alert} error={alertError}/>
    </>)
}