import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, AsyncStorage, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome5 as FA } from '@expo/vector-icons';
import Header from '../../../components/Header'; 
import styles from '../../global';
import api from '../../../services/axios';
import image from '../../../assets/illustrations/store.png';

export default function Panel() {

	const [ store, setStore ] = useState('');
	const [ loadedPage, setLoadedPage ] = useState(false);

	async function loadPanel() {
		const storeToken = await AsyncStorage.getItem('@Carpede:storeToken');
		const response = await api.get('panel', { headers : { 'Authorization': `Bearer ${storeToken}` } });
		setStore(response.data.name)
		if(loadedPage === false) setLoadedPage(true);
	};
	
	useEffect(() => {		
		loadPanel();
	}, []);

	
	const navigation = useNavigation();

	function navigateToProfile() {
		navigation.navigate('StoreProfile');
	}
	function navigateToProducts() {
		navigation.navigate('StoreProducts');
	}
	
    return(<>
		{loadedPage ? (
			<View style={styles.containerYBetween}>
				<View style={styles.box}>
					<Header title={store}/> 
					<View style={styles.groupInput}>
						<TouchableOpacity style={styles.action} onPress={navigateToProfile}>
							<FA style={styles.iconAction} name="user-alt" size={16} color="#585858" />
							<Text style={styles.textAction}>Perfil</Text>
						</TouchableOpacity>
						<TouchableOpacity style={styles.action} onPress={navigateToProducts}>
							<FA style={styles.iconAction} name="box" size={16} color="#585858" />
							<Text style={styles.textAction}>Produtos</Text>
						</TouchableOpacity>
					</View>
				</View>
				<Image source={image} style={{width: '100%'}}/>
			</View>
		):(
			<View style={{ flex: 1, justifyContent: 'center', alignContent: 'center', backgroundColor: '#fff'}}>
                <ActivityIndicator size="large" color="#6FCF97" />
            </View>
		)}
		</>)
	
}