import React, { useState, useContext } from 'react'
import { StyleSheet, TouchableOpacity, View, Text, FlatList } from 'react-native'

import api from '../../api'
import colors from '../../utils/colors'
import BackIcon from 'react-native-vector-icons/MaterialIcons'
import Modal from './CreateUpdateModal'
import { useFocusEffect } from '@react-navigation/native'
import { UserContext } from '../../contexts/userContext'

function EmptyList() {
    return (
        <View style={style.emptyView} >
            <Text style={style.emptyText} >Sem Atualizações</Text>
        </View>
    )
}

export default ({ navigation }) => {

    const [updates, setUpdates] = useState([])
    const [visible, setVisible] = useState(false)
    const { state } = useContext(UserContext)
    
    useFocusEffect(
        React.useCallback(() => {
            let isMounted = true

            const getUpdates = async () => {
                try {
                    const res = await api.get('/update/list')
        
                    if (isMounted) {
                    setUpdates(res.data)
                    }
                } catch (e) {
                    alert("Erro ao listar updates")
                    navigation.goBack()
                }
            }

            getUpdates()

            return () => { isMounted = false }
        }, [])
    )

    function handleBackButtonPress() {
        navigation.goBack()
    }

    async function createUpdate(title, description) {
        try {
            const res = await api.post('/update/create', { title, description })

            alert("Update criado com sucesso")
        } catch (error) {
            alert("Erro ao criar update")
            setVisible(false)
        }
    }

    async function deleteUpdate(id) {
        try {
            await api.delete(`/update/delete/${id}`)

            alert("Deletado com sucesso!")
        } catch (error) {
            alert("Erro ao deletar update")
        }
    }

    const formatDate = React.useCallback((date) => {
        let d = new Date(date)
        return d.toLocaleString()
    }, [])

    return (
        <View style={style.container} >
            <View style={style.header} >
                <Text style={style.headerText} >Atualizações</Text>
            </View>

            <TouchableOpacity style={style.backButton} onPress={handleBackButtonPress} >
                <BackIcon name="arrow-back" size={20} color="#000" />
            </TouchableOpacity>

            {state.role === 'admin' && 
                <TouchableOpacity style={style.addButton} onPress={() => setVisible(true)} >
                    <BackIcon name="add" size={20} color="#000" />
                </TouchableOpacity>
            }

            <FlatList 
                data={updates}
                keyExtractor={item => item._id}
                style={{width: '100%'}}
                ListEmptyComponent={EmptyList}
                renderItem={({ item }) => 
                    <View style={style.card} >
                        <Text style={style.cardDate} >{formatDate(item.createdAt)}</Text>
                        <Text style={style.cardTitle} >{item.title}</Text>
                        <Text style={style.cardDescription} >{item.description}</Text>

                        {state.role === 'admin' &&
                            <BackIcon name="close" size={20} color="#f00" 
                                style={style.deleteIcon} 
                                onPress={() => deleteUpdate(item._id)} 
                            />
                        }
                    </View>
                }
            />

            {visible && 
                <Modal 
                    visible={visible}
                    close={() => setVisible(false)}
                    createUpdate={createUpdate}
                />
            }
        </View>
    )
}



const style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: colors.background,
        paddingHorizontal: 10
    },
    backButton: {
        backgroundColor: '#f2f2f2',
        width: 30,
        height: 30,
        borderRadius: 30,
        position: 'absolute',
        top: 20,
        left: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    addButton: {
        backgroundColor: '#f2f2f2',
        width: 30,
        height: 30,
        borderRadius: 30,
        position: 'absolute',
        top: 20,
        right: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    header: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20
    },
    headerText: {
        fontFamily: 'Domine_700Bold',
        textAlign: 'center',
        color: '#f2f2f2',
        fontSize: 18,
        fontWeight: 'bold'
    },
    emptyView: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 40
    },
    emptyText: {
        fontFamily: 'Domine_400Regular',
        color: '#f2f2f2',
        fontSize: 18
    },
    card: {
        width: '100%',
        backgroundColor: colors.darkBlue,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        borderRadius: 5
    },
    cardDate: {
        fontFamily: 'Domine_400Regular',
        fontSize: 10,
        color: colors.fontLight
    },
    cardTitle: {
        fontFamily: 'Domine_400Regular',
        color: colors.fontLighter,
        textAlign: 'center',
        marginTop: 10,
        fontWeight: 'bold'
    },
    cardDescription: {
        fontFamily: 'Domine_400Regular',
        color: colors.fontLighter,
        textAlign: 'center',
        marginTop: 10,
        fontSize: 12
    },
    deleteIcon: {
        position: 'absolute',
        top: 10,
        right: 10
    }
})
