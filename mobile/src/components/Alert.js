import React from 'react';
import { View, Text } from 'react-native';
import styles from '../pages/global';

export default function Alert(props) {
    return (
        <View style={[styles.alert, { zIndex: props.show ? 999 : -999, backgroundColor: props.error ? '#FF3A4F' : '#6FCF97'}]}>
            <Text style={styles.alertText}>{props.alert}</Text>
        </View>
    )
}