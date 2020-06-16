import React, { useState, useCallback } from 'react';
import { SafeAreaView, FlatList, View, Image, Text } from 'react-native';
import apiReq from '../../../services/reqToken';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

import styles from '../../../global';
import Loading from '../../../components/Loading';
import { Header } from '../../../components/Header';
import { CardOrder } from '../../../components/Item';
import { Button } from '../../../components/Item';


import img_order from '../../../assets/illustrations/orders.png'

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

    if(!loadedPage) return <Loading />

    return (
        <SafeAreaView style={styles.container}>
            <Header title={'pedidos'}/>
            {orders.length == 0 ?
                <>
                    <View style={styles.column}>
                        <Text style={styles.title}>Ops...</Text>
                        <Text style={styles.grayTitle}>Você ainda não tem nenhum pedido!</Text>
                    </View>
                    <View style={styles.column}>
                        <Image style={styles.illustration} source={img_order} />
                    </View>
                </>
            :
                <>
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
                                    title={`#${order.order_id} - ${order.customer.name}`}
                                    address={`${order.customer.address} ${order.customer.complement} ${order.customer.number}`}
                                    time={order.time}
                                    price={order.value}
                                />
                            )}
                        />     
                    </View>
                </>
            }  
        </SafeAreaView>
    )
}