import React from 'react';
import { SafeAreaView, View, Text, FlatList, Linking } from 'react-native';
import { useRoute } from '@react-navigation/native';
import styles from '../../../pages/global';

import { CardItem, Checkout, Price } from '../../../components/Item';
import { Header } from '../../../components/Header';
import { Button, ActionButton, LinearButton } from '../../../components/Button';
import { LocationMap } from '../../../components/Map';

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
            
            <View style={[styles.row, { alignItems: 'center', marginBottom: 0 }]}>
                <Text style={styles.subtitle}>#</Text>
                <Text style={styles.title}>{order.order_id}</Text>
            </View>

            <View style={styles.column}>
                <Text style={styles.textBold}>{order.customer.name}</Text>
            </View>

            <View style={styles.orderList}>
                <Text style={[styles.subtitle, { marginBottom: 8 }]}>Detalhes do pedido:</Text>
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
            
            <View style={[styles.column, { flexGrow: 0, alignItems: 'flex-end' }]}>
                <Text style={styles.text}>Total:</Text>
                <Price value={order.value} style={[styles.title, { marginBottom: 16 }]}/>
            </View>

            <LocationMap latitude={order.location.coordinates[0]} longitude={order.location.coordinates[1]} />

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

                    { order.paymentMethod.money ? <>
                        <View style={[styles.column,{ paddingHorizontal: 0, flexGrow: 1 }]}>
                            <Text style={styles.text}>Dinheiro</Text>
                            <Price value={order.paymentMethod.money.amount} style={{ color: '#271814' }}/>   
                        </View>
                        <View style={[styles.column,{ paddingHorizontal: 0, flexGrow: 1 }]}>
                            <Text style={[styles.text, { color: '#271814' }]}>Troco</Text>
                            <Price value={order.paymentMethod.money.change} style={{ color: '#271814' }}/>   
                        </View>
                        </>: null
                    }
                    { order.paymentMethod.card ?
                        <View style={[styles.column,{ paddingHorizontal: 0, flexGrow: 1 }]}>
                            <Text style={styles.text}>Cartão</Text>
                            <Text style={styles.subtitle}>
                                {order.paymentMethod.card.method}
                            </Text>    
                        </View>
                        :null
                    }   
                </View>

                <View style={styles.row}>
                    <Text style={styles.textBold}>Contato:</Text>
                </View>

                <View style={styles.row}>
                    <ActionButton icon={'whatsapp'} style={{ marginRight: 8 }} action={sendWhatsapp}/> 
                    <ActionButton icon={'map-marker'} /> 
                </View>

                <View style={[styles.column,{ marginBottom: 32 }]}>
                    <Text style={styles.textBold}>Entrega:</Text>
                    <Text style={styles.text}>{order.customer.address}</Text>
                </View>

                <View style={styles.column}>
                    <Button title='Encerrar Pedido' />
                </View>

            </Checkout>


        </SafeAreaView>
    )
}