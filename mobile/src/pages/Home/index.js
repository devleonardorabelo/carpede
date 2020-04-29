import React, { useEffect } from 'react';
import { View, Text, Image, AsyncStorage, SafeAreaView } from 'react-native' ;
import { useNavigation } from '@react-navigation/native';
import boxImg from '../../assets/illustrations/box.png'
import api from '../../services/api';
import styles from '../global';
import { Button } from '../../components/Button';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function Home() {

	const navigation = useNavigation();

	async function checkLogged() {
		const storeToken = await AsyncStorage.getItem('@Carpede:storeToken');
		const { data } = await api.post('check', {
			storeToken
		});
		if(data.logged === true) return navigation.navigate('StorePanel');
		
		return

	}

	useEffect(() => {
		checkLogged();
	}, [])


	function navigateToSignin() {
		navigation.navigate('StoreSignin');
	}

	return(

		<SafeAreaView style={[styles.container, { paddingTop: 80 }]}>
			<Text style={[styles.title, { marginBottom: 10 }]}>Seja bem-vindo ao Carpede!</Text>
			<Text style={styles.grayTitle}>Proporcione aos seus clientes um atendimento personalizado</Text>
			<Image style={[styles.illustration, { marginTop: 50 }]} source={boxImg} />
			<TouchableOpacity style={styles.button} onPress={navigateToSignin}>
				<Text style={[styles.textAction, { color: '#fff' }]}>Quero começar a vender</Text>
			</TouchableOpacity>
		</SafeAreaView>
	)
}
