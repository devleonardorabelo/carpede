import React, { useEffect } from 'react';
import { Text, Image, AsyncStorage, SafeAreaView, View } from 'react-native' ;
import { useNavigation } from '@react-navigation/native';
import boxImg from '../../assets/illustrations/box.png'
import api from '../../services/api';
import styles from '../global';
import { Button } from '../../components/Button'

export default function Home() {

	const navigation = useNavigation();

	function navigateToSignin() {
		navigation.navigate('Signin');
	}

	return (

		<SafeAreaView style={styles.container}>

			<View style={[styles.column,{ marginTop: 80 }]}>
				<Text style={[styles.title, { marginBottom: 10 }]}>Seja bem-vindo ao Carpede!</Text>
				<Text style={styles.grayTitle}>Proporcione aos seus clientes um atendimento personalizado</Text>
				<Image style={[styles.illustration, { marginTop: 50 }]} source={boxImg} />
				<Button title={'Quero criar a minha Loja'} action={navigateToSignin} />
			</View>
			
		</SafeAreaView>
	)
}
