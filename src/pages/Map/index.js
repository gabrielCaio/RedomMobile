import React, { useState, useEffect, useContext } from 'react'
import { View, StyleSheet, ActivityIndicator } from 'react-native'

import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import mapStyle from '../../utils/MapStyle'
import markerImage from '../../assets/marker.png'

import { UserContext } from '../../contexts/userContext'

import api from '../../api'

export default () => {
    // Array of markers to show on map
    const [listMarkers, setListMarkers] = useState([]);

    // This is to tell when the map is ready to show
    const [ready, setReady] = useState(false);

    // Declaration of context vars
    const { state } = useContext(UserContext)

    // Setting navigations as useNavigation
    const navigation = useNavigation();

    // This is called when the component mount
    // It calls the getMarkers function to get places from api
    // when the markers are setted in array, it sets ready to true to show the map
    useEffect(() => {
        getMarkers();
        setReady(true);
    }, [])

    // Function to get the markers from api
    // % => for moment this get the marker from 10km near user, and put into list markers
    const getMarkers = async () => {
        api.post("/place/nearUser", {
            latitude: -10.896936,
            longitude: -37.081665
        }).then(function (res) {
            let array = res.data.results;
            setListMarkers(array);
        }).catch(function (error) {
            if (error.response) {
              // Request made and server responded
              alert(error.response.data.error);

            } else if (error.request) {
              // The request was made but no response was received
              alert(error.request);

            } else {
              // Something happened in setting up the request that triggered an Error
              alert(error.message);

            }
        });
    }

    // Call this function when the marker are pressed
    // This function is passed to every marker
    function handlePressMarker(data) {
        navigation.navigate('Details', {data});
    }

    // Call thie function when the filter icon on the top of map is pressed
    // Use this to filter the markers on map
    function handlePressFilter() {
        // alert("Pressionou o filtro")
        console.log(state);
    }

    return (
        <View style={style.container} >

            {ready && (
                // show the map to the user when ready
                <MapView 
                style={style.map}
                initialRegion={coord1}
                customMapStyle={mapStyle}
                provider={PROVIDER_GOOGLE}
                showsUserLocation={true}
                >
                {listMarkers.map((item, key) => (
                    // Gets the array of markers and map each one in a custom marker
                    <Marker
                    key={key}
                    coordinate={{
                        latitude: parseFloat(item.location.coordinates[1]),
                        longitude: parseFloat(item.location.coordinates[0]),
                    }}
                    image={markerImage}
                    title={item.title}
                    description={item.description}
                    onCalloutPress={() => handlePressMarker(item)}
                    />
                    // ------------> Here ends the Marker
                ))}
            </MapView>
            // -----------> Here ends the MapView
            )}

            {ready &&
                // Shows filter icon to user
                <Icon
                    name='filter'
                    size={25} color='rgba(242,242,242, 0.8)'
                    style={style.icone}
                    onPress={handlePressFilter}
                />
                // ------> Here ends icon
            }
        </View>
    )
}

// ****************************** Some Test Variables **********************************//

const coord1 = {
    latitude: -10.896915,
    longitude: -37.081515,
    latitudeDelta: 0.008,
    longitudeDelta: 0.008,
}

const coord2 = {
    latitude: -10.896318,
    longitude: -37.082054,
    latitudeDelta: 0.008,
    longitudeDelta: 0.008,
}

// ===================================== StyleSheet Configuration =================================//
const style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#0d0d0d"
    },
    texto: {
        color: '#f2f2f2',
        fontSize: 25
    },
    map: {
        height: "100%",
        width: "100%"
    },
    icone: {
        position: 'absolute',
        top: 40,
        right: 10
    },
    markerView: {
        width: 40,
        height: 40,
        backgroundColor: '#f00'
    },
    loadingScreen: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
        backgroundColor: "#262626",
      },
})