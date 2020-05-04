import React, { useEffect, useState } from 'react';
import { TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import { Feather } from '@expo/vector-icons';
import styles from "../pages/global";

export function Button(props) {

    const [ color, setColor ] = useState('#FF5216');
    const [ content, setContent ] = useState(<Text style={styles.buttonWhiteText}>{props.title}</Text>);
    const [ disabled, setDisabled ] = useState(false);

    useEffect(() => {
        if(!props.status) {
            setColor('#FF5216');
            setContent(<Text style={styles.buttonWhiteText}>{props.title}</Text>);
            setDisabled(false);
        }
        if(props.status === 'loading') {
            setColor('#CB390F');
            setContent(<ActivityIndicator size="large" color="#fff" />)
            setDisabled(true);
        }
        if(props.status === 'done') {
            setColor('#34E098');
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