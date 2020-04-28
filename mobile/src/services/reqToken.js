import axios from 'axios';
import { API_DOMAIN } from '../constants/api';
import { AsyncStorage } from 'react-native';

const apiReq = axios.create({
    baseURL: API_DOMAIN,
    timeout: 10000,
    headers: {
    'Content-type': 'application/json',
    },
});

apiReq.interceptors.request.use(
    
  async function(config) {
      
    const preToken = await AsyncStorage.getItem('@Carpede:storeToken');
    const token = `Bearer ${preToken}`
    config.headers.authorization = token;
    return config;

  },
  function(err) {
    return Promise.reject(err);
  }
);

export default apiReq;