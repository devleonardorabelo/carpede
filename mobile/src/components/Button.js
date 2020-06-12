import React, { useEffect, useState } from 'react';
import { TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import { MaterialCommunityIcons as MI } from '@expo/vector-icons';
import styles from "../pages/global";


export function Button(props) {

    const [ color, setColor ] = useState('#639DFF');
    const [ content, setContent ] = useState(<Text style={styles.buttonWhiteText}>{props.title}</Text>);
    const [ disabled, setDisabled ] = useState(false);

    useEffect(() => {
        if(!props.status) {
            setColor('#639DFF');
            setContent(<Text style={styles.buttonWhiteText}>{props.title}</Text>);
            setDisabled(false);
        }
        if(props.status === 'loading') {
            setColor('#E2E2E2');
            setContent(<ActivityIndicator size="large" color="#266EE8" />)
            setDisabled(true);
        }
        if(props.status === 'done') {
            setColor('#266EE8');
            setContent(<Text style={styles.buttonWhiteText}>Feito!</Text>)
            setDisabled(false);
        }
    }, [props])

    return(
        <TouchableOpacity
            activeOpacity={0.8}
            style={[styles.button, { backgroundColor: color }]}
            onPress={props.action}
            disabled={disabled}
        >
            {content}
        </TouchableOpacity>
    )
}

export function ButtonTransparent(props) {
    return(
        <TouchableOpacity
            style={styles.buttonTransparent}
            onPress={props.action}
        >
            
            <MI
                style={{ paddingRight: 8 }}
                name={props.icon} 
                size={16}
                color='#333333'
            />
            <Text style={styles.buttonBlackText}>
                {props.title}
            </Text>

        </TouchableOpacity>
    )
}

export function ActionButton(props) {
    return (
        <TouchableOpacity
            style={[
                styles.actionButton,
                props.style,
                props.title ? { backgroundColor: null } : null
            ]}
            onPress={props.action}
        >
            <MI
                name={props.icon}
                size={32}
                color={ props.title ? '#85B71B' : '#FFFFFF' }
            />
            {props.title ?
                <Text style={[styles.text, { color: '#85B71B' }]}>{props.title}</Text>
                :null    
            }
        </TouchableOpacity>
    )
}

export function LinearButton(props) {
    return (
        <TouchableOpacity onPress={props.action}>
            <MI
                name={props.icon}
                size={32}
                color='#333333'
            />
        </TouchableOpacity>
    )
}