import React, { useState, useEffect } from 'react';
import { FlatList, SafeAreaView, View, Text, TouchableOpacity } from 'react-native';
import apiReq from '../../../services/reqToken';
import { useNavigation, useRoute } from '@react-navigation/native';

import styles from '../../../global';
import Skeleton from '../../../components/Skeleton';
import { Header } from '../../../components/Header';
import { Card } from '../../../components/Item';
import { ActionButton, FilterButton } from '../../../components/Button';

export default function Products() {

    const [ products, setProducts ] = useState([]);
    const [ categories, setCategories ] = useState(null);
    const [ category, setCategory ] = useState(null);
    const [ sort, setSort ] = useState(1);
    const [ total, setTotal ] = useState(0);
    const [ page, setPage ] = useState(1);
    const [ loading, setLoading ] = useState(false);

    const navigation = useNavigation();
    const { params } = useRoute();
    let route = params;

    async function loadProducts() {

        if(loading) return

        if(total > 0 && products.length === total) return

        setLoading(true);

        const { data, headers } = await apiReq.get('products',{ 
            params: { page, category },
        });

        if(data.products.length) {
            setProducts([...products, ...data.products]);
            setTotal(headers['x-total-count']);
            setPage(page + 1);
            setCategories(data.categories);
        }

        setLoading(false);
    }

    function loadProductWithParams(selectCategory) {
        if(selectCategory != category && !loading) {
            setTotal(0);
            setProducts([]);
            setPage(1);
            setSort(1);
            setCategory(selectCategory)    
        }
        return;
    }

    function sortProducts() {
        products.sort((a, b) => {
            if(sort == 1) {
                if(a.name < b.name) return 1;
                if(a.name > b.name) return -1;    
            }
            if(sort == -1) {
                if(a.name < b.name) return -1;
                if(a.name > b.name) return 1; 
            }
            return 0;
        });
        setProducts([...products])
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
                if(category != route.product.category._id) products.splice(index, 1)
                setProducts([...products]);
                route = {};
                return;
            } 
            if (index == -1 && route.method == 'create' && category == route.product.category._id || category == null) {
                setProducts([...products, route.product]);
                route = {};
                return;
            }
            
        }

    }, [route])

    return(

        <SafeAreaView style={styles.container}>
            
            <Header title={'produtos'}>
                <FilterButton
                    action={() => {
                        if(sort != 1) {
                            setSort(1);
                            sortProducts();
                        } else{
                            setSort(-1);
                            sortProducts();
                        }
                    }}
                    icon='filter-outline'
                    subIcon={sort == 1 ? 'alpha-z-box' : 'alpha-a-box'}
                />
            </Header>

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
                                category == thisCategory._id && { backgroundColor: '#639DFF' }
                            ]}
                            onPress={() => loadProductWithParams(thisCategory._id)}
                        >
                            <Text
                                style={[
                                    styles.buttonBlackText,
                                    category == thisCategory._id && { color: '#FFFFFF' }
                                ]}
                            >{thisCategory.name}</Text>
                        </TouchableOpacity>
                    )}
                    ListHeaderComponent={
                        <TouchableOpacity
                            style={[
                                styles.buttonTag,
                                category == null && { backgroundColor: '#639DFF' }
                            ]}
                            onPress={() => loadProductWithParams(null)}
                        >
                            <Text
                                style={[
                                    styles.buttonBlackText,
                                    category == null && { color: '#FFFFFF' }
                                ]}
                            >Todos</Text>
                        </TouchableOpacity>
                    }
                    ListEmptyComponent={<>
                        {loading &&
                        <Skeleton style={{ flexDirection: 'row' }}>
                            <TouchableOpacity style={styles.buttonTag} />
                            <TouchableOpacity style={styles.buttonTag} />
                            <TouchableOpacity style={styles.buttonTag} />
                            <TouchableOpacity style={styles.buttonTag} />
                            <TouchableOpacity style={styles.buttonTag} />
                        </Skeleton>}       
                    </>}
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
                ListEmptyComponent={
                    loading &&
                    <Skeleton>
                        <Card style={{ backgroundColor: '#F5F5F5' }} />
                        <Card style={{ backgroundColor: '#F5F5F5' }} />
                        <Card style={{ backgroundColor: '#F5F5F5' }} />
                        <Card style={{ backgroundColor: '#F5F5F5' }} />
                        <Card style={{ backgroundColor: '#F5F5F5' }} />
                        <Card style={{ backgroundColor: '#F5F5F5' }} />
                        <Card style={{ backgroundColor: '#F5F5F5' }} />
                        <Card style={{ backgroundColor: '#F5F5F5' }} />
                        <Card style={{ backgroundColor: '#F5F5F5' }} />
                        <Card style={{ backgroundColor: '#F5F5F5' }} />
                        <Card style={{ backgroundColor: '#F5F5F5' }} />
                        <Card style={{ backgroundColor: '#F5F5F5' }} />
                        <Card style={{ backgroundColor: '#F5F5F5' }} />
                        <Card style={{ backgroundColor: '#F5F5F5' }} />
                    </Skeleton>
                }               
            />
            
            <View style={styles.absoluteBottomRight}>
                <ActionButton icon={'plus'} action={navigateToNew}/>
            </View>        
                
            
        </SafeAreaView>
    )
}