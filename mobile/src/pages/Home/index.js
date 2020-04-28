import React, { useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, AsyncStorage } from 'react-native' ;
import { useNavigation } from '@react-navigation/native';
import boxImg from '../../assets/illustrations/box.png'
import api from '../../services/api';
import styles from '../global';
import { Button } from '../../components/Button';

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
	function navigateToSearch() {
		navigation.navigate('UserSearch');
	}

	return(

		<View style={styles.container}>
			
			<Text style={[styles.title, { marginTop: 50 }]}>Encontre tudo que precisa</Text>
			<Image style={styles.illustration} source={boxImg} />
			<TouchableOpacity style={styles.buttonOrange} onPress={navigateToSearch}>
				<Text style={styles.buttonWhiteText}>Eu quero encontrar</Text>
			</TouchableOpacity>
			<TouchableOpacity style={styles.buttonTransparent} onPress={navigateToSignin}>
				<Text style={styles.buttonBlackText} >Eu quero vender</Text>
			</TouchableOpacity>
		</View>
	)
}
