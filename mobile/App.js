import React, { useState } from 'react';
import Routes from './src/routes';

import 'intl'
import 'intl/locale-data/jsonp/pt-BR'
import * as Font from 'expo-font';
import { AppLoading } from 'expo';

export default function App() {

  const [dataLoaded, setDataLoaded] = useState(false);

  const fetchFonts = () => {
    return Font.loadAsync({
    'montserrat-bold': require('./src/assets/fonts/MontserratBold.ttf'),
    'montserrat-semi-bold': require('./src/assets/fonts/MontserratSemiBold.ttf'),
    'montserrat-light': require('./src/assets/fonts/MontserratLight.ttf'),
    'montserrat-medium': require('./src/assets/fonts/MontserratMedium.ttf'),
    });
  };

  if(!dataLoaded) {
		return (
			<AppLoading startAsync={fetchFonts} onFinish={() => setDataLoaded(true)} />
		)
  }
  
  return (
    <Routes />
  );
}
