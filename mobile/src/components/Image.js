import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons as MI } from '@expo/vector-icons';
import styles from '../global';

import defaultImage from '../assets/illustrations/repeat_food.png';

export function PreviewImage(props) {
    
    return (
        <View style={{ justifyContent: 'flex-end', marginBottom: 16 }}>
            {props.image ?
                <Image
                    source={props.image}
                    style={styles.fullImage}
                    resizeMode='cover'
                />
            : 
                <View style={{ height: 100 }}/>
            }
            
            <View style={styles.groupFloatButton}>

                <TouchableOpacity
                    style={[styles.buttonFloat, { marginRight: 16 }]}
                    onPress={props.action1}
                >
                    <MI
                        name={props.icon1}
                        color='#FFFFFF'
                        size={32}
                    />
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.buttonFloat}
                    onPress={props.action2}
                >
                    <MI
                        name={props.icon2}
                        color='#FFFFFF'
                        size={32}
                    />
                </TouchableOpacity>   

            </View>  
        </View>
    )
}