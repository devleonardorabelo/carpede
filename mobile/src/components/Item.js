import React from 'react';
import { TouchableOpacity, View, Text, Image, Animated } from 'react-native';
import styles from '../pages/global';
import { MaterialCommunityIcons as MI } from '@expo/vector-icons';
import { API_DOMAIN } from '../constants/api';
import { PanGestureHandler, State } from 'react-native-gesture-handler'

import cardImage from '../assets/illustrations/repeat_food.png';

function regexName(name) {
    if(name.length > 30) {
        let nameCut = name.match(/^[\s\S]{0,30}/) + '...'
        return nameCut;
    }
    return name;
}

export function NavItem(props) {
    return (
        <TouchableOpacity style={styles.action} onPress={props.action}>
            <View style={styles.iconAction}>
                <MI name={props.icon}  size={24} color="#333" />	
            </View>
            <View style={{flexGrow: 1, justifyContent: 'center'}}>
                <Text style={styles.textAction}>{props.title}</Text>
                <Text style={styles.subtitleTextAction}>{props.subtitle}</Text>
            </View>
            <View style={styles.arrowAction}>
                <MI name="chevron-right" size={24} color="#ff6e73" />	
            </View>
        </TouchableOpacity>
    )
}

export function Avatar(props) {
    return (
        <View style={[styles.store, { marginTop: 20 }]}>
            <TouchableOpacity onPress={props.action}>
                <Image
                    style={[styles.storeAvatar, { backgroundColor: '#FF5216' }]}
                    source={
                        props.image === undefined ?
                        cardImage
                    : 
                        props.image
                    }
                    resizeMode={'cover'}
                />
                { props.isChangeable ? 
                <View style={styles.boxFloatButton}>
                    <View
                    style={[styles.buttonFloat, { width: 48, height: 48, display: props.transparent ? 'none' : 'flex' }]}>
                        <MI
                            name={props.icon}
                            color='#fff'
                            size={32}
                        />
                    </View> 
                </View>
                : null
                }
                       
            </TouchableOpacity>
            
            <View style={{ flexGrow: 1, paddingLeft: 16}}>
                <View style={{ flexDirection: 'row'}}>
                    {props.title === '' || props.title === undefined ?
                        <View style={styles.titleHide} />
                    :
                        <Text style={[styles.title, styles.textWrap, {
                            marginBottom: 0,
                            fontSize: 30 - (props.title.length * 0.3)
                        }]}>{props.title}</Text>
                    }
                </View>
                    {props.subtitle === '' ? 
                        <View style={styles.textHide}/>
                    : 
                        <View style={{flexDirection: 'row'}}>
                            <MI name='whatsapp' color='#666' size={16} style={{ marginTop: 3, marginRight: 8}}/>
                            <Text style={styles.text}>{props.subtitle}</Text>
                        </View>
                    }
            </View>
        </View>
    )
}

export function Card(props) {

    return (
        <TouchableOpacity style={styles.box} onPress={props.action}>
            <Image
                style={styles.boxImage}
                source={ 
                    props.image === undefined || props.image === null ?
                        cardImage
                    : 
                        {uri: `${API_DOMAIN}/uploads/${props.image}`}
                }
                resizeMode='cover'
            />
            
            <View style={styles.boxBody}>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={[styles.textWrap, styles.textBold]}>{regexName(props.title)}</Text>
                </View>
                <Text style={styles.price}>
                    {Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                    }).format(props.price)}
                </Text>
            </View>

        </TouchableOpacity>
    )
}

export function CardOrder(props) {

    return (
        <TouchableOpacity style={styles.action} onPress={props.action}>
            <View style={{ flexGrow: 1 }}>
                <Text style={[styles.textBold, styles.textWrap]}>{regexName(props.title)}</Text>
                <Text style={[styles.text, styles.textWrap]}>{props.address}</Text>    
            </View>
            <View>
                <Text style={[styles.price, { marginTop: 0 }]}>
                    {Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                    }).format(props.price)}
                </Text>
                <Text style={[styles.text, { alignSelf: 'flex-end' }]}>{props.time}</Text>    
            </View>
            
        </TouchableOpacity>
    )
}

export function CardItem(props) {

    return (
        <View style={{ flexDirection: 'row', marginBottom: 8 }}>
            <Text style={styles.text}>{props.amount}x </Text>
            <Text style={[styles.textWrap, styles.text]}>{regexName(props.title)}</Text>
            <Text style={[styles.price, { marginTop: 0 }]}>
                {Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                }).format(props.price)}
            </Text>
        </View>
    )
}

export function Checkout(props) {

    let offset = 0;

    const translateY = new Animated.Value(0);

    const animatedEvent = Animated.event([
        {
            nativeEvent: {
                translationY: translateY
            }
        }
    ], { useNativeDriver: true })

    function onHandlerStateChanged(event) {
        if(event.nativeEvent.oldState === State.ACTIVE) {

            let opened = false;

            const { translationY } = event.nativeEvent;

            offset += translationY;

            if(translationY >= -80) {
                opened = true;
            } else {
                translateY.setValue(offset);
                translateY.setOffset(-430);
                offset = -430;
            }

            Animated.timing(translateY, {
                toValue: opened ? 430 : 0,
                duration: 300,
                useNativeDriver: true,
            }).start(() => {
                offset = opened ?  0 : -430;
                translateY.setOffset(offset);
                translateY.setValue(0);
            });

        }
    }

    return (
        <PanGestureHandler
            onGestureEvent={animatedEvent}
            onHandlerStateChange={onHandlerStateChanged}
        >
            <Animated.View
                style={[
                    styles.orderCheckout, {
                        transform: [{
                            translateY: translateY.interpolate({
                                inputRange: [-430, 0],
                                outputRange: [-430, 0],
                                extrapolate: 'clamp'
                            })
                        }
                        ]
                    }
                ]}
            >
                {props.children}
            </Animated.View>
        </PanGestureHandler>  
    )
}

export function Price(props) {
    return (
        <Text style={[styles.subtitle, props.style ]}>
            {Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL'
            }).format(props.value)}
        </Text> 
    )
}