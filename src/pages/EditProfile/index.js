import React from 'react'
import { View, Text, Image } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { StatusBar } from 'expo-status-bar'
import { TouchableOpacity } from 'react-native-gesture-handler'

import style from './styles'

import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons'

import Input from '../../components/Input'

import Avatar from '../../assets/perfil.png'

const gradient = ['rgba(255,255,255,0.8)', 'rgba(0,0,0,1)']

export default () => {

    const handleEdit = () => {
        alert('Editar Perfil');
    }

    return (
        <View style={style.container} >
            <StatusBar style='dark' />
            <LinearGradient colors={gradient} style={style.gradient}>

                <View style={style.imageArea} >
                    <Image source={Avatar} style={style.avatar} />
                    <View style={style.editView} >
                        <TouchableOpacity style={style.editButton} onPress={handleEdit} >
                            <Icon2 name='cloud-upload' size={24} color='#f2f2f2' />
                        </TouchableOpacity>
                    </View>
                </View>

                <Input
                    placeholder='Nome' 
                />

                <Input
                    placeholder='Email' 
                />

                <View style={style.botaoSalvar} >
                <TouchableOpacity>
                    <Text style={style.textBotaoSalvar} >Salvar</Text>
                </TouchableOpacity>
                </View>

            </LinearGradient>
        </View>
    )
}