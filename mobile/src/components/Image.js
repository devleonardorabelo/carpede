import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import styles from '../pages/global';
import { API_DOMAIN } from '../constants/api';
import defaultImage from '../assets/illustrations/repeat_food.png';

export function PreviewImage(props) {
    
    return (
        <View style={{ justifyContent: 'flex-end', marginBottom: 20 }}>
            <Image
                source={ 
                    props.image !== undefined ?
                        props.image
                    : 
                        defaultImage
                }
                style={styles.fullImage}
                resizeMode='cover'
            />
            <View style={styles.groupFloatButton}>

                <TouchableOpacity
                style={[styles.buttonFloat, { marginRight: 16 }]}
                onPress={props.action1}>
                    <Feather
                        name={props.icon1}
                        color='#fff'
                        size={32}
                    />
                </TouchableOpacity>

                <TouchableOpacity
                style={styles.buttonFloat}
                onPress={props.action2}>
                    <Feather
                        name={props.icon2}
                        color='#fff'
                        size={32}
                    />
                </TouchableOpacity>   

            </View>  
        </View>
    )
}