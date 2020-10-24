import React, { useState, useEffect } from 'react'
import { View, Text, Image, ScrollView } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

import Icon from 'react-native-vector-icons/MaterialIcons'

import style from './style'

import Hamburger from '../../assets/hamburger.jpg'

import Stars from '../../components/Stars'
import CardComentario from '../../components/CardComentario'
import Line from '../../components/Line'


export default ({ navigation, route }) => {
    const [show, setShow] = useState(false);

    const { data } = route.params

    useEffect(() => {
    }, [])

    function handleArrowBack() {
        navigation.goBack();
    }

    return (
        <ScrollView style={style.scroll}>
            <View style={style.container} >

                <ScrollView horizontal pagingEnabled style={style.imageScroll} >
                    <Image source={data.image == [] ? { uri: data.image[0]  } : Hamburger } style={style.imagem} />
                    <Image source={data.image == [] ? { uri: data.image[1]  } : Hamburger } style={style.imagem} />
                    <Image source={data.image == [] ? { uri: data.image[2]  } : Hamburger } style={style.imagem} />
                </ScrollView>

                <Icon
                    name="arrow-back"
                    size={30} 
                    color="#f2f2f2" 
                    style={{position: 'absolute', top: 30, left: 10}}
                    onPress={handleArrowBack}
                />

                <View style={style.containerCards} >

                    <View style={style.card} >
                        <Text style={style.cardTitle} >{data.title}</Text>
                        <Stars />
                        <Text style={style.cardDescription} >{data.description}</Text>
                    </View>

                    <Line />
                    
                    {/* Card Horario de Atendimento */}
                    <View style={style.card} >
                        <Text style={style.horarioText} >Horário de Funcionamento</Text>
                        <TouchableOpacity onPress={() => setShow(!show)} >
                            {show && (
                                <View>
                                    <Text style={style.textoDia} >Segunda</Text>
                                    <Text style={style.textoHor} >08h ás 22h</Text>
                                    <Text style={style.textoDia} >Terça</Text>
                                    <Text style={style.textoHor} >08h ás 22h</Text>
                                    <Text style={style.textoDia} >Quarta</Text>
                                    <Text style={style.textoHor} >08h ás 22h</Text>
                                    <Text style={style.textoDia} >Quinta</Text>
                                    <Text style={style.textoHor} >08h ás 22h</Text>
                                    <Text style={style.textoDia} >Sexta</Text>
                                    <Text style={style.textoHor} >08h ás 22h</Text>
                                    <Text style={style.textoDia} >Sábado</Text>
                                    <Text style={style.textoHor} >08h ás 22h</Text>
                                    <Text style={style.textoDia} >Domingo</Text>
                                    <Text style={style.textoHor} >08h ás 22h</Text>
                                </View>
                            )}
                            <Text style={style.showHor} >{show ? 'Esconder' : 'Mostrar' }</Text>
                        </TouchableOpacity>
                    </View>
                    {/* ------------------------------------------------------------- */}

                    <Line />
                    
                    <ScrollView horizontal pagingEnabled style={style.scrollComment}>
                        <CardComentario />
                        <CardComentario />
                        <CardComentario />
                    </ScrollView>

                    <Text style={style.showMore} >Mostrar mais Comentarios</Text>
                    
                    <Line />

                </View>
            </View>
        </ScrollView>
    )
}