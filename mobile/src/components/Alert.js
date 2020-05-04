import React from 'react';
import { View, Text } from 'react-native';
import styles from '../pages/global';
import { Feather } from '@expo/vector-icons'

export default function Alert(props) {
    
    return (
        <View style={[styles.alert, { display: props.alert ? 'flex' : 'none'}]}>
            <View style={{ flexDirection: 'row' }}>
                <Feather
                    name='alert-circle'
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