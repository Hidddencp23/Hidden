import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const LocationItem = (props) => {
    return (
        <TouchableOpacity style={styles.root} onPress={() => {
                props.setSearch(props.description);
                props.clearSearch();
                props.setShowModal(false);
            }}
        >
            <Text style={styles.text}>{props.description}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    root: {
        height: 40,
        borderBottomWidth: StyleSheet.hairlineWidth,
        justifyContent: 'center'
    },
    text: {
        fontSize: 14
    }
})

export default LocationItem;