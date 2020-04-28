import React, { useState } from 'react';
import { View, Image, TextInput, Text, TouchableOpacity, AsyncStorage, SafeAreaView, ScrollView } from 'react-native';
import Header from '../../../components/Header'
import { useRoute, useNavigation } from '@react-navigation/native';
import apiReq from '../../../services/reqToken';
import { Feather } from '@expo/vector-icons';
import { API_DOMAIN } from '../../../constants/api';
import * as ImagePicker from 'expo-image-picker';

import styles from '../../global';

export default function EditProduct() {

    const route = useRoute();
    const product = route.params.product;
    const navigation = useNavigation();
    const currentImage = { uri: `${API_DOMAIN}/uploads/${product.image}` };

    const [ previousImage, setPreviousImage ] = useState(currentImage);
    const [ name, setName ] = useState(product.name);
    const [ description, setDescription ] = useState(product.description);
    const [ price, setPrice ] = useState(product.price);
    const [ status, setStatus ] = useState('');
    const [ alertZ, setAlertZ ] = useState(-999);
    const [ alertColor, setAlertColor ] = useState('');

    async function handleUpdate(id) {

        let image;

        if(previousImage === currentImage) {
            image = product.image;
        } else {
            image = await uploadImage(previousImage);
        }

        const { data } = await apiReq.post('products/edit', {
            id,
            image,
            name,
            description,
            price
        });

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
            if(data.status !== undefined) navigation.navigate('StoreProducts', { changed: true })
        }, 2000)

    }

    async function handleDelete(id) {

        const { data } = await apiReq.post('products/delete', {
            id
        });

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
        }, 2000)

    }

    const imagePicker = async () => {
        
        let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();
        if (permissionResult.granted === false) return;
        let result = await ImagePicker.launchImageLibraryAsync();
        if(result.cancelled) return;
        setPreviousImage({ uri: result.uri });
        return;

    };

    const cameraPicker = async () => {
        
        let permissionResult = await ImagePicker.requestCameraPermissionsAsync();
        if (permissionResult.granted === false) return;
        let result = await ImagePicker.launchCameraAsync();
        if(result.cancelled) return;
        setPreviousImage({ uri: result.uri });
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
                <View style={{ justifyContent: 'flex-end', marginBottom: 20 }}>
                    <Image
                        source={previousImage}
                        style={styles.fullImage}
                        resizeMode='cover'
                    />
                    <View style={styles.groupFloatButton}>

                        <TouchableOpacity
                        style={[styles.buttonFloat, { marginRight: 16 }]}
                        onPress={imagePicker}>
                            <Feather
                                name='image'
                                color='#fff'
                                size={32}
                            />
                        </TouchableOpacity>

                        <TouchableOpacity
                        style={styles.buttonFloat}
                        onPress={cameraPicker}>
                            <Feather
                                name='camera'
                                color='#fff'
                                size={32}
                            />
                        </TouchableOpacity>   

                    </View>  
                </View>
                <View style={styles.groupInput}>
                    <View style={styles.labelInput}>
                        <Text style={styles.labelText}>Nome</Text>
                    </View>
                    <TextInput
                        style={styles.textInput}
                        defaultValue={product.name}
                        onChangeText={e => setName(e)}
                    />    
                </View>
                <View style={styles.groupInput}>
                    <View style={styles.labelInput}>
                        <Text style={styles.labelText}>Descrição</Text>
                    </View>
                    <TextInput
                        style={styles.textInput}
                        defaultValue={product.description}
                        onChangeText={e => setDescription(e)}
                    />    
                </View>
                <View style={styles.groupInput}>
                    <View style={styles.labelInput}>
                        <Text style={styles.labelText}>Preço</Text>
                    </View>
                    <TextInput
                        style={[styles.textInput, { width: 120 }]}
                        defaultValue={product.price}
                        onChangeText={e => setPrice(e)}
                    />    
                </View>
                <TouchableOpacity style={styles.button} onPress={() => handleUpdate(product._id)}>
                    <Text style={styles.buttonWhiteText}>Salvar</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.buttonTransparent} onPress={() => handleDelete(product._id)}>
                    <Feather
                        style={{ paddingRight: 10 }}
                        name='trash'
                        size={16}
                        color='#585858'
                    />
                    <Text style={styles.buttonBlackText}>Apagar este produto</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
        <View style={[styles.alertError, { zIndex: alertZ, backgroundColor: `${alertColor}` }]}>
            <Text style={styles.alertText}>{status}</Text>
        </View>
    </>)
}