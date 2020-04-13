import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, AsyncStorage } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import Header from '../../../components/Header'; 
import styles from '../../global';
import api from '../../../services/axios';
import image from '../../../assets/illustrations/store.png';

export default function Panel() {

	const navigation = useNavigation();
	const [ user, setUser ] = useState()
	
	useEffect(() => {

		async function loadPanel() {
			const storeToken = await AsyncStorage.getItem('@Carpede:storeToken');
			//const response = await api.post('', { headers: { Authorization: `Bearer ${storeToken}` } })
			console.log(response.data)
			setUser(response.data)
		}

		loadPanel()

	}, [])

	function navigateToProfile() {
		navigation.navigate('StoreProfile');
	}
	function navigateToProducts() {
		navigation.navigate('StoreProducts');
	}
	
    return(
		<View style={styles.containerYBetween}>
			<View style={styles.box}>
				<Header title={'Lanchão do Zeca'}/> 
				<View style={styles.groupInput}>
					<TouchableOpacity style={styles.action} onPress={navigateToProfile}>
						<Feather style={styles.iconAction} name="user" size={24} color="#585858" />
						<Text style={styles.textAction}>Perfil</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.action} onPress={navigateToProducts}>
						<Feather style={styles.iconAction} name="package" size={24} color="#585858" />
						<Text style={styles.textAction}>Produtos</Text>
					</TouchableOpacity>
				</View>
			</View>
			<Image source={image} style={{width: '100%'}}/>
		</View>
    )
}