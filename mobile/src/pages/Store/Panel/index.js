import React, { useState, useContext, useEffect } from 'react';
import AuthContext from '../../../contexts/auth';
import { SafeAreaView, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../../global';
import { API_DOMAIN } from '../../../constants/api';
import { NavItem, Avatar } from '../../../components/Item';
import { CustomHeader } from '../../../components/Header';

export default function Panel() {

	const { store, signOut } = useContext(AuthContext);

	const [ name, setName ] = useState('');
	const [ avatar, setAvatar ] = useState();
	const [ whatsapp, setWhatsapp ] = useState('');

	async function loadPanel() {
		setName(store.name);
		setWhatsapp(store.whatsapp);
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
				subtitle={whatsapp}
			/>	

			<View style={styles.column}>

				<NavItem
					action={() => navigate('StoreOrders')}
					icon='motorbike'
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
					icon='animation'
					title='Categorias'
					subtitle='Categoria dos pedidos'
				/>	
				<NavItem
					action={() => navigate('StoreProfile')}
					icon='account'
					title='Perfil'
					subtitle='Informações da Loja'
				/>	
			</View>

		</SafeAreaView>

	)
	
}