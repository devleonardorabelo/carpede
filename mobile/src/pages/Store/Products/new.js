import React from 'react';
import { View, Image, TextInput, Text, TouchableOpacity } from 'react-native';
import Header from '../../../components/Header'

import styles from '../../global';

import product from '../../../assets/more/upload.png';

export default function NewProduct() {

    return(
        <View style={styles.container}>
            <Header title={'Novo Produto'}/>
            <Image source={product} style={styles.fullImage}/>
            <View style={styles.groupInput}>
                <Text style={styles.labelInput}>Nome do Produto</Text>
                <TextInput style={styles.textInput}/>
            </View>
            <View style={styles.groupInput}>
                <Text style={styles.labelInput}>Preço</Text>
                <TextInput style={[styles.textInput, { width: 100 }]}/>
            </View>
            <TouchableOpacity style={styles.buttonGreen}>
                <Text style={styles.buttonWhiteText}>Salvar</Text>
            </TouchableOpacity>
        </View>
    )
}