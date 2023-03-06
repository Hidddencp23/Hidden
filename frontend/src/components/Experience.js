import React, { useEffect, useState, useRef } from 'react';
import { SafeAreaView, View, Text, StyleSheet, FlatList, TouchableWithoutFeedback, TouchableOpacity, ScrollView } from 'react-native';
import { db } from '../hooks/firebase';


const Experience = ({ experience }) => {
    console.log("experience")

    console.log(experience)


    return (
        <SafeAreaView>
            <Text>{experience.userName}</Text>
            <Text>{experience.description}</Text>
            <Text>{experience.rating}</Text>
            <ScrollView>
                
            </ScrollView>
        </SafeAreaView>
    )
}


export default Experience;