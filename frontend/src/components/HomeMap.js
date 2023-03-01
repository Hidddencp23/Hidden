import React, { useEffect, useState } from 'react';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { View } from 'react-native';
import * as Location from 'expo-location';


const HomeMap = () => {
    const [location, setLocation] = useState(null);

    const [position, setPosition] = useState({
        latitude: 10,
        longitude: 10,
        latitudeDelta: 0.001,
        longitudeDelta: 0.001,
    });

    //   useEffect(() => {
    //     Geolocation.getCurrentPosition((pos) => {
    //       const crd = pos.coords;
    //       setPosition({
    //         latitude: crd.latitude,
    //         longitude: crd.longitude,
    //         latitudeDelta: 0.0421,
    //         longitudeDelta: 0.0421,
    //       });
    //     }).catch((err) => {
    //       console.log(err);
    //     });
    //   }, []);

    useEffect(() => {
        (async () => {

            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
            setPosition({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.0421,
                longitudeDelta: 0.0421,
            });
            console.log(location);
        })();
    }, []);


    return (
        <MapView provider={PROVIDER_GOOGLE}
            style={{ flex: 1 }}
            region={position}
            showsUserLocation={true}
            followsUserLocation={true} />
    )
};


export default HomeMap;