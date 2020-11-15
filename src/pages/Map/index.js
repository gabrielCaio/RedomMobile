import React, { useState, useEffect, useContext, useRef } from 'react'
import { View, ActivityIndicator, Text, TouchableOpacity } from 'react-native'

import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Icon2 from 'react-native-vector-icons/MaterialIcons'
import * as Location from 'expo-location';

import { StatusBar } from 'expo-status-bar'


// Assets
import blue from '../../utils/MapStyleBlue'
import NoticiaIcon from '../../assets/markers/noticiaBlack.png'


import { UserContext } from '../../contexts/userContext'
import api from '../../api'
import style from './styles'
import colors from '../../utils/colors'
import FilterModal from './components/filterModal'

import RestauranteIcon from '../../assets/markers/restaurante.png'
import ArLivreIcon from '../../assets/markers/arLivre.png'
import FastFoodIcon from '../../assets/markers/fastFood.png'
import MusicaIcon from '../../assets/markers/musica.png'


export default () => {
    const [listMarkers, setListMarkers] = useState([])
    const [listNews, setListNews] = useState([])
    const [ready, setReady] = useState(false)
    const [userLocation, setUserLocation] = useState(null)
    const [loading, setLoading] = useState(false)
    const [filter, setFilter] = useState({ news: true, places: true })
    const [modal, setModal] = useState(false)
    const [filterColors, setFilterColors] = useState({ one: '#fff', two: colors.fontLighter, three: colors.fontLighter })

    const mapRef = useRef(MapView)

    const { dispatch } = useContext(UserContext)

    // Setting navigations as useNavigation
    const navigation = useNavigation();
    
    useEffect(() => {
        let isMounted = true;
        (async (isMounted) => {
            if(isMounted) {
                let { status } = await Location.requestPermissionsAsync();
                if (status !== 'granted') setReady(false)
            }
        })();
        getMarkers(isMounted);
        return () => { isMounted = false }
    }, [])

    // Function to get the markers from api
    async function getMarkers(isMounted) {
        try {
            let location = await Location.getCurrentPositionAsync({});

            const marker = await api.post("/place/nearUser", {
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                dist: 30000
            })

            const news = await api.post("/news/nearUser", {
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                dist: 30000
            })

            if(isMounted) {
                setUserLocation(location)
                dispatch({
                    type: "setUserLocation",
                    coords: {
                        latitude: location.coords.latitude,
                        longitude: location.coords.longitude
                    }
                })
                if(marker.data.length === 0) setFilter({ places: false })
                if(news.data.length === 0) setFilter({ news: false })
                setListMarkers(marker.data)
                setListNews(news.data)
                setReady(true)
            }
        } catch (error) {
            if(error.response) alert(error.response.data.error)
            else alert("Erro ao carregar marcadores")
        }
    }
    
    // This function is passed to every marker
    function handlePressMarker(data) {
        navigation.navigate('Details', {data});
    }

    function handleReloadPress() {
        setLoading(true)
        getMarkers(true).then(() => setLoading(false))
    }
    
    // Redirects user to add marker page
    function handleAddMarkerPage() {
        navigation.navigate("AddMarker", { markers: listMarkers });
    }

    function redirectToMyLocation() {
        let region = {
            latitude: userLocation.coords.latitude,
            longitude: userLocation.coords.longitude,
            latitudeDelta: 0.008,
            longitudeDelta: 0.008,
        }
        mapRef.current?.animateToRegion(region, 1000)
    }

    function handleFilterPress() {
        setModal(true)
    }
    
    function filterNews() {
        setModal(false)
        setFilterColors({ one: colors.fontLighter, two: "#fff", three: colors.fontLighter })
        setFilter({ news: true, places: false })
    }

    function filterPlaces() {
        setModal(false)
        setFilterColors({ one: colors.fontLighter, two: colors.fontLighter, three: "#fff" })
        setFilter({ news: false, places: true })
    }

    function filterAll() {
        setModal(false)
        setFilterColors({ one: "#fff", two: colors.fontLighter, three: colors.fontLighter })
        setFilter({ news: true, places: true })
    }

    function handleNewsPress(item) {
        navigation.navigate("FocusOnNews", { item })
    }

    return (
        <View style={style.container} >

            <StatusBar style='light' backgroundColor={colors.background} />

            { !ready &&  <ActivityIndicator size="large" color="#f2f2f2" /> }

            {ready && (
                // show the map to the user when ready
                <MapView
                ref={mapRef}
                style={style.map}
                initialRegion={{
                    latitude: userLocation.coords.latitude,
                    longitude: userLocation.coords.longitude,
                    latitudeDelta: 0.008,
                    longitudeDelta: 0.008, 
                }}
                customMapStyle={blue}
                showsUserLocation
                showsMyLocationButton={false}
                provider={PROVIDER_GOOGLE}
                showsCompass={false}
                >

                {filter.news && listNews.map((item, key) => (
                    <Marker
                        key={key.toString()}
                        coordinate={{
                            latitude: parseFloat(item.location.coordinates[1]),
                            longitude: parseFloat(item.location.coordinates[0]),
                        }}
                        image={NoticiaIcon}
                        title='Notícia'
                        description={item.description}
                        onCalloutPress={() => handleNewsPress(item)}
                    />
                    ))
                }

                {filter.places && listMarkers.map((item, key) => {
                    switch (item.tags[0]) {
                        case 'Musica':
                            return (
                                <Marker
                                    key={key.toString()}
                                    coordinate={{
                                        latitude: parseFloat(item.location.coordinates[1]),
                                        longitude: parseFloat(item.location.coordinates[0]),
                                    }}
                                    image={MusicaIcon}
                                    title={item.title}
                                    description={item.description}
                                    onCalloutPress={() => handlePressMarker(item)}
                                />
                            )
                        case 'Ar Livre':
                            return (
                                <Marker
                                    key={key.toString()}
                                    coordinate={{
                                        latitude: parseFloat(item.location.coordinates[1]),
                                        longitude: parseFloat(item.location.coordinates[0]),
                                    }}
                                    image={ArLivreIcon}
                                    title={item.title}
                                    description={item.description}
                                    onCalloutPress={() => handlePressMarker(item)}
                                />
                            )
                        case 'Restaurante':
                            return (
                                <Marker
                                    key={key.toString()}
                                    coordinate={{
                                        latitude: parseFloat(item.location.coordinates[1]),
                                        longitude: parseFloat(item.location.coordinates[0]),
                                    }}
                                    image={RestauranteIcon}
                                    title={item.title}
                                    description={item.description}
                                    onCalloutPress={() => handlePressMarker(item)}
                                />
                            )
                        case 'Lanches':
                            return (
                                <Marker
                                    key={key.toString()}
                                    coordinate={{
                                        latitude: parseFloat(item.location.coordinates[1]),
                                        longitude: parseFloat(item.location.coordinates[0]),
                                    }}
                                    image={FastFoodIcon}
                                    title={item.title}
                                    description={item.description}
                                    onCalloutPress={() => handlePressMarker(item)}
                                />
                            )
                        default:
                            return (
                                <Marker
                                    key={key.toString()}
                                    coordinate={{
                                        latitude: parseFloat(item.location.coordinates[1]),
                                        longitude: parseFloat(item.location.coordinates[0]),
                                    }}
                                    image={ArLivreIcon}
                                    title={item.title}
                                    description={item.description}
                                    onCalloutPress={() => handlePressMarker(item)}
                                />
                            )
                    }
                })}
            
            </MapView>
            // -----------> Here ends the MapView
            )}
            {loading && <ActivityIndicator size='large' color='#f2f2f2' style={{position:'absolute',top:50}} />}

            {ready && <Text style={style.headerText} onPress={handleReloadPress} >Mapa</Text>}

            {modal && 
            <FilterModal
                visible={modal}
                close={() => setModal(false)}
                news={filterNews}
                places={filterPlaces}
                all={filterAll}
                colors={filterColors}
            />
            }

            {ready &&
                // Shows filter icon to user
                <TouchableOpacity onPress={redirectToMyLocation} style={style.reloadIcon}  >
                    <Icon2 name='my-location' size={25} color='rgba(242,242,242,0.9)' />
                </TouchableOpacity>
                // ------> Here ends icon  
            }

            {ready &&
                // Shows AddMarker icon to user
                <TouchableOpacity onPress={handleAddMarkerPage} style={style.addMarkerIcon}  >
                    <Icon name='map-marker-plus' size={25} color='rgba(242,242,242,0.9)' />
                </TouchableOpacity>
                // ------> Here ends icon  
            }

            {ready &&
                // Shows AddMarker icon to user
                <TouchableOpacity onPress={handleFilterPress} style={style.filterIcon} >
                    <Icon name='filter' size={25} color='rgba(242,242,242,0.9)' />
                </TouchableOpacity>
                // ------> Here ends icon
            }
        </View>
    )
}