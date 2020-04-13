import React from 'react';
import { View, Text, TouchableOpacity, Image, SafeAreaView, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Header from '../../../components/Header'
import styles from '../../global';

import stars from '../../../assets/more/star4.png';
import whatsapp from '../../../assets/more/whatsapp.png';
import phone from '../../../assets/more/phone.png';
import product from '../../../assets/uploads/1.png';

export default function SearchStoreProfile() {
    return(
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                <Header title={'Lanchão do Zéca'} />
                <View style={[styles.fullCard, { marginBottom: 20 }]}>
                    <Text style={styles.subtitle}>Descrição</Text>
                    <Image source={stars} style={{marginBottom: 10}}/>
                    <Text style={styles.text}>Somos uma loja especializada em vender lanches do tamanho família e garantimos um valor camarada para nossos clientes. Confira já entrando em contato com a gente!</Text>
                    <View style={{marginTop: 20, flexDirection: 'row'}}>
                        <TouchableOpacity style={[styles.buttonWhatsapp, { marginRight: 20 }]}>
                            <Image source={whatsapp} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buttonPhone}>
                            <Image source={phone} />
                        </TouchableOpacity>    
                    </View>
                </View>
                <Text style={[styles.subtitle, { marginBottom: 20 }]}>Produto disponíveis</Text>
                <View style={styles.listProducts}>
                    <TouchableOpacity style={styles.card}>
                        <View style={styles.cardBody}> 
                            <Image
                                style={styles.cardImage}
                                source={product}
                                resizeMode='cover'
                            />
                            <Text style={[styles.text, { paddingTop: 10 }]}>X-Burger</Text>
                            <Text style={[styles.subtitle, { paddingBottom: 10}]}>R$ 22,00</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.card}>
                        <View style={styles.cardBody}> 
                            <Image
                                style={styles.cardImage}
                                source={product}
                                resizeMode='cover'
                            />
                            <Text style={[styles.text, { paddingTop: 10 }]}>X-Burger</Text>
                            <Text style={[styles.subtitle, { paddingBottom: 10}]}>R$ 22,00</Text>
                        </View>
                    </TouchableOpacity> 
                    <TouchableOpacity style={styles.card}>
                        <View style={styles.cardBody}> 
                            <Image
                                style={styles.cardImage}
                                source={product}
                                resizeMode='cover'
                            />
                            <Text style={[styles.text, { paddingTop: 10 }]}>X-Burger</Text>
                            <Text style={[styles.subtitle, { paddingBottom: 10}]}>R$ 22,00</Text>
                        </View>
                    </TouchableOpacity>                 
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}