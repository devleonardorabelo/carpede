import React from 'react';
import { View, Text, TouchableOpacity, TextInput, SafeAreaView, ScrollView } from 'react-native';
import Header from '../../../components/Header'; 

import styles from '../../global';

export default function Profile() {

    return(
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                <Header title={'Meu perfil'}/>
                <View style={styles.groupInput}>
                    <Text style={styles.labelInput}>Nome da loja</Text>
                    <TextInput
                        style={styles.textInput}
                        value={'Lanchão do Zéca'}
                    />
                </View>
                <View style={styles.groupInput}>
                    <Text style={styles.labelInput}>Nome da loja</Text>
                    <TextInput
                        multiline={true}
                        numberOfLines={10}
                        style={styles.textareaInput}
                    />
                </View>
                <View style={styles.groupInput}>
                    <Text style={styles.labelInput}>Whatsapp</Text>
                    <TextInput
                        style={styles.textInput}
                        value={'61 9 9679 0000'}
                    />
                </View>
                <View style={styles.groupInput}>
                    <Text style={styles.labelInput}>Telefone</Text>
                    <TextInput
                        style={styles.textInput}
                        value={'61 9 9679 0000'}
                    />
                </View>
                <View style={styles.groupInput}>
                    <Text style={styles.labelInput}>Principais produtos</Text>
                    <Text style={styles.textAlert}>Separe o nome básico de seus produtos por virgulas.</Text>
                    <TextInput
                        multiline={true}
                        numberOfLines={10}
                        style={styles.textareaInput}
                        placeholder={'ex:  sapato, camisa, meia, tênis, calça, bermuda       '}
                    />
                </View>
                <TouchableOpacity style={styles.buttonGreen}>
                    <Text style={styles.buttonWhiteText}>Salvar</Text>
                </TouchableOpacity>  
            </ScrollView>
            
        </SafeAreaView>
    )
}