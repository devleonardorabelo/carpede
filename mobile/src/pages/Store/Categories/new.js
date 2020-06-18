import React, { useState } from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import apiReq from '../../../services/reqToken';
import { useNavigation } from '@react-navigation/native';
import { Header } from '../../../components/Header';
import { PreviewImage } from '../../../components/Image';
import { Input } from '../../../components/Input';
import { Button } from '../../../components/Button';
import { imagePicker, cameraPicker, uploadImage } from '../../../utils/ImagePicker';

import styles from '../../../global';

export default function NewCategory() {

    const navigation = useNavigation();
    
    const [ image, setImage ] = useState();
    const [ name, setName ] = useState('');
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

    async function handleNewCategory() {

        setStatus('loading');

        if(image) var previewImage = await uploadImage(image);
        
        let { data } = await apiReq.post('categories/new',{
            image: previewImage,
            name,
        })

        if(data.error) {
            setStatus();
            setAlert(data.error);
            return;
        };

        setStatus('done');

        setTimeout(() => { navigation.navigate('StoreCategories', {
            method: 'create', 
            category: data.category
        }) }, 500);

    }
 
    return(<>
        <SafeAreaView style={styles.container}>

            <Header title='nova categoria' />

            <ScrollView showsVerticalScrollIndicator={false} style={styles.column}>
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
                
                <Button action={handleNewCategory} title={'Salvar'} status={status}/>      
            </ScrollView>
        </SafeAreaView>
    </>)
}