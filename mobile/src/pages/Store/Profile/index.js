import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, SafeAreaView, ScrollView, AsyncStorage, ActivityIndicator } from 'react-native';
import Header from '../../../components/Header'; 
import api from '../../../services/axios';
import { FontAwesome5 as FA, Ionicons as IO } from '@expo/vector-icons'

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
    const [ loadedPage, setLoadedPage ] = useState(false);
    const [ done, setDone ] = useState(false);

    async function loadProfile() {
        
        const storeToken = await AsyncStorage.getItem('@Carpede:storeToken');
        const { data } = await api.get('profile', { headers : { 'Authorization': `Bearer ${storeToken}` } });

        setName(data.name);
        setDescription(data.description);
        setWhatsapp(data.whatsapp);
        setPhone(data.phone);
        setTags(data.tags);

        setLoadedPage(true);
    }

    useEffect(() => {
        loadProfile();
    }, [])

    async function handleUpdate() {
        
        setDone(true);

        const storeToken = await AsyncStorage.getItem('@Carpede:storeToken');
        
        const { data } = await api.post('profile', {
            name,
            description,
            whatsapp,
            phone,
            tags
        } , { headers: { 'Authorization': `Bearer ${storeToken}` } });

        if(data.status !== undefined) {
            setDone(false);
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
        }, 2000)

    }
    return(<>
        {loadedPage ? (
        <>
            <SafeAreaView style={styles.container}>
                <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                    <Header title={'Meu perfil'}/>
                    <View style={styles.groupInput}>
                        <Text style={styles.labelInput}>Nome da loja</Text>
                        <View style={styles.boxInput}>
                            <FA
                            style={styles.iconInput}
                            name='store'
                            color='#585858'
                            size={16}
                            />
                            <TextInput
                                style={styles.textInput}
                                defaultValue={name}
                                onChangeText={e => setName(e)}
                            />    
                        </View>
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
                        <View style={styles.boxInput}>
                            <IO
                            style={styles.iconInput}
                            name='logo-whatsapp'
                            color='#585858'
                            size={18}
                            />
                            <TextInput
                                style={styles.textInput}
                                defaultValue={whatsapp}
                                onChangeText={e => setWhatsapp(e)}
                            />
                        </View>
                    </View>
                    <View style={styles.groupInput}>
                        <Text style={styles.labelInput}>Telefone</Text>
                        <View style={styles.boxInput}>
                            <FA
                            style={styles.iconInput}
                            name='phone'
                            color='#585858'
                            size={16}
                            />
                            <TextInput
                                style={styles.textInput}
                                value={phone}
                                onChangeText={e => setPhone(e)}
                            />
                        </View>
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
                    <TouchableOpacity style={[styles.buttonGreen, { backgroundColor: done ? '#BACFC3' : '#6FCF97' }]} onPress={handleUpdate} disabled={done}>
                        {done ?
                            <ActivityIndicator size="large" color="#fff" />
                        : (
                            <Text style={styles.buttonWhiteText}>Entrar</Text>
                        )}
                    </TouchableOpacity>
                </ScrollView>
                
            </SafeAreaView>
            <View style={[styles.alertError, { zIndex: alertZ, backgroundColor: `${alertColor}` }]}>
                <Text style={styles.alertText}>{status}</Text>
            </View>
        </>
            ) : (
            <View style={{ flex: 1, justifyContent: 'center', alignContent: 'center', backgroundColor: '#fff'}}>
                <ActivityIndicator size="large" color="#6FCF97" />
            </View>
            
        )}
    </>)        
}
