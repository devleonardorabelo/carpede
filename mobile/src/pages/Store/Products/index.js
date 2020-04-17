import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, AsyncStorage, FlatList } from 'react-native';
import api from '../../../services/axios';
import Header from '../../../components/Header';
import styles from '../../global';
import { useNavigation } from '@react-navigation/native';


export default function Products() {

    const [ products, setProducts ] = useState([]);
    const [ total, setTotal ] = useState(0);
    const [ page, setPage ] = useState(1);
    const [ loading, setLoading ] = useState(false);

    const navigation = useNavigation();

    function navigateToEdit(product) {
        navigation.navigate('StoreProductEdit', { product });
    }

    async function loadProducts() {

        if(loading) return

        if(total > 0 && products.length === total) return
        setLoading(true);

        const storeToken = await AsyncStorage.getItem('@Carpede:storeToken');
        const response = await api.get('products',{ 
            headers : { 'Authorization': `Bearer ${storeToken}` },
            params:  page,
        });

        setProducts([...products, ...response.data]);
        setTotal(response.headers['x-total-count']);
        setPage(page + 1);
        setLoading(false);

    }

    useEffect(() => {
      loadProducts();
      console.log(products)
    }, [])

    function navigateToNew() {
        navigation.navigate('StoreProductNew');
    }

    return(
        <View style={styles.container}>
            <Header title={'Meus Produtos ->'+ page}/>
            <FlatList
                    style={styles.productList}
                    data={products}
                    keyExtractor={product => String(product._id)}
                    showsVerticalScrollIndicator={true}
                    onEndReached={loadProducts} //chama a função quando descer a lista de itens
                    onEndReachedThreshold={0.2} //chama a função de acordo com a porcentagem do fim da lista
                    renderItem={({ item: product }) => (
                    <TouchableOpacity style={styles.card} onPress={navigateToEdit}>
                        <View style={styles.cardBody}> 
                            <Image
                                style={styles.cardImage}
                                source={product}
                                resizeMode='cover'
                            />
                            <Text style={[styles.text, { paddingTop: 10 }]}>{product._id}</Text>
                            <Text style={[styles.subtitle, { paddingBottom: 10}]}>{product.price}</Text>
                        </View>
                    </TouchableOpacity>  
                )}
            />
                
                               

            <TouchableOpacity style={styles.buttonGreen} onPress={navigateToNew}>
                <Text style={styles.buttonWhiteText}>Adicionar Produto</Text>
            </TouchableOpacity> 
        </View>
    )
}