import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import { Feather } from '@expo/vector-icons';
import styles from "../pages/global";

export function Button(props) {
    return(
        <TouchableOpacity
            activeOpacity={0.8}
            style={[styles.buttonGreen, { backgroundColor: props.done ? '#B10000' : '#FF5216' }]}
            onPress={props.action}
            disabled={props.done}
        >
            {props.done ?
                <ActivityIndicator size="large" color="#fff" />
            : (
                <Text style={styles.buttonWhiteText}>{props.title}</Text>
            )}
        </TouchableOpacity>
    )
}

export function ButtonTransparent(props) {
    return(
        <TouchableOpacity style={styles.buttonTransparent} onPress={props.action}>
            <Feather
                style={{ paddingRight: 5 }}
                name={props.icon} 
                size={16}
                color='#585858'
            />
            <Text style={styles.buttonBlackText}>{props.title}</Text>
        </TouchableOpacity>
    )
}