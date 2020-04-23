import 'intl'
import 'intl/locale-data/jsonp/pt-BR'

import React from 'react';
import Routes from './src/routes';
import * as firebase from 'firebase';
import ApiKeys from './src/contants/ApiKeys';

export default function App() {

  if(!firebase.apps.length) {
    firebase.initializeApp(ApiKeys.FirebaseConfig)
    console.log('iniciado')
  }

  return (
    <Routes />
  );
}
