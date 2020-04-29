import React, { useState } from 'react';
import { Text, AsyncStorage, SafeAreaView, ScrollView } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import apiReq from '../../../services/reqToken';
import { API_DOMAIN } from '../../../constants/api';
import * as ImagePicker from 'expo-image-picker';

import styles from '../../global';
import Header from '../../../components/Header'
import { PreviewImage } from '../../../components/Image';
import { Input } from '../../../components/Input';
import { Button, ButtonTransparent } from '../../../components/Button';
import Alert from '../../../components/Alert'

export default function EditProduct() {

    const route = useRoute();
    const product = route.params.product;
    const navigation = useNavigation();
    const previousImage = product.image;

    const [ image, setImage ] = useState(previousImage);
    const [ name, setName ] = useState(product.name);
    const [ description, setDescription ] = useState(product.description);
    const [ price, setPrice ] = useState(product.price);
    const [ alert, setAlert ] = useState('');
    const [ alertShow, setAlertShow ] = useState(false);
    const [ alertError, setAlertError ] = useState(false);
    const [ done, setDone ] = useState(false);

    async function handleUpdate(id) {

        setDone(true);

        if(image !== previousImage) await uploadImage(image);

        const { data } = await apiReq.post('products/edit', {
            id,
            image,
            name,
            description,
            price
        });

        if(data.status !== undefined) {
            setAlert(data.status);
            setAlertError(false);
        }
        if(data.error !== undefined){
            setAlert(data.error);
            setAlertError(true);
        }

        setDone(false);

        setAlertShow(true);

        setTimeout(() => {
            setAlertShow(false);
            if(data.status !== undefined) navigation.navigate('StoreProducts');
        }, 2000);

    }

    async function handleDelete(id) {

        const { data } = await apiReq.post('products/delete', {
            id
        });

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

    const imagePicker = async () => {
        
        let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();
        if (permissionResult.granted === false) return;
        let result = await ImagePicker.launchImageLibraryAsync();
        if(result.cancelled) return;
        setImage({ uri: result.uri });
        return;

    };

    const cameraPicker = async () => {
        
        let permissionResult = await ImagePicker.requestCameraPermissionsAsync();
        if (permissionResult.granted === false) return;
        let result = await ImagePicker.launchCameraAsync();
        if(result.cancelled) return;
        setImage({ uri: result.uri });
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

    return(<>
        <SafeAreaView style={styles.container}>
            <Header />
            <ScrollView showsVerticalScrollIndicator={false}>
                <Text style={styles.title}>{product.name}</Text>
                <PreviewImage
                    image={image}
                    action1={imagePicker}
                    icon1='image'
                    action2={cameraPicker}
                    icon2='camera'
                />
                <Input title={'Nome'} default={product.name} action={e => setName(e)} maxLength={40}/>
                <Input title={'Descrição'} default={product.description} action={e => setDescription(e)} maxLength={50}/>
                <Input title={'Preço'} default={product.price} keyboard={'numeric'} action={e => setPrice(e)} maxLength={8}/>
                
                <Button action={() => handleUpdate(product._id)} title={'Salvar'} done={done}/>
                <ButtonTransparent action={() => handleDelete(product._id)} icon='trash' title='Apagar este produto' />        
            </ScrollView>
        </SafeAreaView>
        <Alert show={alertShow} alert={alert} error={alertError}/>
    </>)
}