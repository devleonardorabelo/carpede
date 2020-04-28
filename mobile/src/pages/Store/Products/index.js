import React, { useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, Image, AsyncStorage, FlatList, ActivityIndicator } from 'react-native';
import api from '../../../services/api';
import Header from '../../../components/Header';
import styles from '../../global';
import Loading from '../../../components/Loading';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { API_DOMAIN } from '../../../constants/api';

export default function Products() {

    const [ products, setProducts ] = useState([]);
    const [ total, setTotal ] = useState(0);
    const [ page, setPage ] = useState(1);
    const [ loadedPage, setLoadedPage ] = useState(false);
    const [ loading, setLoading ] = useState(false);

    const navigation = useNavigation();

    async function loadProducts() {

        if(loading) return

        if(total > 0 && products.length === total) return

        setLoading(true);

        const storeToken = await AsyncStorage.getItem('@Carpede:storeToken');
        const { data, headers } = await api.get('products',{ 
            params: { page },
            headers : { 'Authorization': `Bearer ${storeToken}` },
        });

        if(loadedPage === false) setLoadedPage(true);

        if(data.length) {
            setProducts([...products, ...data]);
            setTotal(headers['x-total-count']);
            setPage(page + 1);    
        }
        
        setLoading(false);
    }

    useFocusEffect(
        useCallback(() => {
            loadProducts();
        }, [])
    )

    function navigateToEdit(product) {
        navigation.navigate('StoreProductEdit', { product });
    }

    function navigateToNew() {
        navigation.navigate('StoreProductNew');
    }

    function regexName(name) {
        if(name.length > 30) {
            let nameCut = name.match(/^[\s\S]{0,30}/) + '...'
            return nameCut;
        }
        return name;
    }
    

    return(<>{loadedPage ? (

        <View style={styles.container}>
            
            <Header/>
            <Text style={styles.title}>Produtos</Text>
            <FlatList
                style={styles.listProducts}
                data={products}
                keyExtractor={product => String(product._id)}
                showsVerticalScrollIndicator={false}
                onEndReached={loadProducts}
                onEndReachedThreshold={0.3}
                numColumns={1}
                renderItem={({ item: product }) => (
                    
                    <TouchableOpacity style={styles.card} onPress={() => navigateToEdit(product)}>

                        <Image
                            style={styles.cardImage}
                            source={{
                                uri: `${API_DOMAIN}/uploads/${product.image}`,
                            }}
                            resizeMode='cover'
                        />
                        
                        <View style={styles.cardBody}>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={[styles.textWrap, styles.light]}>{regexName(product.name)}</Text>
                            </View>
                            <Text style={styles.price}>
                                {Intl.NumberFormat('pt-BR', {
                                    style: 'currency',
                                    currency: 'BRL'
                                }).format(product.price)}
                            </Text>
                        </View>

                    </TouchableOpacity>
 
                )}
            />        
            <TouchableOpacity style={styles.button} onPress={navigateToNew}>
                <Text style={styles.buttonWhiteText}>Adicionar produto</Text>
            </TouchableOpacity>

        </View>
        ) : (
            <Loading />            
        )}
    </>)
}