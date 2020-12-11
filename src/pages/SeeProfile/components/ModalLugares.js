import React, { useState, useEffect } from 'react'
import { Modal, View, StyleSheet, Text, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native'

import { useNavigation } from '@react-navigation/native'

import Icon from 'react-native-vector-icons/MaterialIcons'
import Stars from '../../../components/Stars'
import api from '../../../api'
import colors from '../../../utils/colors'

function EmptyList() {
    return (
        <View style={style.emptyArea} >
            <Text style={style.emptyText} >Sem lugares para visualizar</Text>
        </View>
    )
}

export default ({ visible, close, user }) => {

    const [loading, setLoading] = useState(true)
    const [places, setPlaces] = useState([])

    const navigation = useNavigation()

    useEffect(() => {
        let isMounted = true
        if(isMounted) getPlaces()
        return () => { isMounted = false }
    }, [])

    const getPlaces = async() => {
        try {
            const res = await api.get(`/place/listUserPlaces/${user}`)

            setPlaces(res.data)

            setLoading(false)
        } catch (error) {
            alert("Erro ao buscar lugares do usuário");
            close()
        }
    }

    function formatDate(date) {
        let str = date.slice(0, 10)
        let hour = date.slice(11, 19)
        return str + ' ' + hour
    }

    function handleCardPress(data) {
        navigation.navigate("Details", { data })
        close()
    }

    return (
        <Modal
            onRequestClose={close}
            visible={visible}
            animationType='fade'
        >

            <View style={style.container} >
                <Text style={style.headerText} >Lugares do usuário</Text>
                {loading && <ActivityIndicator size="large" color="#f2f2f2" />}
                {!loading && 
                    <FlatList 
                        data={places}
                        keyExtractor={(item, index) => index.toString()}
                        style={{width: '100%'}}
                        ListEmptyComponent={EmptyList}
                        renderItem={({ item }) => 
                            <TouchableOpacity style={style.card} onPress={()=>handleCardPress(item)} >
                                <Text style={style.title} >{item.title}</Text>
                                <Text style={style.date} >{formatDate(item.createdAt)}</Text>
                                <Stars stars={item.rating} />
                                <Text style={style.description} >{item.description}</Text>
                            </TouchableOpacity>
                        }
                    />
                }

                <TouchableOpacity style={style.closeIcon} onPress={() => close()} > 
                    <Icon name="arrow-back" size={15} color="#000" />
                </TouchableOpacity>
            </View>

        </Modal>
    )
}

const style = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: colors.background,
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: 10,
    },
    emptyArea: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    emptyText: {
        color: '#fff',
        fontFamily: 'Domine_400Regular',
        marginTop: 40,
        fontSize: 14
    },
    headerText: {
        color: '#f2f2f2',
        fontFamily: "Domine_700Bold",
        fontWeight: 'bold',
        fontSize: 18,
        marginVertical: 10,
        marginBottom: 20
    },
    card: {
        width: "100%",
        backgroundColor: colors.darkBlue,
        padding: 20,
        alignItems: 'center',
        justifyContent: "center",
        borderRadius: 5,
        marginVertical: 20
    },
    image: {
        width: "100%",
        height: 480,
    },
    title: {
        color: colors.fontLight,
        fontSize: 16,
        fontFamily: "Domine_700Bold",   
        fontWeight: 'bold'
    },
    date: {
        color: colors.fontLight,
        fontFamily: "Domine_400Regular",
        fontSize: 12,
    },
    description: {
        marginVertical: 20,
        color: colors.fontLighter,
        fontFamily: "Domine_400Regular"
    },
    closeIcon: {
        position: "absolute",
        top: 20,
        left: 10,
        backgroundColor: '#f2f2f2',
        height: 30,
        width: 30,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
})