import React, { useEffect, useState, useContext } from 'react'
import { View, Text, SafeAreaView , TouchableOpacity, Image } from 'react-native'

import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps'
import { UserContext } from '../../contexts/userContext'

import MapModal from '../../components/ModalNewMarker'
import style from './styles.js'

import blue from '../../utils/MapaComCoisas'

import RestauranteIcon from '../../assets/markers/restaurante.png'
import ArLivreIcon from '../../assets/markers/arLivre.png'
import FastFoodIcon from '../../assets/markers/fastFood.png'
import MusicaIcon from '../../assets/markers/musica.png'
import api from '../../api'

export default ({ navigation, route }) => {

    const [visible, setVisible] = useState(false)
    const [showMarker, setShowMarker] = useState(false)
    const [mapReady, setMapReady] = useState(false)
    const [markers, setMarkers] = useState([])
    const [data, setData] = useState({ lat: null, long: null })

    // Get user location from context
    const { state } = useContext(UserContext)

    useEffect(() => {
        setVisible(true)
    }, [])

    useEffect(() => {
        if(mapReady) getMarkers()
    }, [mapReady])

    const initialRegion = {
        latitude: parseFloat(state.latitude),
        longitude: parseFloat(state.longitude),
        latitudeDelta: 0.008,
        longitudeDelta: 0.008,
    }
    
    const closeModal = () => {
        setVisible(false);
    }

    // This function is called when the user touchs the map
    // it sets the status bar hidden to better visualization
    // and put the data received from the touche event and saves in the data object
    const handleMapPress = (e) => {
        let { latitude, longitude } = e.nativeEvent.coordinate;
        setData({ lat: latitude, long: longitude });
        setShowMarker(true);
    }

    function handleConfirmButton (){
        navigation.navigate("NewPlace", {data})
    }

    function handleCancellButton (){
        setShowMarker(false)
        navigation.goBack()
    }
    
    function handleMarkerLocation (e){
        latlng(e);
    }

    function latlng(e) {
        let { latitude, longitude } = e.nativeEvent.coordinate
        setData({ lat: latitude, long: longitude })
    }

    async function getMarkers() {
        try {
            let res = await api.post('place/nearUser', {
                latitude: state.latitude,
                longitude: state.longitude,
                dist: 30000
            })

            setMarkers(res.data)
        } catch (error) {
            alert("Erro ao buscar marcadores")
        }
    }

    function loadMarkers() {
        return (
            markers.map((item, key) => (
                <Marker
                    key={key.toString()}
                    coordinate={{
                        latitude: parseFloat(item.location.coordinates[1]),
                        longitude: parseFloat(item.location.coordinates[0]),
                    }}
                    title={item.title}
                    description={item.description}
                    onCalloutPress={() => handlePressMarker(item)}
                    pinColor={ 
                        item.tags[0] === 'Musica' ? 'blue' :
                        item.tags[0] === 'Restaurante' ? 'purple' :
                        item.tags[0] === 'Lanches' ? 'orange' :
                        item.tags[0] === 'Ar Livre' ? 'green' : 'green'
                    }
                    tracksViewChanges={false}
                >
                    {/* <Image style={style.mapIcon} source={
                        item.tags[0] === 'Musica' ? MusicaIcon :
                        item.tags[0] === 'Restaurante' ? RestauranteIcon :
                        item.tags[0] === 'Lanches' ? FastFoodIcon :
                        item.tags[0] === 'Ar Livre' ? ArLivreIcon : ArLivreIcon
                    }/> */}
                </Marker>
            ))
        )
    }

    // Here starts the JSX
    return (
        <SafeAreaView style={style.container} >

            <MapView 
                style={style.map}
                initialRegion={initialRegion}
                customMapStyle={blue}
                provider={PROVIDER_GOOGLE}
                onPress={handleMapPress}
                showsCompass={false}
                showsMyLocationButton={false}
                onLayout={() => setMapReady(true)}
            >
                {mapReady && markers[0] != null && loadMarkers()}

                {mapReady && showMarker && (
                    <Marker 
                        coordinate={{ latitude: data.lat, longitude: data.long }}
                        pinColor='blue'
                        onDragEnd={handleMarkerLocation}
                        draggable
                        onCalloutPress={() => {}}
                    />
                )}


            </MapView>

            {visible && 
                // Map modal
                <MapModal 
                    visible={visible}
                    onRequestClose={closeModal}
                    pressModal={closeModal}
                />
            }


            {showMarker && (
                <View style={style.buttonArea} >
                <TouchableOpacity style={style.cancelar} onPress={handleCancellButton} >
                    <Text>Cancelar</Text>
                </TouchableOpacity>

                <TouchableOpacity style={style.confirmar} onPress={handleConfirmButton} >
                    <Text>Confirmar</Text>
                </TouchableOpacity>
            </View>
            )}
            
        </SafeAreaView>
    )
}
