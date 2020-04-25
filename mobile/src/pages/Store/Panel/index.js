import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, AsyncStorage, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons'; 
import styles from '../../global';
import api from '../../../services/axios';
import image from '../../../assets/illustrations/store.png';
import star from '../../../assets/more/star4.png';
import Loading from '../../../components/Loading';

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

	async function signout() {
		await AsyncStorage.clear();
		return navigation.navigate('Home');
	}
	
    return(<>
		{loadedPage ? (
			<SafeAreaView style={styles.container}>

				<TouchableOpacity style={styles.navigationButton} onPress={signout}>
					<Feather name="log-out" size={32} color="#333" />
				</TouchableOpacity>
				<View style={[styles.store, { marginTop: 20 }]}>
					<Image
						style={styles.storeAvatar}
						source={image}
						resizeMode={'cover'}
					/>
					<View style={{ flexGrow: 1, paddingLeft: 16}}>
						<View style={{ flexDirection: 'row'}}>
							<Text style={[styles.title, styles.textWrap]}>{store}</Text>
						</View>	
						<Image source={star}/>
					</View>
				</View>
				<Text style={styles.subtitle}>Seja bem-vindo</Text>
				<View style={styles.groupInput}>
					<TouchableOpacity style={styles.action} onPress={navigateToProfile}>
						<View style={styles.iconAction}>
							<Feather name="user" size={24} color="#333" />	
						</View>
						<View style={{flexGrow: 1, justifyContent: 'center'}}>
							<Text style={styles.textAction}>Perfil</Text>
							<Text style={styles.subtitleTextAction}>Informações da loja</Text>
						</View>
						<View style={styles.arrowAction}>
							<Feather name="chevron-right" size={24} color="#333" />	
						</View>
					</TouchableOpacity>
					<TouchableOpacity style={styles.action} onPress={navigateToProducts}>
					<View style={styles.iconAction}>
							<Feather name="box" size={24} color="#333" />	
						</View>
						<View style={{flexGrow: 1, justifyContent: 'center'}}>
							<Text style={styles.textAction}>Produtos</Text>
							<Text style={styles.subtitleTextAction}>Informações da loja</Text>
						</View>
						<View style={styles.arrowAction}>
							<Feather name="chevron-right" size={24} color="#333" />	
						</View>
					</TouchableOpacity>
				</View>
				
			</SafeAreaView>
		):(
			<Loading />
		)}
		</>)
	
}