import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const AppStack = createStackNavigator();

import Home from './pages/Home';
import StoreSignin from './pages/Store/Signin';
import StoreSignup from './pages/Store/Signup';
import StorePanel from './pages/Store/Panel';
import StoreProfile from './pages/Store/Profile';
import StoreProducts from './pages/Store/Products';
import StoreProductEdit from './pages/Store/Products/edit';
import StoreProductNew from './pages/Store/Products/new';


export default function Routes() {
    return (
        <NavigationContainer>
            <AppStack.Navigator screenOptions={{ headerShown: false }}>
                <AppStack.Screen name="Home" component={Home}/>   
                <AppStack.Screen name="StoreSignin" component={StoreSignin}/> 
                <AppStack.Screen name="StoreSignup" component={StoreSignup}/> 
                <AppStack.Screen name="StorePanel" component={StorePanel}/>
                <AppStack.Screen name="StoreProfile" component={StoreProfile}/>
                <AppStack.Screen name="StoreProducts" component={StoreProducts}/>
                <AppStack.Screen name="StoreProductEdit" component={StoreProductEdit}/>
                <AppStack.Screen name="StoreProductNew" component={StoreProductNew}/>
            </AppStack.Navigator>
        </NavigationContainer>
    )
}