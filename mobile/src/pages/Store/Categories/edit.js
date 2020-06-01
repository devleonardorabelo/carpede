import React, { useState } from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import apiReq from '../../../services/reqToken';

import styles from '../../global';
import { Header } from '../../../components/Header'
import { PreviewImage } from '../../../components/Image';
import { Input } from '../../../components/Input';
import { Button, LinearButton } from '../../../components/Button';
import { API_DOMAIN } from '../../../constants/api';

import { imagePicker, cameraPicker ,uploadImage } from '../../../utils/ImagePicker';

export default function EditCategory() {

    const route = useRoute();
    const category = route.params.category;
    const navigation = useNavigation();

    const currentImage = {uri: `${API_DOMAIN}/uploads/${category.image}`}

    const [ image, setImage ] = useState(currentImage);
    const [ name, setName ] = useState(category.name);
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

    async function handleUpdate(id) {

        setStatus('loading');

        if(image === currentImage) {
            var setImage = category.image 
        } else {
            var setImage = await uploadImage(image);
        }

        const { data } = await apiReq.post('categories/edit', {
            id,
            image: setImage,
            name,
        });

        if(data.error) {
            setStatus();
            setAlert(data.error);
            return;
        };

        setStatus('done');
    }

    async function handleDelete(id) {

        const { data } = await apiReq.post('categories/delete', {
            id
        });

        if(data) navigation.navigate('StoreCategories');
    }

    return(<>
        <SafeAreaView style={styles.container}>

            <Header title={category.name}>
                <LinearButton icon={'trash-can-outline'} action={() => handleDelete(category._id)}/>
            </Header>

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
                    default={category.name}
                    action={e => setName(e)}
                    maxLength={40}
                    error={alert}
                />
                
                <Button action={() => handleUpdate(category._id)} title={'Salvar'} status={status}/>
                
            </ScrollView>
        </SafeAreaView>
    </>)
}