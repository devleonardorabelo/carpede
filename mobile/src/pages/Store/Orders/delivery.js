import React from 'react';
import { SafeAreaView, View, Text } from 'react-native';
import { LocationMap } from '../../../components/Map';
import { useRoute } from '@react-navigation/native';
import styles from '../../../global';
import { TransparentHeader } from '../../../components/Header';

export default function Delivery(){

    const route = useRoute();
    const order = route.params.order;

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <TransparentHeader/>
            <LocationMap latitude={order.location.coordinates[1]} longitude={order.location.coordinates[0]} />    
            <View style={[styles.column, styles.deliveryInfo, { marginBottom: 0 }]}>
                <Text style={[styles.textBold,{ color: '#FFFFFF' }]}>Endereço</Text>
                <Text style={[styles.textBold,{ color: '#FFFFFF' }]}>{order.customer.address}</Text>
            </View>
        </SafeAreaView>
    )
}