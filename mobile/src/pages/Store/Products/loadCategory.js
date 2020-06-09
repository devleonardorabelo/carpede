import React, { useState, useEffect } from 'react';
import { FlatList, SafeAreaView, View, Text } from 'react-native';
import apiReq from '../../../services/reqToken';
import styles from '../../global';
import { useNavigation, useRoute } from '@react-navigation/native';

import Loading from '../../../components/Loading';
import { Header } from '../../../components/Header';
import { Card } from '../../../components/Item';
import { Button } from '../../../components/Button';

export default function Categories() {

    const [ categories, setCategories ] = useState([]);
    const [ total, setTotal ] = useState(0);
    const [ page, setPage ] = useState(1);
    const [ loadedPage, setLoadedPage ] = useState(false);
    const [ loading, setLoading ] = useState(false);

    const navigation = useNavigation();
    const { params } = useRoute();

    async function loadCategories() {

        if(loading) return

        if(total > 0 && categories.length === total) return

        setLoading(true);

        const { data, headers } = await apiReq.get('categories',{ 
            params: { page },
        });

        if(loadedPage === false) setLoadedPage(true);

        if(data.length) {
            setCategories([...categories, ...data]);
            setTotal(headers['x-total-count']);
            setPage(page + 1);    
        }
        
        setLoading(false);
    }

    const navigateToEditProduct = category => navigation.navigate('StoreProductEdit', { category });

    const navigateToNewProduct = category => navigation.navigate('StoreProductNew', { category })

    const navigateToNew = () => navigation.navigate('StoreProductNew');

    useEffect(() => {
        loadCategories();
    },[])

    return(<>{loadedPage ? (

        <SafeAreaView style={styles.container}>
            <Header title={'SELECIONE UMA CATEGORIA'}/>
            
            {categories.length == 0 ?
                <>
                    <View style={styles.column}>
                        <Text style={styles.title}>Ops...</Text>
                        <Text style={[styles.subtitle,{ marginBottom: 16 }]}>Você ainda não tem nenhuma categoria</Text>
                        <Text style={styles.text}>Clique no botão abaixo para adicionar.</Text>
                    </View>
                    <View style={styles.column}>
                        <Button action={navigateToNew} title='Adicionar Categoria'/>
                    </View>
                </>
            :
                <FlatList
                    style={styles.column}
                    data={categories}
                    keyExtractor={categories => String(categories._id)}
                    showsVerticalScrollIndicator={false}
                    onEndReached={loadCategories}
                    onEndReachedThreshold={0.3}
                    numColumns={1}
                    renderItem={({ item: categories }) => (
                        
                        <Card
                            action={() => {
                                params.type == 'edit' ?
                                navigateToEditProduct(categories)
                                :
                                navigateToNewProduct(categories)
                                
                            }}
                            image={categories.image}
                            title={categories.name}
                            price={categories.price}
                        />
                    )}
                />
            }
            

        </SafeAreaView>
        ) : (
            <Loading />            
        )}
    </>)
}