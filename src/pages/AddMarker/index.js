import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, SafeAreaView , TouchableOpacity} from 'react-native'
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps'
import { StatusBar, setStatusBarBackgroundColor, setStatusBarHidden } from 'expo-status-bar'

import MapModal from '../../components/MapModal'

import mapStyle from '../../utils/MapStyle'

export default ({ navigation }) => {

    const [visible, setVisible] = useState(false);
    const [showMarker, setShowMarker] = useState(false);
    const [data, setData] = useState({ lat: null, long: null })
    
    setStatusBarBackgroundColor("#0d0d0d")

    const closeModal = () => {
        setVisible(false);
    }

    const handleMapPress = (e) => {
        setStatusBarHidden(true)
        let { latitude, longitude } = e.nativeEvent.coordinate;
        setData({ lat: latitude, long: longitude });
        setShowMarker(true);
    }

    function handleConfirmButton (){
        navigation.navigate("NewPlace", {data})
    }

    function handleCancellButton (){
        setShowMarker(false)
        setStatusBarHidden(false)
    }
    
    function handleMarkerLocation (e){
        latlng(e);
    }

    const latlng = (e) => {
        let { latitude, longitude } = e.nativeEvent.coordinate;
        setData({ lat: latitude, long: longitude })
      };

    useEffect(() => {
        setVisible(true)
    }, [])

    return (
        <SafeAreaView style={style.container} >
            <StatusBar style='light' />
            <MapView 
                style={style.map}
                initialRegion={coord1}
                customMapStyle={mapStyle}
                provider={PROVIDER_GOOGLE}
                onPress={handleMapPress}
            >
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

const style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#0d0d0d",
    },
    texto: {
        color: '#f2f2f2',
        fontSize: 25
    },
    map: {
        height: "100%",
        width: "100%"
    },
    buttonArea: {
        position: 'absolute',
        bottom: 40,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    confirmar: {
        height: 40,
        width: 100,
        borderRadius: 15,
        backgroundColor: 'rgba(0,255,0, 0.6)',
        
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    cancelar: {
        height: 40,
        width: 100,
        borderRadius: 15,
        backgroundColor: 'rgba(255, 0, 0, 0.6)',

        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    }
})

const coord1 = {
    latitude: -10.896915,
    longitude: -37.081515,
    latitudeDelta: 0.008,
    longitudeDelta: 0.008,
}