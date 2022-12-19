import { React, useState } from 'react';
import { View, StyleSheet, Text, Image, Button } from 'react-native';
import moment from 'moment';
import { db } from '../hooks/firebase';
import useAuth from '../hooks/useAuth';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';

const Card = ({ post, navigation }) => {
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);

    const generateId = (id1, id2) => (id1 > id2 ? id1 + id2 : id2 + id1);

    const processRequest = async () => {
        if (loading) return;

        setLoading(true);

        setDoc(doc(db, 'notifs', generateId(user.uid, post.data().posteduser)), {
            users: {
                [user.uid]: {
                    posteduser: user.uid,
                    username: user.displayName,
                    email: user.email,
                    profPic: user.photoURL,
                },
                [post.data().posteduser]: post.data()
            },
            usermatched: [post.data().posteduser, user.uid],
            typerequest: post.data().type,
            fornotifs: post.data(),
            timestamp: serverTimestamp()
        });

        console.log("new doc added with id ");

        setLoading(false);

        alert("request sent!")
        navigation.navigate("MessagingScreen")
    }

    const formatDate = (date) => {
        if (date !== undefined && date !== null) {
            const format = "MM-DD-YYYY hh:mm A";
            const formatDate = date.toDate();
            return moment(formatDate).format(format)
        }
    }
    
    return (
        <View style={styles.rideCard}>
            <View>
                <View style={styles.cardHeader}>
                    <Image
                        source={{uri: post.data().profPic}} 
                        style={styles.profPic}
                    />
                    <Text>{post.data().username}</Text>
                </View>
            </View>
            <View>
                <Text>{post.data().type + ': ' + post.data().source + " to " + post.data().dest}</Text>
                <Text>{"Date and Time of Departure: " + formatDate(post.data().deptDateTime)}</Text>
                {post.data().type == "Offering"? <Text>{"Price: $" + post.data().rate}</Text> : <></>}
            </View>
            <Button 
                onPress={processRequest}
                title={post.data().type === 'Offering' ? "Request a Ride" : "Offer a ride"}
                style={styles.requestButton}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    rideCard: {
        margin: 10,
        padding: 10,
        backgroundColor: '#EFEFEF',
        borderRadius: 10
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10
    },
    profPic: {
        width: 45,
        height: 45,
        borderRadius: 100,
        marginRight: 15
    },
    requestButton: {
        color: 'black',
        backgroundColor: '#4E89E5'
    }
})

export default Card;