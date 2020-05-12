import React, { useState } from 'react';
import { Text, SafeAreaView, ScrollView } from 'react-native';
import apiReq from '../../../services/reqToken';
import { useNavigation } from '@react-navigation/native';
import { Header } from '../../../components/Header';
import { PreviewImage } from '../../../components/Image';
import { Input } from '../../../components/Input';
import { Button } from '../../../components/Button';
import { imagePicker, cameraPicker, uploadImage } from '../../../utils/ImagePicker';

import styles from '../../global';

export default function NewProduct() {

    const navigation = useNavigation();
    
    const [ image, setImage ] = useState();
    const [ name, setName ] = useState('');
    const [ description, setDescription ] = useState('');
    const [ price, setPrice ] = useState('');
    const [ alert, setAlert ] = useState();
    const [ status, setStatus ] = useState(false);

    const getImage = async () => {
        let picker = await imagePicker();
        if(!picker) return;
        setImage({ uri: picker })
    }

    const takeImage = async () => {
        let picker = await cameraPicker();
        if(!picker) return;
        setImage({ uri: picker })
    }

    async function handleNewProduct() {

        setStatus(true);

        if(image) var previewImage = await uploadImage(image);
        
        let { data } = await apiReq.post('products/new',{
            image: previewImage,
            name,
            description,
            price
        })

        if(data.error) {
            setStatus();
            setAlert(data.error);
            return;
        };

        setStatus('done');

        setTimeout(() => { navigation.navigate('StoreProducts') }, 2000);

    }
 
    return(<>
        <SafeAreaView style={styles.container}>
            <Header />
            <ScrollView showsVerticalScrollIndicator={false}>
                <Text style={styles.title}>Novo Produto</Text>
                <PreviewImage
                    image={image}
                    action1={getImage}
                    icon1='image'
                    action2={takeImage}
                    icon2='camera'
                />
                <Input
                    title={'Nome'}
                    name={'name'}
                    action={e => setName(e)}
                    maxLength={40}
                    error={alert}
                />
                <Input
                    title={'Descrição'}
                    name={'description'}
                    action={e => setDescription(e)}
                    maxLength={50}
                    error={alert}
                />
                <Input
                    title={'Preço'}
                    name={'price'}
                    keyboard={'numeric'}
                    action={e => setPrice(e)}
                    maxLength={8}
                    error={alert}
                />
                
                <Button action={handleNewProduct} title={'Salvar'} status={status}/>      
            </ScrollView>
        </SafeAreaView>
    </>)
}