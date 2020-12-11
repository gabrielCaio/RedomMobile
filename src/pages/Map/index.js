import React, { useState, useEffect, useContext, useRef, useCallback } from 'react'
import { View, ActivityIndicator, Text, TouchableOpacity, Image } from 'react-native'

import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import { useNavigation, useFocusEffect } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Icon2 from 'react-native-vector-icons/MaterialIcons'
import * as Location from 'expo-location'

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
    const [error, setError] = useState(false)
    const [userLocation, setUserLocation] = useState(null)
    const [loading, setLoading] = useState(false)
    const [filterPlacesState, setFilterPlacesState] = useState(true)
    const [filterNewsState, setFilterNewsState] = useState(true)
    const [modal, setModal] = useState(false)
    const [filterColors, setFilterColors] = useState({ one: '#fff', two: colors.fontLighter, three: colors.fontLighter })

    const mapRef = useRef(MapView)

    const { state, dispatch } = useContext(UserContext)

    const navigation = useNavigation()

    useFocusEffect(
        useCallback(() => {
            const getLocation = async () => {await Location.getCurrentPositionAsync({})}
            getLocation()
        }, [])
    )
    
    useEffect(() => {
        let isMounted = true
        if(isMounted) setLoading(true)
        if(ready) getMarkers(isMounted).then(() => setLoading(false))
        return () => { isMounted = false }
    }, [ready])

    const getMarkers = useCallback(async (isMounted) => {
        try {
            let location = await Location.getCurrentPositionAsync({})

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
                if(marker.data.length === 0) setFilterPlacesState(false)
                if(news.data.length === 0) setFilterNewsState(false)
                setListMarkers(marker.data)
                setListNews(news.data)
            }
        } catch (error) {
            setError(true)
        }
    }, [])

    function handlePressMarker(data) {
        navigation.navigate('Details', {data});
    }

    function handleReloadPress() {
        setLoading(true)
        getMarkers(true).then(() => setLoading(false))
    }

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
        setFilterNewsState(true)
        setFilterPlacesState(false)
    }

    function filterPlaces() {
        setModal(false)
        setFilterColors({ one: colors.fontLighter, two: colors.fontLighter, three: "#fff" })
        setFilterNewsState(false)
        setFilterPlacesState(true)
    }

    function filterAll() {
        setModal(false)
        setFilterColors({ one: "#fff", two: colors.fontLighter, three: colors.fontLighter })
        setFilterNewsState(true)
        setFilterPlacesState(true)
    }

    function handleNewsPress(item) {
        navigation.navigate("FocusOnNews", { item })
    }

    // sets the map ready
    function setMapReady() {
        setReady(true)
    }

    // Load all place markers
    function loadMarkersPlaces() {
        return (
            listMarkers.map((item, key) => <Marker
                key={key.toString()}
                coordinate={{
                    latitude: parseFloat(item.location.coordinates[1]),
                    longitude: parseFloat(item.location.coordinates[0]),
                }}
                title={item.title}
                // pinColor={ 
                //     item.tags[0] === 'Musica' ? 'blue' :
                //     item.tags[0] === 'Restaurante' ? 'purple' :
                //     item.tags[0] === 'Lanches' ? 'orange' :
                //     item.tags[0] === 'Ar Livre' ? 'green' : 'green'
                // }
                description={item.description}
                onCalloutPress={() => handlePressMarker(item)}
                // tracksViewChanges={false}
            >
                <Image style={style.mapIcon} source={
                    item.tags[0] === 'Musica' ? MusicaIcon :
                    item.tags[0] === 'Restaurante' ? RestauranteIcon :
                    item.tags[0] === 'Lanches' ? FastFoodIcon :
                    item.tags[0] === 'Ar Livre' ? ArLivreIcon : ArLivreIcon
                } />
            </Marker>
            )
        )
    }

    // Load all news markers
    function loadNewsMarkers() {
        return (
            listNews.map((item, key) => (
                <Marker
                    key={key.toString()}
                    coordinate={{
                        latitude: parseFloat(item.location.coordinates[1]),
                        longitude: parseFloat(item.location.coordinates[0]),
                    }}
                    title='Notícia'
                    description={item.description}
                    onCalloutPress={() => handleNewsPress(item)}
                    // tracksViewChanges={false}
                    pinColor="yellow"
                >
                    <Image style={style.mapIcon} source={NoticiaIcon} />
                </Marker>
            ))
        )
    }

    return (
        <View style={style.container} >

            {!ready && !error && <ActivityIndicator size="large" color="#f2f2f2" />}

            {error && (
                <View style={style.errorArea} >
                    <Text style={style.errorMessage} >Erro ao carregar o mapa</Text>
                    <TouchableOpacity style={style.errorButton} onPress={getMarkers} >
                        <Text style={style.errorText} >Tentar de novo</Text>
                    </TouchableOpacity>
                </View>
            )}

            <MapView
                ref={mapRef}
                style={style.map}
                initialRegion={{
                    latitude: parseFloat(state.latitude),
                    longitude: parseFloat(state.longitude),
                    latitudeDelta: 0.008,
                    longitudeDelta: 0.008, 
                }}
                customMapStyle={blue}
                showsUserLocation
                showsMyLocationButton={false}
                provider={PROVIDER_GOOGLE}
                showsCompass={false}
                onLayout={setMapReady}
            >

                {ready && filterNewsState && loadNewsMarkers()}

                {ready && filterPlacesState && loadMarkersPlaces()}
            
        </MapView>

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