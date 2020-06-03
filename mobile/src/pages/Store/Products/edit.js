import React, { useState, useEffect } from 'react';
import { View, SafeAreaView, ScrollView } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import apiReq from '../../../services/reqToken';

import styles from '../../global';
import { Header } from '../../../components/Header'
import { PreviewImage } from '../../../components/Image';
import { Input, Select } from '../../../components/Input';
import { Button, LinearButton } from '../../../components/Button';
import { API_DOMAIN } from '../../../constants/api';

import { imagePicker, cameraPicker ,uploadImage } from '../../../utils/ImagePicker';

export default function EditProduct() {

    const { params } = useRoute();
    const product = params.product;
    const productCategory = params.category;
    const navigation = useNavigation();

    const currentImage = {uri: `${API_DOMAIN}/uploads/${product.image}`}

    const [ image, setImage ] = useState(currentImage);
    const [ name, setName ] = useState(product.name);
    const [ description, setDescription ] = useState(product.description);
    const [ price, setPrice ] = useState(product.price);
    const [ category, setCategory ] = useState(product.category);
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

        let setImage;

        if(image === currentImage) setImage = product.image
        if(image != currentImage )  setImage = await uploadImage(image);

        const { data } = await apiReq.post('products/edit', {
            id,
            image: setImage,
            name,
            description,
            price: String(price),
            category
        });

        if(data.error) {
            setStatus();
            setAlert(data.error);
            return;
        };

        setStatus('done');
    }

    async function handleDelete(id) {

        const { data } = await apiReq.post('products/delete', {
            id
        });

        if(data) navigation.navigate('StoreProducts');
    }

    const navigateToSelectCategory = () => navigation.navigate('StoreLoadCategory', { type: 'edit' });


    useEffect(() => {
        function handleSelectCategory() {
            if(productCategory) {
                setCategory(productCategory)
            }
        }    
        
        handleSelectCategory();
    },[productCategory])

    return(<>
        <SafeAreaView style={styles.container}>

            <Header title={product.name}>
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
                    default={product.name}
                    action={e => setName(e)}
                    maxLength={40}
                    error={alert}
                />
                <Input
                    title={'Descrição'}
                    name={'description'}
                    default={product.description}
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
                            width: 120
                        }}
                        title={'Preço'}
                        name={'price'}
                        keyboard={'numeric'}
                        default={product.price}
                        action={e => setPrice(e)}
                        maxLength={8}
                        error={alert}
                    />

                    <Select
                        style={{ flexGrow: 1 }}
                        title='Categoria'
                        text={category}
                        action={navigateToSelectCategory}
                    />
                
                </View>
                
                <Button action={() => handleUpdate(product._id)} title={'Salvar'} status={status}/>
                
            </ScrollView>
        </SafeAreaView>
    </>)
}