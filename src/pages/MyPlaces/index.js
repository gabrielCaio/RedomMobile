import React, { useEffect, useState } from 'react'
import { View, Text, FlatList, SafeAreaView, TouchableOpacity, ActivityIndicator } from 'react-native'

import Icon from 'react-native-vector-icons/FontAwesome'
import TrashIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import BackIcon from 'react-native-vector-icons/MaterialIcons'
import Stars from '../../components/Stars'
import style from './styles'
import api from '../../api'

function emptyList() {
    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: 50}} >
            <Text style={{fontFamily: 'Domine_400Regular',color: '#f2f2f2',textAlign:'center',fontSize:16}} >
                Sem Lugares, crie um novo lugar ou espere seu lugar ser aprovado por um administrador
            </Text>
        </View>
    )
}

export default ({ navigation }) => {

    const [places, setPlaces] = useState([])
    const [visible, setVisible] = useState(false)
    const [loading, setLoading] = useState(false)

    // getPlaces when component rendered
    useEffect(() => {
        setLoading(true)
        let isMounted = true
        getPlaces(isMounted)
        return () => { isMounted = false }
    }, [])

    // Get user places function
    async function getPlaces() {
        try {
            const res = await api.get("/place/listSelfPlaces")
            setPlaces(res.data)
            setLoading(false)
        } catch (error) {
            if(error.response) alert(error.response.data.error)
            else alert("Erro ao buscar lugares")
        }
    }

    function handleUploadPress(id) {
        navigation.navigate("UploadImages", {id})
    }

    function handleBack() {
        navigation.goBack()
    }

    async function deletePLace(id) {
        try {
            await api.delete(`/place/deletePlace/${id}`)

            alert('Lugar deletado com sucesso')
            navigation.goBack()
        } catch (error) {
            alert("Erro ao deletar lugar")
        }
    }

    return (
        <SafeAreaView style={style.container} >

            <Text style={style.headerText} >Meus Lugares</Text>

            {loading && <ActivityIndicator size='large' color='#f2f2f2' />}

            {!loading && 
                <FlatList 
                    data={places}
                    keyExtractor={(item, index) => index.toString()}
                    style={{width: '100%'}}
                    ListEmptyComponent={emptyList}
                    renderItem={({item}) => 
                    <TouchableOpacity style={style.item} key={item._id} onPress={() => handleUploadPress(item._id)} >
                        <Text style={style.title} >{item.title}</Text>
                        <Stars stars={item.rating} />
                        <Text style={style.description} >{item.description}</Text>
                        <View>
                            <Icon
                                name='cloud-upload' 
                                size={30}
                                color="#f2f2f2"
                                style={{marginTop: 20, marginBottom: -10}}
                            />
                        </View>
                            <Text style={style.description} >Fazer upload de imagens</Text>

                        <TouchableOpacity style={style.trash} onPress={() => deletePLace(item._id)} >
                            <TrashIcon name="trash-can-outline" size={20} color="#eb5757" />
                        </TouchableOpacity>
                    </TouchableOpacity>
                    }
                />
            }

            <TouchableOpacity style={style.backIcon} onPress={handleBack} >
                <BackIcon name="arrow-back" size={15} color='#000' />
            </TouchableOpacity>

        </SafeAreaView>
    )
}
