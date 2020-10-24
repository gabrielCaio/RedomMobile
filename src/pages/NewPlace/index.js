import React, { useState } from 'react'
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native'

import Input from '../../components/Input'

export default ({ navigation, route }) => {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [address, setAddress] = useState("")

    const { lat, long } = route.params.data;

    function handleSend (){
        alert("Enviou")
    }

    function handleCancel (){
        navigation.goBack();
    }

    return (
        <View style={style.container} >

            <Input placeholder="Título" value={title} onChangeText={e => setTitle(e)} />
            <Input placeholder="Descrição" value={description} onChangeText={e => setDescription(e)} />
            <Input placeholder="Endereço" value={address} onChangeText={e => setAddress(e)} />

            <TouchableOpacity style={style.botao} onPress={handleSend} >
                <Text>Enviar solicitação</Text>
            </TouchableOpacity>

            <TouchableOpacity style={style.cancel} onPress={handleCancel} >
                <Text>Cancelar</Text>
            </TouchableOpacity>

        </View>
    )
}

const style = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#262626',
        flex: 1
    },
    texto: {
        color: '#f2f2f2',
        fontSize: 20
    },
    botao: {
        marginTop : 40,
        backgroundColor: "rgba(0,255,0, 0.8)",
        width: '100%',
        alignItems: 'center',
    },
    cancel: {
        marginTop : 40,
        backgroundColor: "#eb5757",
        width: '100%',
        alignItems: 'center', 
    }
})
