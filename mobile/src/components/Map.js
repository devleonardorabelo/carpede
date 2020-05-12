import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native'
import MapView, { Marker } from 'react-native-maps';
import styles from '../pages/global';

export function LocationMap(props) {

    const [ currentRegion, setCurrentRegion ] = useState(null);
    const [ latitude, setLatitude ] = useState(props.latitude);
    const [ longitude, setLongitude ] = useState(props.longitude);

    useEffect(() => {

        async function loadInititalPosition() {

            setCurrentRegion({
                latitude,
                longitude,
                latitudeDelta: 0.04,
                longitudeDelta: 0.04,
            })
            
        }
        loadInititalPosition();
    }, [])

    return(
        <MapView style={styles.map} initialRegion={currentRegion}>
            <Marker coordinate={{latitude, longitude}}>
                <View style={styles.mapMark} />
            </Marker>
        </MapView>
    )
}