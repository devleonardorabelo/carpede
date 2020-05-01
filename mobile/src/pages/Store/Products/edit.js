import React, { useState } from 'react';
import { Text, SafeAreaView, ScrollView } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import apiReq from '../../../services/reqToken';

import styles from '../../global';
import Header from '../../../components/Header'
import { PreviewImage } from '../../../components/Image';
import { Input } from '../../../components/Input';
import { Button, ButtonTransparent } from '../../../components/Button';
import Alert from '../../../components/Alert';
import { API_DOMAIN } from '../../../constants/api';

import { imagePicker, cameraPicker ,uploadImage } from '../../../utils/ImagePicker';

export default function EditProduct() {

    const route = useRoute();
    const product = route.params.product;
    const navigation = useNavigation();

    const currentImage = {uri: `${API_DOMAIN}/uploads/${product.image}`}

    const [ image, setImage ] = useState(currentImage);
    const [ name, setName ] = useState(product.name);
    const [ description, setDescription ] = useState(product.description);
    const [ price, setPrice ] = useState(product.price);
    const [ alert, setAlert ] = useState('');
    const [ alertShow, setAlertShow ] = useState(false);
    const [ alertError, setAlertError ] = useState(false);
    const [ done, setDone ] = useState(false);

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

        setDone(true);

        if(image === currentImage) {
            var setImage = product.image 
        } else {
            var setImage = await uploadImage(image);
        }

        const { data } = await apiReq.post('products/edit', {
            id,
            image: setImage,
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

    return(<>
        <SafeAreaView style={styles.container}>
            <Header />
            <ScrollView showsVerticalScrollIndicator={false}>
                <Text style={styles.title}>{product.name}</Text>
                <PreviewImage
                    image={image}
                    action1={getImage}
                    icon1='image'
                    action2={takeImage}
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