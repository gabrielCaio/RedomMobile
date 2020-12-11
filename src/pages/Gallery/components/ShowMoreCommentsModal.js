import React, { useState, useEffect, useCallback, useContext } from 'react'
import { View, Text, StyleSheet, Modal, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import { UserContext } from '../../../contexts/userContext'

import Input from '../../../components/Input'
import api from '../../../api'
import Icon2 from 'react-native-vector-icons/MaterialIcons'
import colors from '../../../utils/colors'


// Modal to show more comments of post to user
export default ({ visible, close, id }) => {

    const [comment, setComment] = useState("")
    const [list, setList] = useState([])
    const [refresh, setRefresh] = useState(false)
    const [loading, setLoading] = useState(false)

    const { state } = useContext(UserContext)

    useEffect(() => {
        let isMounted = true
        if(isMounted) {
            getComments(isMounted) 
        }
        return () => { isMounted = false }
    }, [refresh])

    useEffect(() => {
        let isMounted = true
        setLoading(true)
        if(isMounted) getComments()
        return () => { isMounted = false }
    }, [])

    async function getComments(isMounted) {
        try {
            const res = await api.get(`/comment/listCommentsPost/${id}`)
            if(isMounted) {
                setLoading(false)
                setList(res.data)
            }
        } catch (error) {
            alert("Erro ao buscar comentários")
        }
    }

    async function confirm() {
        try {
            const res = await api.post(`/comment/create/${id}`, { comment })
            setComment("")
            setRefresh(() => !refresh)
        } catch (error) {
            alert("Erro ao comentar")
        }
    }

    async function deleteComment(data) {
        try {
            setLoading(true)
            const res = await api.delete(`/comment/delete/${data}`)

            setRefresh(() => !refresh)
            setLoading(false)
        } catch (error) {
            alert('Erro ao deletar comentário')
        }
    }

    const utcToLocal = useCallback((date) => {
        let d = new Date(date)
        return d.toLocaleString()
    }, [])

    function handleIconBack() {
        close()
    }

    return (
        <Modal
            animationType="fade"
            visible={visible}
            transparent
            onRequestClose={close}
        >
            <View style={style.container} >
                
                <View style={{width:'100%',alignItems:'center',marginVertical:20}} >
                    <Text style={style.headerText} >Comentários</Text>
                </View>

                <FlatList 
                    data={list}
                    keyExtractor={item => item._id}
                    style={{width: '100%'}}
                    renderItem={({ item }) => 
                        <View key={item._id} style={style.commentArea} >
                            <Text style={style.name} >{item.user.name}</Text>
                            <Text style={style.date} >{utcToLocal(item.createdAt)}</Text>
                            <Text style={style.comment} >{item.comment}</Text>
                            {state.id === item.user._id ?
                                <Icon 
                                    name='trash-can-outline' 
                                    size={20} 
                                    color="#eb5757" 
                                    style={style.trashIcon} 
                                    onPress={() => deleteComment(item._id)}
                                />
                                :
                            state.role === 'admin' ?
                                <Icon 
                                    name='trash-can-outline' 
                                    size={20} 
                                    color="#eb5757" 
                                    style={style.trashIcon} 
                                    onPress={() => deleteComment(item._id)}
                                />
                                :
                            null
                            }
                        </View>
                    }
                />

                <View style={{ position: "absolute", bottom: 20, width: "100%" }} >
                        <Input 
                            placeholder="Adicionar comentário"
                            value={comment}
                            onChangeText={e=>setComment(e)}
                            multiline
                            radius={2}
                        />
                </View>

                <TouchableOpacity style={style.iconBack} onPress={handleIconBack} >
                    <Icon2 name='arrow-back' size={15} color='#000' />
                </TouchableOpacity>

                <TouchableOpacity style={style.commentButton} onPress={confirm} >
                    <Text style={style.buttonText} >Comentar</Text>
                </TouchableOpacity>

                {loading && <ActivityIndicator size="large" color="#fff" style={style.loading} /> }

            </View>
        </Modal>
    )
}

const style = StyleSheet.create({
    commentButton: {
        position: "absolute",
        bottom: 0,
        width: '100%',
        backgroundColor: colors.darkBlue,
        height: 40,

        alignItems: 'center',
        justifyContent: 'center'
    },
    loading: {
        position: 'absolute',
        top: '10%'
    },
    container: {
        flex: 1,
        backgroundColor: colors.background,
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingHorizontal: 10
    },
    iconBack: {
        width: 30,
        height: 30,
        borderRadius: 30,
        backgroundColor: '#f2f2f2',
        alignItems: 'center',
        justifyContent: 'center',

        position: 'absolute',
        top: 20,
        left: 10
    },
    commentArea: {
        marginTop: 5,
        marginBottom: 5,
        backgroundColor: colors.background,
        width: '100%',
        padding: 10,
        borderRadius: 5
    },
    trashIcon: {
        position: "absolute",
        right: 5,
        top: 15
    },
    buttonText: {
        color: '#f2f2f2',
        fontFamily: 'Domine_400Regular',
        fontSize: 14
    },
    comment: {
        color: '#f2f2f2',
        fontFamily: 'Domine_400Regular',
        fontSize: 14,
        marginLeft: 40,
        marginTop: 10,
        textAlign: 'justify'
    },
    name: {
        color: '#f2f2f2',
        fontFamily: 'Domine_700Bold',
        fontWeight: 'bold'
    },
    date: {
        color: '#f2f2f2',
        fontFamily: 'Domine_400Regular',
        fontSize: 10
    },
    headerText: {
        color: '#f2f2f2',
        fontFamily: 'Domine_700Bold',
        fontWeight: 'bold',
        fontSize: 16,
        opacity: 0.8
    }
})