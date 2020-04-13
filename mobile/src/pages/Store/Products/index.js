import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import Header from '../../../components/Header';
import styles from '../../global';
import { useNavigation } from '@react-navigation/native';
import product from '../../../assets/uploads/1.png';
import product2 from '../../../assets/uploads/2.jpg';

export default function Products() {

    const navigation = useNavigation();

    function navigateToEdit() {
        navigation.navigate('StoreProductEdit');
    }

    function navigateToNew() {
        navigation.navigate('StoreProductNew');
    }

    return(
        <View style={styles.container}>
            <Header title={'Meus Produtos'}/>
            <View style={styles.listProducts}>
                <TouchableOpacity style={styles.card} onPress={navigateToEdit}>
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
            <TouchableOpacity style={styles.buttonGreen} onPress={navigateToNew}>
                <Text style={styles.buttonWhiteText}>Adicionar Produto</Text>
            </TouchableOpacity> 
        </View>
    )
}