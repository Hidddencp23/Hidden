import { React } from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import moment from 'moment';

const Card = ({ post }) => {

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