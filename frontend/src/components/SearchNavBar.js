import { StyleSheet, Text, View, Image, Dimensions} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from "react-native-vector-icons/AntDesign";
import { SearchBar } from 'react-native-elements';
import TopNavBar from './NavBars/TopNavBar';
import React, { useEffect, useState } from "react";

const SearchNavBar = ({ navigation }) => {
    const [search, setSearch] = useState('');

    return (
        <>
            <TopNavBar></TopNavBar>
            <View style={styles.searchPosition}>
                <SearchBar
                    lightTheme
                    round
                    containerStyle={styles.searchContainer}
                    inputContainerStyle={styles.searchInput}
                    placeholder="Search"
                    onChangeText={setSearch}
                    value={search}></SearchBar>
            </View>
        </>
        
    )
}

const styles = StyleSheet.create({
    header: {
        height: 100,
        paddingRight: "10%",
        paddingBottom: "3%",
        paddingTop: "13%",
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#83C3FF',
        overflow: 'hidden',
    },
    headerImage: {
        height: 100,
        width: 100,
    },
    addButton: {
        backgroundColor: "white",
        height: "100%",
        width: "200%",
        borderRadius: 7,
        justifyContent: 'center',
        alignItems: "center"
      },   
    
    circle: {
        position:'absolute',
        borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 4,
        width: Dimensions.get('window').width * 2,
        height: Dimensions.get('window').width * 2,
        top: -1 * (Dimensions.get('window').height * .88),
        left: -1 * (Dimensions.get('window').width * .5),
        backgroundColor:'#83C3FF',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 90,
    },
    searchPosition:{
        paddingTop: '26%',
        paddingLeft: '4%',
        paddingRight:'15%',
        flex: 1,    
        position: "absolute",
        width: "100%",
        height: "100%",
},
searchContainer: {
    height: 48,
    backgroundColor: 'white',
    borderColor: 'white',
    borderRadius: 15,
    flexDirection: 'row',
    marginBottom: '5%',
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowRadius: 6,
    shadowOffset : { width: 1, height: 8},
},

searchAlign: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center",
    height: "30%",

},
searchInput: {
    backgroundColor: 'transparent',
    height: 45,
    marginTop: -7.5
},

});

export default SearchNavBar;