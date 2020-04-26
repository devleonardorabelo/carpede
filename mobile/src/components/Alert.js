import React from 'react';
import { View, Text } from 'react-native';
import styles from '../pages/global';

export default function Alert(props) {
    return (
        <View style={[styles.alertError, { zIndex: props.show ? 999 : -999 }]}>
            <Text style={styles.alertText}>{props.alert}</Text>
        </View>
    )
}