import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native' ;
import { useNavigation } from '@react-navigation/native';
import boxImg from '../../assets/illustrations/box.png'

import styles from '../global';

import * as Font from 'expo-font';
import { AppLoading } from 'expo';

const fetchFonts = () => {
  return Font.loadAsync({
  'paytone': require('../../assets/fonts/paytone.ttf'),
  'roboto': require('../../assets/fonts/roboto.ttf'),
  'roboto-bold': require('../../assets/fonts/roboto-bold.ttf'),
  'roboto-light': require('../../assets/fonts/roboto-light.ttf'),
  });
};

export default function Home() {

	const navigation = useNavigation();
	const [dataLoaded, setDataLoaded] = useState(false);

	if(!dataLoaded) {
		return (
			<AppLoading startAsync={fetchFonts} onFinish={() => setDataLoaded(true)} />
		)
	}

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
