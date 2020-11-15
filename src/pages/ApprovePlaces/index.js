import React, { useEffect, useState } from 'react'
import { SafeAreaView, View, Text, ScrollView } from 'react-native'

import Icon from 'react-native-vector-icons/AntDesign'

import style from './styles'

import api from '../../api'

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
            <ScrollView style={{width: '100%'}} >
                {places.map(item => (
                    <View style={style.item} key={item._id} >
                        <Text>{item.title}</Text>
                        <Text>{item.description}</Text>
                        <View style={style.buttons} >
                            <Icon name="check" size={30} color='#0f0' onPress={() => Approve(item._id)} />
                            <Icon name="close" size={30} color='#f00' onPress={() => Exclude(item._id)} />
                        </View>
                    </View>
                ))}
            </ScrollView>
        </SafeAreaView>
    )
}
