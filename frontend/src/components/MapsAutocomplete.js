import React from 'react';
import { ScrollView, StyleSheet, TextInput, View } from 'react-native';
import { GoogleAutoComplete } from 'react-native-google-autocomplete';
import LocationItem from './LocationItem';

const GOOGLE_API_KEY = 'AIzaSyBTLiZAzozn_0oJO8EfsUXAOZ_6XaMSoSE';

const MapsAutocomplete = ({ placeholder, setSearch, setShowModal }) => {
    return (
        <GoogleAutoComplete apiKey={GOOGLE_API_KEY} debounce={500} queryTypes={["(cities)"]}>
            {(({ handleTextChange, locationResults, clearSearch }) => (
                <React.Fragment>
                    <View>
                        <TextInput
                            style={styles.textInput}
                            placeholder={placeholder}
                            onChangeText={handleTextChange}
                        />
                    </View>
                    <ScrollView>
                        {locationResults.map(el => {
                            return (
                                <LocationItem
                                    {...el}
                                    key={el.place_id}
                                    setSearch={setSearch}
                                    clearSearch={clearSearch}
                                    setShowModal={setShowModal}
                                />
                            )
                        })}
                    </ScrollView>
                </React.Fragment>
            ))}
        </GoogleAutoComplete>
    )
}

const styles = StyleSheet.create({
    textInput: {
        height: 40,
        width: 300,
        borderWidth: 1,
        paddingHorizontal: 10
    }
})

export default MapsAutocomplete;