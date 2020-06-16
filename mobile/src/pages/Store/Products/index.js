import React, { useState, useEffect } from 'react';
import { FlatList, SafeAreaView, View, Text, Image, TouchableOpacity } from 'react-native';
import apiReq from '../../../services/reqToken';
import styles from '../../../global';
import { useNavigation, useRoute } from '@react-navigation/native';

import Loading from '../../../components/Loading';
import Skeleton from '../../../components/Skeleton';
import { Header } from '../../../components/Header';
import { Card } from '../../../components/Item';
import { Button } from '../../../components/Button';

import img_product from '../../../assets/illustrations/products.png';

export default function Products() {

    const [ products, setProducts ] = useState([]);
    const [ categories, setCategories ] = useState(null);
    const [ category, setCategory ] = useState(null);
    const [ total, setTotal ] = useState(0);
    const [ page, setPage ] = useState(1);
    const [ loadedPage, setLoadedPage ] = useState(false);
    const [ loading, setLoading ] = useState(false);

    const navigation = useNavigation();
    const { params } = useRoute();
    let route = params;

    async function loadProducts() {

        if(loading) return

        if(total > 0 && products.length === total) return

        setLoading(true);

        const { data, headers } = await apiReq.get('products',{ 
            params: {
                page,
                category
            },
        });

        if(loadedPage === false) setLoadedPage(true);

        if(data.products.length) {
            setProducts([...products, ...data.products]);
            setTotal(headers['x-total-count']);
            setPage(page + 1);
            setCategories(data.categories);
        }

        setLoading(false);
    }

    function loadProductWithParams(category) {
        setTotal(0);
        setProducts([]);
        setPage(1);
        setCategory(category)
    }

    const navigateToEdit = product => navigation.navigate('StoreProductEdit', { product });

    const navigateToNew = () => navigation.navigate('StoreProductNew');

    useEffect(() => {
        loadProducts();
    },[category])

    useEffect(() => {
        if(route) {
            
            let index = products.findIndex(( obj => obj._id === route.product._id ))

            if(index != -1 && route.method == 'destroy') {
                products.splice(index, 1)
                setProducts([...products]);
                route = {};
                return;
            } 
            if (index != -1 && route.method == 'update') {
                products[index] = route.product
                setProducts([...products]);
                route = {};
                return;
            } 
            if (index == -1 && route.method == 'create') {
                setProducts([...products, route.product]);
                route = {};
                return;
            }
            
        }
    }, [route])

    return(

        <SafeAreaView style={styles.container}>
            <Header title={'produtos'}/>

            <View style={styles.scrollHorizontal}>

                <FlatList
                    data={categories}
                    keyExtractor={category => String(category._id)}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item: thisCategory }) => (
                        <TouchableOpacity
                            style={[
                                styles.buttonTag,
                                category == thisCategory._id ? { backgroundColor: '#639DFF' } : null
                            ]}
                            onPress={() => loadProductWithParams(thisCategory._id)}
                        >
                            <Text
                                style={[
                                    styles.buttonBlackText,
                                    category == thisCategory._id ? { color: '#FFFFFF' } : null
                                ]}
                            >{thisCategory.name}</Text>
                        </TouchableOpacity>
                    )}
                    ListHeaderComponent={
                        <TouchableOpacity
                            style={[
                                styles.buttonTag,
                                category == null ? { backgroundColor: '#639DFF' } : null
                            ]}
                            onPress={() => loadProductWithParams(null)}
                        >
                            <Text
                                style={[
                                    styles.buttonBlackText,
                                    category == null ? { color: '#FFFFFF' } : null
                                ]}
                            >Todos</Text>
                        </TouchableOpacity>
                    }
                    ListEmptyComponent={
                        <Skeleton style={{ flexDirection: 'row' }}>
                            <TouchableOpacity style={styles.buttonTag} />
                            <TouchableOpacity style={styles.buttonTag} />
                            <TouchableOpacity style={styles.buttonTag} />
                            <TouchableOpacity style={styles.buttonTag} />
                            <TouchableOpacity style={styles.buttonTag} />
                        </Skeleton>
                    }
                />
            </View>
                

            <FlatList
                style={styles.column}
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
                //ListFooterComponent={} 
                ListEmptyComponent={
                    loading ?
                        <Skeleton>
                            <Card style={{ backgroundColor: '#F5F5F5' }} />
                            <Card style={{ backgroundColor: '#F5F5F5' }} />
                            <Card style={{ backgroundColor: '#F5F5F5' }} />
                            <Card style={{ backgroundColor: '#F5F5F5' }} />
                            <Card style={{ backgroundColor: '#F5F5F5' }} />
                        </Skeleton>
                    :null
                }               
            />

            <View style={[styles.column, { paddingTop: 8 }]}>
                <Button action={navigateToNew} title='Adicionar Produto'/>
            </View>        
                
            
        </SafeAreaView>
    )
}