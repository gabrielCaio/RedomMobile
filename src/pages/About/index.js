import React from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'

import logo from '../../assets/TelaInicialLogo.png'

const t = "A rede de compartilhamento para pessoas de uma mesma localidade"
const d = "Com o Redom fica muito mais simples descobrir o que acontece ao seu redor. Encontre locais e eventos; Fique ciente do que acontece ao seu redor e conheça pessoas novas na sua vizinhança."

export default () => {
    return (
        <View style={style.container} >
            <Image source={logo} style={{width: '100%', height: '50%'}} />

            <View style={style.textArea} >
                <Text style={style.title} >{t}</Text>
                <Text style={style.description} >{d}</Text>
                {/* <TouchableOpacity style={style.next} >
                    <Text style={style.text} >Próximo</Text>
                </TouchableOpacity> */}
            </View>
        </View>
    )
}



const style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#262626',
    },
    textArea: {
        flex: 1,
        padding: 20
    },
    title: {
        fontFamily: 'Domine_400Regular',
        color: '#f2f2f2',
        fontWeight: 'bold',
        fontSize: 22,
        textAlign: 'left',
    },
    description: {
        fontFamily: 'Domine_400Regular',
        textAlign: 'justify',
        color: '#f2f2f2',
        marginVertical: 20
    },
    next: {
        padding: 10,
        alignItems: 'flex-start',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 20,
        right: 10
    },
    text: {
        color: "#f2f2f2",
        fontFamily: "Domine_400Regular"
    }
})
