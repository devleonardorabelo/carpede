import axios from 'axios';
import { AsyncStorage } from 'react-native';
import { API_DOMAIN } from '../constants/api';

const storeToken = async () => await AsyncStorage.getItem('@Carpede:storeToken');

const apiReq = axios.create({
    baseURL: API_DOMAIN,
    headers: { 'Authorization': `Bearer ${storeToken}` }
});

export default apiReq;