import { React, useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import NumericInput from 'react-native-numeric-input';
import BottomNavBar from '../components/BottomNavBar';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import SearchModal from '../components/SearchModal';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../hooks/firebase';
import useAuth from '../hooks/useAuth';

const PostRiderScreen = ({ navigation }) => {
    const { user } = useAuth();
    const [showSourceModal, setShowSourceModal] = useState(false);
    const [showDestModal, setShowDestModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [passengers, setPassengers] = useState(0);
    const [time, setTime] = useState(new Date());
    const [date, setDate] = useState(new Date());
    const [source, setSource] = useState("");
    const [dest, setDest] = useState("");

    const getDateTime = () => {
        return new Date(date.getFullYear(), date.getMonth(), date.getDate(), time.getHours(), time.getMinutes(), time.getSeconds());
    }
    //TODO: Implement backend to post
    const onPressSubmit = async () => {
        if (loading) return;

        setLoading(true);

        const docRef = await addDoc(collection(db, "posts"), {
            posteduser: user.uid,
            username: user.displayName,
            email: user.email,
            profPic: user.photoURL,
            type: "Seeking",
            deptDateTime: getDateTime(),
            seats: passengers,
            source: source,
            dest: dest,
            timeStamp: serverTimestamp()
        })
        .then(() => {
            console.log("new doc added with id ", docRef.id);
            setLoading(false);
            navigation.navigate("HomeScreen")
        })
        .catch((error) => {
            alert(error.message)
        })

    }

    return (
        <View style={styles.driverScreen}>
            <View style={styles.driverForm}>
                <Text style={styles.driverHeader}>Post seeking as a rider</Text>
                <Text>Source</Text>
                <TextInput
                    style={styles.driverTextInput}
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
                <Text>Destination</Text>
                <TextInput
                    style={styles.driverTextInput}
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
                <Text style={styles.formText}>Passengers</Text>
                <View style={styles.numericInput}>
                    <NumericInput minValue={0} onChange={value => setPassengers(value)} />
                </View>
                <Text style={styles.formText}>Date</Text>
                <RNDateTimePicker style={{ marginBottom: 20 }} mode="date" value={date} minimumDate={new Date()} onChange={(e, d) => setDate(d)} />
                <TouchableOpacity style={styles.submitButton} value={time} onPress={onPressSubmit} onChange={(e, d) => setTime(d)} >
                    <Text style={styles.submitButtonText}>Post</Text>
                </TouchableOpacity>
            </View>
            <BottomNavBar navigation={navigation} onChange={value => setPassengers(value)} />
        </View>
    )
}

const styles = StyleSheet.create({
    driverScreen: {
        backgroundColor: 'white',
        paddingBottom: 75,
        height: '100%'
    },
    driverForm: {
        padding: 20
    },
    driverTextInput: {
        borderColor: 'black',
        borderWidth: 1,
        padding: 5,
        backgroundColor: 'white',
        fontSize: 18,
        marginBottom: 10
    },
    dateTime: {
        flexDirection: 'row'
    },
    driverHeader: {
        fontSize: 20,
        marginBottom: 10
    },
    formText: {
        fontSize: 18,
        marginTop: 20,
        marginBottom: 10
    },
    numericInput: {
        flexDirection: "row",
        justifyContent: "flex-end"
    },
    submitButton: {
        backgroundColor: '#4E89E5',
        padding: 10,
        marginTop: 100
    },
    submitButtonText: {
        fontSize: 18,
        textAlign: 'center'
    }
})

export default PostRiderScreen;