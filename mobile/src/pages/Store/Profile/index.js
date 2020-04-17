import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, SafeAreaView, ScrollView, AsyncStorage } from 'react-native';
import Header from '../../../components/Header'; 
import api from '../../../services/axios';

import styles from '../../global';

export default function Profile() {

    const [ name, setName ] = useState('');
    const [ description, setDescription ] = useState('');
    const [ whatsapp, setWhatsapp ] = useState('');
    const [ phone, setPhone ] = useState('');
    const [ tags, setTags ] = useState('');
    const [ status, setStatus ] = useState('');
    const [ alertZ, setAlertZ ] = useState(-999);
    const [ alertColor, setAlertColor ] = useState('');

    async function loadProfile() {
        const storeToken = await AsyncStorage.getItem('@Carpede:storeToken');
        const { data } = await api.get('profile', { headers : { 'Authorization': `Bearer ${storeToken}` } });

        setName(data.name);
        setDescription(data.description);
        setWhatsapp(data.whatsapp);
        setPhone(data.phone);
        setTags(data.tags);
    }

    useEffect(() => {
        loadProfile();
    }, [])

    async function handleUpdate() {
        
        const storeToken = await AsyncStorage.getItem('@Carpede:storeToken');
        
        const { data } = await api.post('profile', {
            name,
            description,
            whatsapp,
            phone,
            tags
        } , { headers: { 'Authorization': `Bearer ${storeToken}` } });

        if(data.status !== undefined) {
            setStatus(data.status);
            setAlertColor('#6FCF97');
        }
        if(data.error !== undefined){
            setStatus(data.error);
            setAlertColor('#FF3A4F');
        }

        setAlertZ(999);

        return setTimeout(() => {
            setAlertZ(-999);
        }, 3000)

    }
        return(<>
            <SafeAreaView style={styles.container}>
                <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                    <Header title={'Meu perfil'}/>
                    <View style={styles.groupInput}>
                        <Text style={styles.labelInput}>Nome da loja</Text>
                        <TextInput
                            style={styles.textInput}
                            defaultValue={name}
                            onChangeText={e => setName(e)}
                        />
                    </View>
                    <View style={styles.groupInput}>
                        <Text style={styles.labelInput}>Descrição</Text>
                        <TextInput
                            multiline={true}
                            numberOfLines={10}
                            style={styles.textareaInput}
                            defaultValue={description}
                            onChangeText={e => setDescription(e)}
                        />
                    </View>
                    <View style={styles.groupInput}>
                        <Text style={styles.labelInput}>Whatsapp</Text>
                        <TextInput
                            style={styles.textInput}
                            defaultValue={whatsapp}
                            onChangeText={e => setWhatsapp(e)}
                        />
                    </View>
                    <View style={styles.groupInput}>
                        <Text style={styles.labelInput}>Telefone</Text>
                        <TextInput
                            style={styles.textInput}
                            value={phone}
                            onChangeText={e => setPhone(e)}
                        />
                    </View>
                    <View style={styles.groupInput}>
                        <Text style={styles.labelInput}>Principais produtos</Text>
                        <Text style={styles.textAlert}>Separe o nome básico de seus produtos por virgulas.</Text>
                        <TextInput
                            multiline={true}
                            numberOfLines={10}
                            style={styles.textareaInput}
                            placeholder={'ex:  sapato, camisa, meia, tênis, calça, bermuda'}
                            value={tags}
                            onChangeText={e => setTags(e)}
                        />
                    </View>
                    <TouchableOpacity style={styles.buttonGreen} onPress={handleUpdate}>
                        <Text style={styles.buttonWhiteText}>Salvar</Text>
                    </TouchableOpacity>
                </ScrollView>
            </SafeAreaView>
            <View style={[styles.alertError, { zIndex: alertZ, backgroundColor: `${alertColor}` }]}>
                <Text style={styles.alertText}>{status}</Text>
            </View>

        </>)        
}