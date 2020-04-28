import React from 'react';
import { TouchableOpacity, View, Text, Image } from 'react-native';
import styles from '../pages/global';
import { Feather } from '@expo/vector-icons';

export function NavItem(props) {
    return (
        <TouchableOpacity style={styles.action} onPress={props.action}>
            <View style={styles.iconAction}>
                <Feather name={props.icon}  size={24} color="#333" />	
            </View>
            <View style={{flexGrow: 1, justifyContent: 'center'}}>
                <Text style={styles.textAction}>{props.title}</Text>
                <Text style={styles.subtitleTextAction}>{props.subtitle}</Text>
            </View>
            <View style={styles.arrowAction}>
                <Feather name="chevron-right" size={24} color="#333" />	
            </View>
        </TouchableOpacity>
    )
}

export function Avatar(props) {
    return (
        <View style={[styles.store, { marginTop: 20 }]}>
            <Image
                style={styles.storeAvatar}
                source={props.source}
                resizeMode={'cover'}
            />
            <View style={{ flexGrow: 1, paddingLeft: 16}}>
                <View style={{ flexDirection: 'row'}}>
                    <Text style={[styles.title, styles.textWrap, { marginBottom: 0 }]}>{props.title}</Text>
                </View>	
                <Image source={props.image}/>
            </View>
        </View>
    )
}