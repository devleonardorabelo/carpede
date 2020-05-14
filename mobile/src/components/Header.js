import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons as MI } from '@expo/vector-icons';
import styles from '../pages/global';

export function Header(props) {

    const navigation = useNavigation();

    function navigateToBack() {
        navigation.goBack();
    }

    return(
        <View style={styles.header}>
            <View>
                <TouchableOpacity
                    onPress={navigateToBack}
                >
                    <MI name="arrow-left" size={32} color="#ff6e73" />
                </TouchableOpacity>
            </View>
            {props.title ?
                <Text style={[styles.textBold,{ textTransform: 'uppercase' }]}>{props.title}</Text>
            :null
            }
            {props.children ?
                <View>{props.children}</View>
                :
                <View style={{marginLeft: 32}}/>
            }
        </View>
          
    )
}

export function CustomHeader(props) {
    return(
        <View style={styles.header}>
            <View>
                <TouchableOpacity
                    onPress={props.action}
                >
                    <MI name={props.icon} size={32} color="#ff6e73" />
                </TouchableOpacity>
            </View>
            <View>
                {props.children}
            </View>
        </View>
    )
}

export function TransparentHeader(props) {

    const navigation = useNavigation();

    function navigateToBack() {
        navigation.goBack();
    }

    return(
        <View style={[styles.boxFluid, {
            position: 'absolute',
            zIndex: 999,
            top: 0,
            flexDirection: 'row',
            justifyContent: 'space-between'
        }]}>
            <View>
                <TouchableOpacity
                    onPress={navigateToBack}
                >
                    <MI name="arrow-left" size={32} color="#ff6e73" />
                </TouchableOpacity>      
            </View>
            <View style={{
                flexDirection: 'row'
            }}>
                {props.children}
            </View>
        </View>
    )
}