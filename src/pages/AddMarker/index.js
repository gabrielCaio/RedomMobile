import React, { useEffect, useState, useContext } from 'react'
import { View, Text, StyleSheet, SafeAreaView , TouchableOpacity} from 'react-native'

import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps'
import { StatusBar, setStatusBarHidden } from 'expo-status-bar'
import { UserContext } from '../../contexts/userContext'

import MapModal from '../../components/ModalNewMarker'
import style from './styles.js'

import blue from '../../utils/MapStyleBlue'

import RestauranteIcon from '../../assets/markers/restaurante.png'
import ArLivreIcon from '../../assets/markers/arLivre.png'
import FastFoodIcon from '../../assets/markers/fastFood.png'
import MusicaIcon from '../../assets/markers/musica.png'

export default ({ navigation, route }) => {

    const { markers } = route.params
    const [visible, setVisible] = useState(false);
    const [showMarker, setShowMarker] = useState(false);
    const [data, setData] = useState({ lat: null, long: null })

    // Get user location from context
    const { state } = useContext(UserContext)

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


    // This function handles the confirm button press
    function handleConfirmButton (){
        navigation.navigate("NewPlace", {data})
    }

    // This function is called when the user press the cancel button
    function handleCancellButton (){
        setShowMarker(false)
        setStatusBarHidden(false)
        navigation.goBack();
    }
    
    // This function is called to handle the drag of the guide marker
    function handleMarkerLocation (e){
        latlng(e);
    }

    // This function is called to set the data in the data object
    function latlng(e) {
        let { latitude, longitude } = e.nativeEvent.coordinate
        setData({ lat: latitude, long: longitude })
    }

    // Sets the modal when the component is rendered
    useEffect(() => {
        setVisible(true)
    }, [])


    // Here starts the JSX
    return (
        <SafeAreaView style={style.container} >

            <MapView 
                style={style.map}
                initialRegion={initialRegion}
                customMapStyle={blue}
                provider={PROVIDER_GOOGLE}
                onPress={handleMapPress}
            >
                {markers.map((item, key) => {
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
                                    image={RestauranteIcon}
                                    title={item.title}
                                    description={item.description}
                                    onCalloutPress={() => handlePressMarker(item)}
                                />
                            )
                    }
                })}
                {showMarker && (
                    <Marker 
                        coordinate={{ latitude: data.lat, longitude: data.long }}
                        pinColor='blue'
                        onDragEnd={handleMarkerLocation}
                        draggable
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
