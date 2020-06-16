import React from 'react';
import { SafeAreaView, View, Text, FlatList, Linking } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import apiReq from '../../../services/reqToken'

import styles from '../../../global';
import { CardItem, Checkout, Price } from '../../../components/Item';
import { Header } from '../../../components/Header';
import { Button, ActionButton, LinearButton } from '../../../components/Button';


export default function Show() {

    const navigation = useNavigation();
    const route = useRoute();
    const order = route.params.order;

    function sendWhatsapp() {
        Linking.openURL(`whatsapp://send?phone=${order.customer.whatsapp}`)
    }

    function navigateToDelivery() {
        navigation.navigate('StoreDelivery', { order }); 
    }

    async function handleDeleteOrder() {
        
        const { data } = await apiReq.post('orders/delete', { id: order._id })
        if(data) {
            navigation.goBack();
        }
        return;
    }

    return (
        <SafeAreaView style={styles.container}>

            <Header title={`#${order.order_id}`}>
                <LinearButton icon={'trash-can-outline'} action={handleDeleteOrder}/>
            </Header>

            <View style={styles.column}>
                <Text style={styles.subtitle}>{order.customer.name}</Text>
            </View>

            <View style={[styles.row,{ marginBottom: 0 }]}>
                <Text style={styles.textBold}>Detalhes do pedido:</Text> 
            </View>
                
            <FlatList
                style={styles.orderList}
                data={order.products}
                keyExtractor={product => String(product._id)}
                showsVerticalScrollIndicator={false}
                numColumns={1}
                renderItem={({ item: product }) => (
                    <CardItem
                        amount={product.quantity}
                        title={product.product.name}
                        price={product.product.price}
                    />
                )}
            />    
            
            
            <View style={[styles.column, { flexGrow: 0, alignItems: 'flex-end' }]}>
                <Text style={styles.text}>Total:</Text>
                <Price value={order.value} style={[styles.title, { marginBottom: 80 }]}/>
            </View>

            <Checkout>
                <View style={[styles.row, styles.alignCenterX]}>
                    <ActionButton
                        icon={'motorbike'}
                        title={'Entrega'}
                    />
                </View>

                <View style={styles.row}>
                    <Text style={styles.textBold}>Pagamento:</Text>
                </View>

                <View style={styles.row}>
                    
                    <View style={[styles.column,{ paddingHorizontal: 0, flexGrow: 1 }]}>
                        <Text style={styles.text}>Total</Text>
                        <Price value={order.value} /> 
                    </View>

                    { order.paymentMethod.money && <>
                        <View style={[styles.column,{ paddingHorizontal: 0, flexGrow: 1 }]}>
                            <Text style={styles.text}>Dinheiro</Text>
                            <Price value={order.paymentMethod.money.amount} style={{ color: '#271814' }}/>   
                        </View>
                        <View style={[styles.column,{ paddingHorizontal: 0, flexGrow: 1 }]}>
                            <Text style={[styles.text, { color: '#271814' }]}>Troco</Text>
                            <Price value={order.paymentMethod.money.change} style={{ color: '#271814' }}/>   
                        </View>
                        </>
                    }
                    { order.paymentMethod.card &&
                        <View style={[styles.column,{ paddingHorizontal: 0, flexGrow: 1 }]}>
                            <Text style={styles.text}>Cartão</Text>
                            <Text style={styles.subtitle}>
                                {order.paymentMethod.card.method}
                            </Text>    
                        </View>
                    }   
                </View>

                <View style={styles.row}>
                    <Text style={styles.textBold}>Contato:</Text>
                </View>

                <View style={styles.row}>
                    <ActionButton icon={'whatsapp'} style={{ marginRight: 8 }} action={sendWhatsapp}/> 
                    <ActionButton icon={'map-marker'} action={navigateToDelivery}/> 
                </View>

                <View style={[styles.column,{ marginBottom: 32 }]}>
                    <Text style={styles.textBold}>Entrega:</Text>
                    <Text style={styles.text}>{order.customer.address} {order.customer.complement} {order.customer.number}</Text>
                </View>

                <View style={styles.column}>
                    <Button title='Encerrar Pedido' />
                </View>

            </Checkout>


        </SafeAreaView>
    )
}