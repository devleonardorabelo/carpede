import React, { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { SafeAreaView, Text, TouchableOpacity, AsyncStorage } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../../global';
import apiReq from '../../../services/reqToken';
import { API_DOMAIN } from '../../../constants/api';
import Loading from '../../../components/Loading';
import { NavItem, Avatar } from '../../../components/Item';
import { CustomHeader } from '../../../components/Header';

export default function Panel() {

	const [ store, setStore ] = useState('');
	const [ avatar, setAvatar ] = useState();
	const [ whatsapp, setWhatsapp ] = useState('');
	const [ loadedPage, setLoadedPage ] = useState(false);

	async function loadPanel() {
		const { data } = await apiReq.get('panel');
		setStore(data.name);
		setWhatsapp(data.whatsapp);
		if(data.avatar) setAvatar({uri: `${API_DOMAIN}/uploads/${data.avatar}`})
		if(loadedPage === false) setLoadedPage(true);
	};
	
	useFocusEffect(
        useCallback(() => {
			loadPanel();
		}, [])
	)

	const navigation = useNavigation();

	const navigateToProfile = () => navigation.navigate('StoreProfile');
	const navigateToProducts = () => navigation.navigate('StoreProducts');
	const navigateToOrders = () => navigation.navigate('StoreOrders');

	async function signout() {
		await AsyncStorage.clear();
		return navigation.navigate('Home');
	}
	
    return(<>
		{loadedPage ? (
			<SafeAreaView style={styles.container}>

				<CustomHeader icon={'logout'} action={signout} />
				
				<Avatar
					image={avatar}
					title={store}
					subtitle={whatsapp}
				/>
				<Text style={styles.subtitle}>Seja bem-vindo</Text>
				<NavItem
					action={navigateToOrders}
					icon='motorbike'
					title='Pedidos'
					subtitle='Lista de pedidos ativos'
				/>
				<NavItem
					action={navigateToProducts}
					icon='package-variant-closed'
					title='Produtos'
					subtitle='Lista de produtos'
				/>
				<NavItem
					action={navigateToProfile}
					icon='account'
					title='Perfil'
					subtitle='Informações da Loja'
				/>


			</SafeAreaView>
		):(
			<Loading />
		)}
		</>)
	
}