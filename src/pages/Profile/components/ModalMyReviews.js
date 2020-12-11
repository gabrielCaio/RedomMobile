import React, { useState, useEffect } from 'react'
import { Modal, StyleSheet, View, Text, ActivityIndicator, FlatList, TouchableOpacity } from 'react-native'

import Icon from 'react-native-vector-icons/MaterialIcons'
import api from '../../../api'
import Stars from '../../../components/Stars'
import color from '../../../utils/colors'

function EmptyList() {
    return (
        <View style={style.emptyView} >
            <Text style={style.text} >Sem reviews</Text>
        </View>
    )
}

export default ({ visible, close }) => {

    const [reviews, setReviews] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        let isMounted = true
        const getReviews = async () => {
            try {
                const res = await api.get("/review/myReviews")
                if(isMounted) {
                    setReviews(res.data)
                    setLoading(false)
                }
            } catch (error) {
                alert("Erro ao buscar reviews")
                close()
            }
        }

        getReviews()

        return () => { isMounted = false }
    }, [])

    return (
        <Modal
            onRequestClose={close}
            animationType='fade'
            visible={visible}
        >
            <View style={style.container} >

                <Text style={style.headerText} >My Reviews</Text>

                {loading && <ActivityIndicator size='large' color='#f2f2f2' /> }

                {!loading && 
                <FlatList
                    data={reviews}
                    keyExtractor={(item, index) => index.toString()}
                    style={{width: '100%', paddingHorizontal: 10}}
                    renderItem={({item}) => 
                        <View style={style.card} >
                            <Text style={style.review} >{item.place.title}</Text>
                            <Stars stars={item.stars} />
                            <Text style={style.text} >{item.review}</Text>
                        </View>
                    }
                    ListEmptyComponent={EmptyList}
                />
                }

                <TouchableOpacity style={style.backIcon} onPress={close} >
                    <Icon color="#000" size={15} name="arrow-back" />
                </TouchableOpacity>

            </View>
        </Modal>
    )
}

const style = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: color.background,
        paddingTop: 20
    },
    emptyView: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        color: "#f2f2f2",
        fontFamily: "Domine_400Regular",
        fontSize: 16,
        marginTop: 10
    },
    review: {
        color: "#f2f2f2",
        fontFamily: "Domine_400Regular",
        fontSize: 12
    },
    headerText: {
        color: "#f2f2f2",
        fontSize: 18,
        fontFamily: "Domine_700Bold",
        fontWeight: "bold",
        marginBottom: 20,
    },
    card: {
        width: '100%',
        padding: 20,
        backgroundColor: color.darkBlue,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 20,
        borderRadius: 10
    },
    backIcon: {
        position: 'absolute',
        top: 20,
        left: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f2f2f2',
        width: 30,
        height: 30,
        borderRadius: 30
    },
})