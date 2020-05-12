import React from 'react';
import { SafeAreaView, View, Text, FlatList, Linking } from 'react-native';
import { useRoute } from '@react-navigation/native';
import styles from '../../../pages/global';

import { CardItem, Checkout, Price } from '../../../components/Item';
import { Header } from '../../../components/Header';
import { Button, ActionButton, LinearButton } from '../../../components/Button';

export default function Show() {

    const route = useRoute();
    const order = route.params.order;

    function sendWhatsapp() {
        Linking.openURL(`whatsapp://send?phone=${order.customer.whatsapp}`)
    }

    return (
        <SafeAreaView style={styles.container}>

            <Header>
                <LinearButton icon={'trash-can-outline'} />
            </Header>
            
            <View style={{ marginBottom: 16 }}>
                <Text style={[styles.title, { marginBottom: 8 }]}>{order.customer.name}</Text> 
                <View style={styles.box}>
                    <Text style={[styles.tag , { marginRight: 8 }]}>{order.time}</Text>
                    <Text style={styles.text}>{order.status}</Text>  
                </View>
            </View>

            <View style={styles.orderList}>
                <Text style={[styles.subtitle, { marginBottom: 16 }]}>Detalhes do pedido:</Text>
                
                <FlatList
                    data={order.products}
                    keyExtractor={product => String(product._id)}
                    showsVerticalScrollIndicator={false}
                    numColumns={1}
                    renderItem={({ item: product }) => (
                        <CardItem
                            amount={product.amount}
                            title={product.item.name}
                            price={product.item.price}
                        />
                    )}
                />    
            </View>
            
            <View style={[styles.block, { flexGrow: 0 }]}>
                <Text style={[styles.text, { color: '#FFFFFF' }]}>Total:</Text>
                <Price value={order.value} style={{ fontSize: 24, color: '#FFFFFF'}}/>
            </View>

            <Checkout>
                <View style={[styles.row, styles.alignCenterX]}>
                    <ActionButton icon={'motorbike'} style={{marginTop: -16, backgroundColor: '#02c39a'}}/>
                </View>
                <View style={styles.column}>
                    <Text style={[styles.subtitle, { marginBottom: 8 }]}>Pagamento:</Text>
                    <View style={[styles.block, { backgroundColor: '#FFFFFF' }]}>
                        <Text style={styles.text}>Total</Text>
                        <Price value={order.value} /> 
                    </View>
                    { order.paymentMethod.money ?
                        <View style={{ flexDirection: 'row' }}>
                            <View style={[styles.block, { marginRight: 8 }]}>
                                <Text style={[styles.text, { color: '#fff' }]}>Dinheiro</Text>
                                <Price value={order.paymentMethod.money.amount} style={{ color: '#FFFFFF' }}/>   
                            </View>
                            <View style={[styles.block, { marginLeft: 8 }]}>
                                <Text style={[styles.text, { color: '#fff' }]}>Troco</Text>
                                <Price value={order.paymentMethod.money.change} style={{ color: '#FFFFFF' }}/>   
                            </View>
                        </View>
                        : null
                    }
                    { order.paymentMethod.card ?
                        <View style={styles.block}>
                            <Text style={[styles.text, { color: '#fff' }]}>Cartão</Text>
                            <Text style={[styles.subtitle, { color: '#fff' }]}>
                                {order.paymentMethod.card.method}
                            </Text>    
                        </View>
                        :null
                    }   
                </View>

                <View style={styles.column}>
                    <Text style={styles.subtitle}>Entrega:</Text>
                    <Text style={styles.text}>{order.customer.address}</Text>
                </View>

                <View style={styles.row}>
                    <ActionButton icon={'whatsapp'} style={{marginRight: 8}} action={sendWhatsapp}/>
                    <ActionButton icon={'map-marker'} />
                </View>

                <View style={styles.column}>
                    <Button title='Encerrar Pedido' />
                </View>

            </Checkout>


        </SafeAreaView>
    )
}