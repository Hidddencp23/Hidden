import React from 'react';
import googleDistance from '../api/googleDistance';

const GOOGLE_API_KEY = "AIzaSyBTLiZAzozn_0oJO8EfsUXAOZ_6XaMSoSE";

export default () => {
    const [posts, setPosts] = React.useState([]);

    const distanceSearch = async(orgDest, newDest, post) => {
        try {
            const response = await googleDistance.get('', {
                params: {
                    origin: orgDest,
                    destination: newDest,
                    key: GOOGLE_API_KEY
                }
            })
            const miles = response.data?.routes[0]?.legs[0]?.distance?.text;
            const numMiles = parseInt(miles.split(' ')[0]);
            if (numMiles <= 50) setPosts([post].concat(posts));
        } catch (error) {
            console.log(error);
        }
    }

    return [distanceSearch, posts, setPosts]
}