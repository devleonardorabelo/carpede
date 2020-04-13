import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native'; 
import styles from '../../global';
import image from '../../../assets/illustrations/handshake.png';

export default function Search() {

    const navigation = useNavigation();

    function handleSearch() {
        navigation.navigate('UserSearchResults');
    }

    return(
        <View style={styles.containerYBetween}>
            <View style={styles.box}>
                <Text style={[styles.title , { marginBottom: 10 }]}>Procure sem sair de casa</Text>
                <Text style={[styles.subtitle, { marginBottom: 40 }]}>Encontre perto de você pessoas que querem vender o que você está precisando.</Text>
                <View style={styles.groupInput}>
                    <Text style={styles.labelInput}>O que você precisa?</Text>
                    <TextInput style={styles.textInput} placeholder={'ex: hamburguer, sapato'} onKeyPress={handleSearch}/>
                </View>    
            </View>
            <Image source={image} style={{width: '100%'}} />
        </View>
    )
}