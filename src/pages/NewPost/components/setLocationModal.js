import React, { useContext, useState, useEffect } from 'react'
import { Modal, View, StyleSheet, Text, TouchableOpacity, ActivityIndicator, Image } from 'react-native'
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps'
import Icon from 'react-native-vector-icons/MaterialIcons'

import { UserContext } from '../../../contexts/userContext'
import mapStyle from '../../../utils/MapStyleBlue'
import api from '../../../api'

import RestauranteIcon from '../../../assets/markers/restaurante.png'
import ArLivreIcon from '../../../assets/markers/arLivre.png'
import FastFoodIcon from '../../../assets/markers/fastFood.png'
import MusicaIcon from '../../../assets/markers/musica.png'


export default ({ visible, close, type, createPostWithPlace, createPostWithoutPlace, createNews }) => {
    const { state } = useContext(UserContext)


    const [listMarkers, setListMarkers] = useState([])
    const [mapReady, setMapReady] = useState(false)
    const [loading, setLoading] = useState(false)
    const [showMarker, setShowMarker] = useState(false)
    const [data, setData] = useState({ latitude: 0, longitude: 0 })

    useEffect(() => {
        let isMounted = true
        const getMarkers = async () => {
            try{
                setLoading(true)
                const res = await api.post('/place/nearUser', {
                    latitude: state.latitude,
                    longitude: state.longitude,
                    dist: 30000
                })

                setListMarkers(res.data)
                setLoading(false)
            }catch(error){
                alert("Erro ao carregar mapa")
                close()
            }
        }
        if(isMounted) getMarkers()

        return () => { isMounted = false }
    }, [])

    async function handlePressMarker(item) {
        if( type === 'post' ) createPostWithPlace(item._id)
        else alert('Para criar uma notícia selecione um local vazio no mapa')
    }

    function handleMapPress(e) {
        let { latitude, longitude } = e.nativeEvent.coordinate
        setData({ latitude, longitude })
        setShowMarker(old => !old);
    }

    function handleConfirmButton() {
        if( type === 'post' )createPostWithoutPlace(data)
        else createNews(data)
    }

    function handleDragEnd(e) {
        let { latitude, longitude } = e.nativeEvent.coordinate
        setData({ latitude, longitude })
    }

    return (
        <Modal
            animationType='fade'
            onRequestClose={close}
            visible={visible}
        >
            <View style={style.container} >
                <MapView 
                    provider={PROVIDER_GOOGLE}
                    initialRegion={{
                        latitude: state.latitude,
                        longitude: state.longitude,
                        latitudeDelta: 0.008,
                        longitudeDelta: 0.008,
                    }}
                    style={style.map}
                    showsCompass={false}
                    customMapStyle={mapStyle}
                    showsUserLocation
                    showsMyLocationButton={false}
                    onLayout={() => setMapReady(true)}
                    onPress={handleMapPress}
                >
                    {mapReady && listMarkers.map((item, key) => (
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
                            >

                                {/* <Image style={style.mapIcon} source={
                                    item.tags[0] === 'Musica' ? MusicaIcon :
                                    item.tags[0] === 'Restaurante' ? RestauranteIcon :
                                    item.tags[0] === 'Lanches' ? FastFoodIcon :
                                    item.tags[0] === 'Ar Livre' ? ArLivreIcon : ArLivreIcon
                                } /> */}

                            </Marker>
                        )
                    )
                    }

                    {mapReady && showMarker && (
                        <Marker 
                            coordinate={data}
                            draggable
                            onDragEnd={handleDragEnd}
                            pinColor='blue'
                        />
                    )}
                </MapView>

                <Text style={style.headerText} >Selecione uma localização</Text>

                {loading && <ActivityIndicator size='large' color='#f2f2f2' style={{position:'absolute',top:40}} />}

                {showMarker && (
                    <View style={style.buttonArea} >
                        <TouchableOpacity style={style.cancelButton} onPress={() => close()} >
                            <Text style={style.text} >Cancelar</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={style.confirmButton} onPress={handleConfirmButton} >
                            <Text style={style.text} >Confirmar</Text>
                        </TouchableOpacity>
                    </View>
                )}

                <TouchableOpacity onPress={close} style={style.backIcon} >
                    <Icon name="arrow-back" size={15} color="#000" />
                </TouchableOpacity>

            </View>
        </Modal>
    )
}


const style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f2f2f2',
    },
    headerText: {
        color: "#f2f2f2",
        fontFamily: 'Domine_400Regular',
        position: 'absolute',
        top: 20,
        fontWeight: "bold",
        fontSize: 16,
    },
    backIcon: {
        width: 30,
        height: 30,
        borderRadius: 30,
        backgroundColor: '#f2f2f2',
        position: 'absolute',
        top: 20,
        left: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },  
    text: {
        fontSize: 14,
        color: '#f2f2f2',
    },
    map: {
        width: '100%',
        height: '100%',
    },
    buttonArea: {
        width: '100%',
        flexDirection: 'row',
        position: 'absolute',
        bottom: 20,
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },
    cancelButton: {
        backgroundColor: '#eb57578a',
        width: 100,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10
    },
    confirmButton: {
        backgroundColor: '#0f07',
        width: 100,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
    },
    mapIcon: {
        width: 35,
        height: 30,
        resizeMode: 'contain'
    }
})