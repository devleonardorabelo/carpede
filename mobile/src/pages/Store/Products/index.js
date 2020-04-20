import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, AsyncStorage, FlatList, ActivityIndicator } from 'react-native';
import api from '../../../services/axios';
import Header from '../../../components/Header';
import styles from '../../global';
import { useNavigation, useRoute } from '@react-navigation/native';


export default function Products() {

    const [ products, setProducts ] = useState([]);
    const [ total, setTotal ] = useState(0);
    const [ page, setPage ] = useState(1);
    const [ loadedPage, setLoadedPage ] = useState(false);
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

    useEffect(() => {
      loadProducts();
    }, [])

    function navigateToNew() {
        navigation.navigate('StoreProductNew');
    }


    return(<>{loadedPage ? (

        <View style={styles.container}>
            
            <Header title={'Meus Produtos'}/>
            
            <FlatList
                style={styles.listProducts}
                data={products}
                keyExtractor={product => String(product._id)}
                showsVerticalScrollIndicator={false}
                onEndReached={loadProducts} //chama a função quando descer a lista de itens
                onEndReachedThreshold={0.2} //chama a função de acordo com a porcentagem do fim da lista
                numColumns={2}
                renderItem={({ item: product }) => (
                    
                    <TouchableOpacity style={styles.row} onPress={() => navigateToEdit(product)}>
                        <View style={styles.card}> 
                            <Image
                                style={styles.cardImage}
                                source={product}
                                resizeMode='cover'
                            />
                            <Text style={[styles.text, { paddingTop: 10 }]}>{product.name}</Text>
                            <Text style={[styles.subtitle, { paddingBottom: 10}]}>{product.price}</Text>
                        </View>    
                    </TouchableOpacity>
                    
                    
                )}
            />        
            <TouchableOpacity style={styles.buttonGreen} onPress={navigateToNew}>
                <Text style={styles.buttonWhiteText}></Text>
            </TouchableOpacity>

        </View>
        ) : (
            <View style={{ flex: 1, justifyContent: 'center', alignContent: 'center', backgroundColor: '#fff'}}>
                <ActivityIndicator size="large" color="#6FCF97" />
            </View>
            
        )}
    </>)
}