import React, { useEffect, useState } from "react";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import { View } from "react-native";
import * as Location from "expo-location";

const HomeMap = () => {
  const [location, setLocation] = useState(null);
  const [markers, setMarkers] = useState([]);

  exMarkers = [{
    latlng: {
        latitude: 33.672939,
        longitude: -117.962395
    },
    title: "Example",
    description: "test desc"
  }]


  const [position, setPosition] = useState({
    latitude: 10,
    longitude: 10,
    latitudeDelta: 0.001,
    longitudeDelta: 0.001,
  });

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
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
    <MapView
      provider={PROVIDER_GOOGLE}
      style={{ flex: 1 }}
      region={position}
      showsUserLocation={true}
      followsUserLocation={true}
    >
      {exMarkers.map((marker, index) => (
        <Marker
          key={index}
          coordinate={marker.latlng}
          title={marker.title}
          description={marker.description}
          onPress={() => console.log(marker.title)}
        />
      ))}
    </MapView>
  );
};

export default HomeMap;
