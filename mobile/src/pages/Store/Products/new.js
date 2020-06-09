import React, { useState, useEffect } from 'react';
import { View, SafeAreaView, ScrollView, Picker } from 'react-native';
import apiReq from '../../../services/reqToken';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Header } from '../../../components/Header';
import { PreviewImage } from '../../../components/Image';
import { Input, Select } from '../../../components/Input';
import { Button, LinearButton } from '../../../components/Button';
import { imagePicker, cameraPicker, uploadImage } from '../../../utils/ImagePicker';

import styles from '../../global';

export default function NewProduct() {

    const navigation = useNavigation();
    const route = useRoute();
    const { params } = route;

    const [ image, setImage ] = useState();
    const [ name, setName ] = useState('');
    const [ category, setCategory ] = useState('');
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
            price,
            category
        })

        if(data.error) {
            setStatus();
            setAlert(data.error);
            return;
        };

        setStatus('done');

        setTimeout(() => { navigation.navigate('StoreProducts') }, 2000);

    }

    const navigateToSelectCategory = () => navigation.navigate('StoreLoadCategory', { type: 'add' });


    useEffect(() => {
        function handleSelectCategory() {
            if(params) {
                setCategory(params.category)
            }
        }    
        
        handleSelectCategory();
    },[params])
 
    return(<>
        <SafeAreaView style={styles.container}>
            <Header title='novo produto'>
                <LinearButton icon={'trash-can-outline'} action={() => handleDelete(product._id)}/>
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
                <View style={{
                    flexDirection: 'row'
                }}>

                    <Input
                        style={{
                            marginRight: 16,
                            width: 120,
                            height: 50
                        }}
                        title={'Preço'}
                        name={'price'}
                        keyboard={'numeric'}
                        action={e => setPrice(e)}
                        maxLength={8}
                        error={alert}
                    />

                    <Select
                        style={{ flexGrow: 1 }}
                        title='Categoria'
                        name={'category'}
                        text={category.name}
                        action={navigateToSelectCategory}
                        error={alert}
                    />
                
                </View>
                
                
                <Button action={handleNewProduct} title={'Salvar'} status={status}/>      
            </ScrollView>
        </SafeAreaView>
    </>)
}