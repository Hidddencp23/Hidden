import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const LocationItem = ({navigation, location}) => {
    return (
        <TouchableOpacity 
            style={styles.locationItem} 
            onPress={() =>
                navigation.navigate("LocationScreen", {
                    location
                })
        }>
            <View style={{
                height: 100,
            }}>
                <Text>{location.name}</Text>
                <Text>{location.description}</Text>
                <Text>{location.address}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    locationItem: {
        backgroundColor: "#FFFFFF",
        marginTop: "5%",
        marginLeft: "2.5%",
        marginRight: "2.5%",
        height: 90,
        borderRadius: 20,
      }
})

export default LocationItem;