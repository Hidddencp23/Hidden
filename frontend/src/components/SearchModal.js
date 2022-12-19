import React from 'react';
import { Modal, View, StyleSheet, Text, Pressable } from 'react-native';
import MapsAutocomplete from '../components/MapsAutocomplete';
import { Feather } from '@expo/vector-icons'; 

const SearchModal = ({ showModal, setShowModal, placeholder, setSearch }) => {
    return (
        <View style={styles.centeredView}>
            <Modal
                visible={showModal}
                onRequestClose={() => {
                    setShowModal(!showModal);
                }}
                transparent={true}
            >
                <View style={styles.modalView}>
                    <View style={styles.modalHeader}>
                        <Text>{`Search ${placeholder}`}</Text>
                        <Pressable
                            onPress={() => setShowModal(!showModal)}
                        >
                            <Feather name="x-circle" size={24} color="black" />
                        </Pressable>
                    </View>
                    <MapsAutocomplete
                        placeholder={placeholder}
                        setSearch={setSearch}
                        setShowModal={setShowModal}
                    />
                </View>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        marginTop: 60,
        marginHorizontal: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        minHeight: 300
    },
    modalHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 20
    }
})

export default SearchModal;