import React, { useState, useCallback } from 'react';
import { Text, FlatList, SafeAreaView } from 'react-native';
import apiReq from '../../../services/reqToken';
import styles from '../../global';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

import Loading from '../../../components/Loading';
import { Header } from '../../../components/Header';
import { Card } from '../../../components/Item';
import { Button } from '../../../components/Button';

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

        const { data, headers } = await apiReq.get('products',{ 
            params: { page },
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

    return(<>{loadedPage ? (

        <SafeAreaView style={styles.container}>
            <Header/>
            <Text style={styles.title}>Produtos</Text>
            <FlatList
                style={{ marginBottom: 16 }}
                data={products}
                keyExtractor={product => String(product._id)}
                showsVerticalScrollIndicator={false}
                onEndReached={loadProducts}
                onEndReachedThreshold={0.3}
                numColumns={1}
                renderItem={({ item: product }) => (
                    
                    <Card
                        action={() => navigateToEdit(product)}
                        image={ product.image }
                        title={product.name}
                        price={product.price}
                    />
                )}
            />        
            <Button action={navigateToNew} title='Adicionar Produto'/>

        </SafeAreaView>
        ) : (
            <Loading />            
        )}
    </>)
}