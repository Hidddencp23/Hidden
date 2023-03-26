import React, { useEffect, useState } from "react";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import { View } from "react-native";
import * as Location from "expo-location";

const HomeMap = ({ hiddenLocations }) => {
  const [userLocation, setUserLocation] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [position, setPosition] = useState({
    latitude: 10,
    longitude: 10,
    latitudeDelta: 0.001,
    longitudeDelta: 0.001,
  });
  const mapView = React.createRef();

  const animateMap = (coords) => {
    mapView.current.animateToRegion({ // Takes a region object as parameter
        latitude: coords.latitude,
        longitude: coords.longitude,
        latitudeDelta: 0.0421,
        longitudeDelta: 0.0421,
    },1000);
}

  useEffect(() => {
    (
      async () => { // function to request for location from user
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          setErrorMsg("Permission to access location was denied");
          return;
        }

        let location = await Location.getCurrentPositionAsync({});
        setUserLocation(location);
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
    <MapView
      provider={PROVIDER_GOOGLE}
      style={{ flex: 1 }}
      ref={mapView}
      region={position}
      showsUserLocation={true}
      followsUserLocation={true}
     
    >
      {hiddenLocations.map((location, index) => (
        <Marker
          key={index}
          coordinate={location.coordinates}
          title={location.name}
          description={location.description}

          onPress={() => animateMap({
            latitude: location.coordinates.latitude,
            longitude: location.coordinates.longitude
          })}
        />
      ))}
    </MapView>
  );
};

export default HomeMap;
