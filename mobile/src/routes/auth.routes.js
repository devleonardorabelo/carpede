import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Home from '../pages/Home';
import Signin from '../pages/Store/Signin';
import Signup from '../pages/Store/Signup';

const AuthStack = createStackNavigator();

const AuthRoutes = () => (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
        <AuthStack.Screen name='Home' component={Home} />
        <AuthStack.Screen name='Signin' component={Signin} />
        <AuthStack.Screen name='Signup' component={Signup} />
    </AuthStack.Navigator>
)
export default AuthRoutes;