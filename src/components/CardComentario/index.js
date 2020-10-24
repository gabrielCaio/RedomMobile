import React from 'react'
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native'

import Perfil from '../../assets/perfil.png'

import Stars from '../../components/Stars'

const CommentSample = 'Ótimo lugar adorei, comida boa e com o fino do tempero certamente voltarei, Recomendo!'

export default () => {
    return (
        <View style={style.card}>
            <Image source={Perfil} style={style.avatar} />
            <Text style={style.horarioText} >Jéssica Souza</Text>
            <Stars />
            <View style={style.tagProfile} >
                <Text style={style.tag}>Top do Fino</Text>
            </View>
            <Text style={style.cardDescription} >{CommentSample}</Text>
        </View>
    )
}

const style = StyleSheet.create({
    card: {
        width: Dimensions.get('window').width - 20,
        backgroundColor: '#d9d9d9',
        borderRadius: 5,
        alignItems: "center",
        justifyContent: 'center',
        padding: 15,
    },
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 60
    },
    horarioText: {
        fontSize: 20,
        color: '#262626'
    },
    tagProfile: {
        padding: 10,
        height: 20,
        backgroundColor: '#f00',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        marginBottom: 10,
    },
    tag: {
        fontSize: 12,
        textAlign: 'center'
    },
    cardDescription: {
        color: '#8c8c8c',
        fontSize: 18,
        textAlign: 'center'
    },
})