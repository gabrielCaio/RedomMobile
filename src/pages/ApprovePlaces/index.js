import React, { useEffect, useState } from 'react'
import { SafeAreaView, View, Text, FlatList } from 'react-native'

import Icon from 'react-native-vector-icons/AntDesign'

import style from './styles'

import api from '../../api'

function EmptyList() {
    return (
        <View style={{width: '100%', alignItems: 'center', marginTop: 50}} >
            <Text style={style.description} >Sem lugares para aprovar</Text>
        </View>
    )
}

export default () => {

    const [places, setPlaces] = useState([])

    useEffect(() => {
        getPlacesToApprove();
    }, [])

    async function getPlacesToApprove() {
        try {
            const res = await api.get("/place/toAprove")

            setPlaces(res.data);
        } catch (error) {
            if(error.response) alert(error.response.data.error)
            else alert("Erro ao buscar lugares")
        }
    }

    async function Approve(id) {
        try {
            const res = await api.put("/place/aprove", {id})

            alert("Aprovado");
            getPlacesToApprove();
        }catch (error) {
            if(error.response) alert(error.response.data.error)
            else alert("Erro ao aprovar")
        }
    }

    async function Exclude(id) {
        try {
            const res = await api.delete(`/place/delete/${id}`)

            getPlacesToApprove();
        } catch (error) {
            if(error.response) alert(error.response.data.error)
            else alert("Erro ao deletar")
        }
    }
    

    return (
        
        <SafeAreaView style={style.container} >

            <Text style={style.headerText} >Aprovar Lugares</Text>

            <FlatList 
                data={places}
                keyExtractor={(item, index) => index.toString()}
                style={{width:'100%'}}
                ListEmptyComponent={EmptyList}
                renderItem={({ item }) => 
                <View style={style.item} >
                    <Text style={style.title} >{item.title}</Text>
                    <Text style={style.description} >{item.description}</Text>
                    <View style={style.buttons} >
                        <Icon name="check" size={30} color='#0f0' onPress={() => Approve(item._id)} />
                        <Icon name="close" size={30} color='#f00' onPress={() => Exclude(item._id)} />
                    </View>
                </View>
                }
            />
        </SafeAreaView>
    )
}
