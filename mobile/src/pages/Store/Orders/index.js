import React, { useState, useCallback } from 'react';
import { SafeAreaView, Text, FlatList, View } from 'react-native';
import apiReq from '../../../services/reqToken';
import styles from '../../global';

import Loading from '../../../components/Loading';
import { Header } from '../../../components/Header';
import { CardOrder } from '../../../components/Item'
import { useNavigation, useFocusEffect } from '@react-navigation/native';

export default function Order() {

    const [ orders, setOrders ] = useState([]);
    const [ total, setTotal ] = useState(0)
    const [ page, setPage ] = useState(1);
    const [ loading, setLoading ] = useState(false);
    const [ loadedPage, setLoadedPage ] = useState(false);

    const navigation = useNavigation();

    async function loadOrders() {
        
        if(loading) return;

        if(total > 0 && orders.length == total) return;

        setLoading(true);

        const { data, headers } = await apiReq.get('orders', {
            params: { page }
        });

        if(loadedPage === false) setLoadedPage(true);

        if(data.length) {
            setOrders([...orders, ...data]);
            setTotal(headers['x-total-count']);
            setPage(page + 1);
        }

        setLoading(false);

    }

    useFocusEffect(
        useCallback(() => {
            loadOrders();
        }, [])
    )    

    function navigateToOrder(order) {
        navigation.navigate('StoreOrder', { order });
    }

    return (<>{loadedPage ?
        <SafeAreaView style={styles.container}>
            <Header title={'pedidos'}/>
            <View style={styles.column}>
                <FlatList
                    data={orders}
                    keyExtractor={order => String(order._id)}
                    showsVerticalScrollIndicator={false}
                    onEndReached={loadOrders}
                    onEndReachedThreshold={0.3}
                    numColumns={1}
                    renderItem={({ item: order }) => (
                        
                        <CardOrder
                            action={() => navigateToOrder(order)}
                            title={order.customer.name}
                            address={order.customer.address}
                            time={order.time}
                            price={order.value}
                        />
                    )}
                />     
            </View>
            
        </SafeAreaView>
    :
        <Loading />
    }</>)
}