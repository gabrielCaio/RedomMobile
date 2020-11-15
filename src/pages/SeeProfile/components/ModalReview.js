import React, { useEffect, useState } from 'react'
import { Modal, View, StyleSheet, Text, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native'

import Icon from 'react-native-vector-icons/MaterialIcons'
import api from '../../../api'
import Stars from '../../../components/Stars'
import colors from '../../../utils/colors'
import color from '../../../utils/colors'

function EmptyList() {
    return (
        <View style={style.emptyArea} >
            <Text style={style.emptyText} >Sem reviews para visualizar</Text>
        </View>
    )
}

export default ({ visible, close, user }) => {

    const [reviews, setReviews] = useState([])
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let isMounted = true
        if(isMounted) getUserReviews(isMounted)
        return () => {isMounted = false}
    }, [])

    async function getUserReviews (isMounted) {
        try {
            const res = await api.get(`/review/listReviewsUser/${user}`)

            if(isMounted) {
                setReviews(res.data);
                setLoading(false);
            }
        } catch (error) {
            alert("Erro ao buscar reviews do usuário");
            close();
        }
    }

    const formatDate = React.useCallback((date) => {
        let d = new Date(date)
        return d.toLocaleString()
    }, [])

    return (
        <Modal
            onRequestClose={close}
            visible={visible}
            animationType='fade'
        >
            <View style={style.container} >
                <Text style={style.headerText} >Reviews do usuário</Text>

                {loading && <ActivityIndicator size="large" color="#f2f2f2" />}
                
                {!loading && (
                    <FlatList 
                        data={reviews}
                        keyExtractor={(item, index) => index.toString()}
                        ListEmptyComponent={EmptyList}
                        renderItem={({ item }) => 
                        <View style={style.card} >
                            <View style={style.info} >
                                <Text style={style.date} >{formatDate(item.createdAt)}</Text>
                                <Stars stars={item.stars} />
                            </View>
                            <Text style={style.titlePlace} >{item.place.title}</Text>
                            <Text style={style.texto} >{item.review}</Text>
                        </View>
                        }
                    />
                )}

                <TouchableOpacity onPress={()=>close()} style={style.closeIcon} >
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
        backgroundColor: color.background,
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: 10,
    },
    headerText: {
        color: "#f2f2f2",
        fontFamily: 'Domine_700Bold',
        fontSize: 18,
        marginTop: 20,
        marginBottom: 20,
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
    texto: {
        color: '#f2f2f2',
        fontFamily: "Domine_400Regular",
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 20,
    },
    card: {
        width: '100%',
        backgroundColor: color.darkBlue,
        marginVertical: 20,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
    },
    info: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        marginBottom: 20,
    },
    date: {
        color: '#f2f2f2',
        fontFamily: "Domine_400Regular",
        fontSize: 10,
    },
    titlePlace: {
        color: '#f2f2f2',
        fontFamily: "Domine_700Bold",
        fontSize: 14,
        fontWeight: "bold",
        marginBottom: 20,
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