import React, { createContext, useState, useEffect } from 'react';
import { AsyncStorage } from 'react-native';
import apiReq from '../services/reqToken';

const AuthContext = createContext({ signed: false });

export const AuthProvider = ({ children }) => {

    const [ store, setStore ] = useState(null);

    useEffect(() => {
        async function checkSigned() {
            const current = await AsyncStorage.getItem('@Carpede:store');

            if(current) setStore(JSON.parse(current))

            return;

        }
        checkSigned();
    },[])

    async function sign(store) {
        const { avatar, name, whatsapp, email, token } = store;

        setStore({
            avatar,
            name,
            whatsapp,
            email,
            token
        })

        await AsyncStorage.setItem('@Carpede:store', JSON.stringify(store));
    }

    async function signOut() {
        setStore(null);
        await AsyncStorage.clear();
    }
    
    return (
        <AuthContext.Provider value={{ signed: !!store , store, sign, signOut}}>
            {children}
        </AuthContext.Provider>
    )
}
export default AuthContext;