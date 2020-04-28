import React, { useState } from 'react';
import { View, Image, TextInput, Text, TouchableOpacity, AsyncStorage, SafeAreaView, ScrollView } from 'react-native';
import Header from '../../../components/Header';
import api from '../../../services/api';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { API_DOMAIN } from '../../../constants/api';

import styles from '../../global';

import defaultImage from '../../../assets/more/upload.png';

export default function NewProduct() {

    const navigation = useNavigation();
    const [ previousImage, setPreviousImage ] = useState(defaultImage);
    const [ name, setName ] = useState('');
    const [ description, setDescription ] = useState('');
    const [ price, setPrice ] = useState('');
    const [ alert, setAlert ] = useState('');
    const [ alertZ, setAlertZ ] = useState(-999);

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

    async function handleNewProduct() {
        
        const storeToken = await AsyncStorage.getItem('@Carpede:storeToken');
        let image;

        if(previousImage !== defaultImage) {
           image = await uploadImage(previousImage);
        } 

        let { data } = await api.post('products/new',{
            image,
            name,
            description,
            price
        }, { headers : { 'Authorization': `Bearer ${storeToken}` } })

        if(data.error !== undefined) {
            setAlert(data.error);
            setAlertZ(999);

            return setTimeout(() => {
                setAlertZ(-999);
            }, 3000)

        };

        return navigation.navigate('StoreProducts');

    }
 
    return(<>
        <SafeAreaView style={styles.container}>
            <Header/>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Text style={styles.title}>Novo Produto</Text>
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
                    <Text style={styles.labelInput}>Nome do Produto</Text>
                    <TextInput
                        style={styles.textInput}
                        onChangeText={e => setName(e)}
                    />
                </View>
                <View style={styles.groupInput}>
                    <Text style={styles.labelInput}>Descrição</Text>
                    <TextInput
                        style={styles.textInput}
                        onChangeText={e => setDescription(e)}
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
            </ScrollView>
        </SafeAreaView>
        <View style={[styles.alertError, { zIndex: alertZ }]}>
            <Text style={styles.alertText}>{alert}</Text>
        </View>
    </>)
}