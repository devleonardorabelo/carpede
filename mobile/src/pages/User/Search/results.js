import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Header from '../../../components/Header'
import styles from '../../global';

import stars from '../../../assets/more/star4.png'

export default function Results() {

    const navigation = useNavigation();

    function navigateToStore() {
        navigation.navigate('UserSearchProfile');
    }

    return(
        <View style={styles.container}>
            <Header title={'Hamburger'} />
            <Text style={[styles.subtitle, { paddingBottom: 10}]}>Resultados:</Text>
            <View style={styles.listStores}>
                <TouchableOpacity style={styles.fullCard} onPress={navigateToStore}>
                    <Text style={styles.subtitle}>Pizzaria do João</Text>
                    <Image source={stars} />
                </TouchableOpacity>
            </View>
        </View>
    )
}