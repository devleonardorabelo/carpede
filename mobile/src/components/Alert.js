import React from 'react';
import { View, Text } from 'react-native';
import styles from '../pages/global';
import { MaterialCommunityIcons as MI } from '@expo/vector-icons'

export default function Alert(props) {
    
    return (
        <View style={[styles.alert, { display: props.alert ? 'flex' : 'none'}]}>
            <View style={{ flexDirection: 'row' }}>
                <MI
                    name='alert-box'
                    color='#FF0000'
                    size={16}
                    style={{ marginTop: 3, marginRight: 5 }}
                    />
                <Text style={styles.alertTitle}>
                    {props.alert.title}
                </Text>    
            </View>
            
            <Text style={styles.alertText}>{props.alert.text}</Text>
        </View>
    )
}