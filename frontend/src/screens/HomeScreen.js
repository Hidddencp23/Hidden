import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import BottomNavBar from '../components/BottomNavBar';
import Card from '../components/Card';
import { db } from '../hooks/firebase';
import SearchModal from '../components/SearchModal';
import distance from '../hooks/distance';


const HomeScreen = ({ navigation }) => {
    const [originalData, setOriginalData] = React.useState([]);
    const [data, setData] = React.useState([]);
    const [showSourceModal, setShowSourceModal] = React.useState(false);
    const [source, setSource] = React.useState("");
    const [showDestModal, setShowDestModal] = React.useState(false);
    const [dest, setDest] = React.useState("");
    const [distanceSearch, posts, setPosts] = distance();
    const [done, setDone] = React.useState(false);
    const [searchData, setSearchData] = React.useState([]);

    const options = ["All", "Offering", "Seeking"];

    const onPressSortBy = (e) => {
        if (e === 'All') {
            setData(searchData);
        } else if (e === 'Offering') {
            const offering = searchData.filter(d => {
                return d.data().type === 'Offering'
            })
            setData(offering)
        } else if (e === 'Seeking') {
            const seeking = searchData.filter(d => {
                return d.data().type === 'Seeking'
            })
            setData(seeking);
        }
    }

    React.useEffect(() => {
        if (done) {
            setData(posts);
            setSearchData(posts);
        }
    }, [posts, done])

    const onPressSearch = () => {
        const postsSameSource = originalData.filter(d => {
            return d.data().source.toLowerCase().includes(source.toLowerCase());
        })
        postsSameSource.forEach(post => {
            distanceSearch(dest, post.data().dest, post);
        })
        setDone(true)
    }

    useEffect(
        () =>
            onSnapshot(
                query(collection(db, "posts"), orderBy("timeStamp")),
                (snapshot) => {
                    setOriginalData(snapshot.docs);
                    setData(snapshot.docs);
                    setSearchData(snapshot.docs)
                }
            )
    , [])

    const onPressClearSearches = () => {
        setDone(false)
        setData(originalData)
        setSearchData(originalData)
        setSource("")
        setDest("")
        setPosts([])
    }

    return (
        <View style={styles.homeScreen}>
            <FlatList
                ListHeaderComponent={
                    <View>
                        <View style={styles.sortBy}>
                            <Text style={styles.sortByTitle}>Sort by: </Text>
                            <SelectDropdown
                                data={options}
                                onSelect={e => onPressSortBy(e)}
                                buttonTextStyle={styles.rowTextStyle}
                                dropdownStyle={styles.rowTextStyle}
                                buttonStyle={styles.buttonStyle}
                            />
                        </View>
                        <TouchableOpacity style={styles.clearSearches} onPress={onPressClearSearches} >
                            <Text style={styles.clearButtonText}>Clear Searches</Text>
                        </TouchableOpacity>
                        <Text style={styles.inputTitle}>Source</Text>
                        <TextInput
                            style={styles.input}
                            onPressIn={() => setShowSourceModal(true)}
                            value={source}
                        />
                        <SearchModal
                            placeholder={"Source"}
                            showModal={showSourceModal}
                            setShowModal={setShowSourceModal}
                            setSearch={setSource}
                            search={source}
                        />
                        <Text style={styles.inputTitle}>Destination</Text>
                        <TextInput
                            style={styles.input}
                            value={dest}
                            onPressIn={() => setShowDestModal(true)}
                        />
                        <SearchModal
                            placeholder={"Destination"}
                            showModal={showDestModal}
                            setShowModal={setShowDestModal}
                            setSearch={setDest}
                            search={dest}
                        />
                        <TouchableOpacity style={styles.searchButton} onPress={onPressSearch} >
                            <Text style={styles.searchButtonText}>Search</Text>
                        </TouchableOpacity>
                    </View>
                }
                keyExtractor={(item, index) => index}
                data={data}
                renderItem={({ index, item }) => {
                    return (
                        <Card post={item} navigation={navigation} />
                    )
                }}
            />
            <BottomNavBar navigation={navigation} />
        </View>
    )
}

const styles = StyleSheet.create({
    homeScreen: {
        backgroundColor: 'white',
        paddingBottom: 75,
        height: '100%'
    },
    sortBy: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        paddingBottom: 0
    },
    sortByTitle: {
        fontSize: 18
    },
    buttonStyle: {
        backgroundColor: 'white',
        borderWidth: 1,
        height: 25
    },
    rowTextStyle: {
        fontSize: 18
    },
    input: {
        borderColor: 'black',
        borderWidth: 1,
        padding: 5,
        backgroundColor: 'white',
        fontSize: 18,
        marginHorizontal: 10
    },
    inputTitle: {
        marginLeft: 10
    },
    searchButton: {
        backgroundColor: '#0984e3',
        margin: 10,
        padding: 10,
        borderRadius: 10,
        marginHorizontal: 60
    },
    searchButtonText: {
        fontSize: 16,
        color: 'white',
        textAlign: 'center'
    },
    clearSearches: {
        backgroundColor: '#0000',
        padding: 5,
        marginLeft: 10,
        marginRight: 200,
        marginTop: 10,
        borderColor: 'black',
        borderWidth: 1
    },
    clearButtonText: {
        fontSize: 15,
        color: 'black',
        textAlign: 'center'
    }
});

export default HomeScreen;