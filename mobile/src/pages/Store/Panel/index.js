import React, { useState, useContext, useEffect } from 'react';
import AuthContext from '../../../contexts/auth';
import { SafeAreaView, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../../../global';
import { API_DOMAIN } from '../../../constants/api';
import { NavItem, Avatar } from '../../../components/Item';
import { CustomHeader } from '../../../components/Header';

import { format } from '@buttercup/react-formatted-input';
import { WhatsappFormat } from '../../../utils/treatString';

export default function Panel() {

	const { store, signOut } = useContext(AuthContext);

	const [ name, setName ] = useState('');
	const [ avatar, setAvatar ] = useState();
	const [ whatsapp, setWhatsapp ] = useState('');

	async function loadPanel() {
		setName(store.name);
		setWhatsapp(format(store.whatsapp, WhatsappFormat));
		if(store.avatar) setAvatar({uri: `${API_DOMAIN}/uploads/${store.avatar}`})
	};
	
	useEffect(() => {
		loadPanel();
	},[])

	const navigation = useNavigation();

	const navigate = screen => navigation.navigate(screen);
	
    return(

		<SafeAreaView style={styles.container}>

			<CustomHeader icon={'logout'} action={signOut} />
			
			<Avatar
				image={avatar}
				title={name}
				subtitle={whatsapp.formatted}
			/>	

			<View style={styles.column}>

				<NavItem
					action={() => navigate('StoreOrders')}
					icon='bike'
					title='Pedidos'
					subtitle='Lista de pedidos ativos'
				/>
				<NavItem
					action={() => navigate('StoreProducts')}
					icon='package-variant-closed'
					title='Produtos'
					subtitle='Lista de produtos'
				/>
				<NavItem
					action={() => navigate('StoreCategories')}
					icon='tag-outline'
					title='Categorias'
					subtitle='Categoria dos pedidos'
				/>	
				<NavItem
					action={() => navigate('StoreProfile')}
					icon='account-circle-outline'
					title='Perfil'
					subtitle='Informações da Loja'
				/>	
			</View>

		</SafeAreaView>

	)
	
}