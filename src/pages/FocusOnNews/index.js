import React, { useState } from 'react'
import { SafeAreaView ,View, Text, Image, ImageBackground, TouchableOpacity } from 'react-native'

import style from './style.js'


export default ({ route }) => {

    const [show, setShow] = useState(true)

    const data = route.params.item

    function screenPress() {
        setShow(old => !old)
    }

    return (
        <SafeAreaView style={style.container} >
            <TouchableOpacity onPress={screenPress} >
                <ImageBackground source={{uri: data.image.url}} style={style.image} >
                    {show && (
                        <View style={style.descriptionArea} >
                            <Image source={{uri: data.user.avatar.url}} style={style.avatar} />
                            <Text style={style.name} >{data.user.name}</Text>
                            <Text style={style.description} >{data.description}</Text>
                        </View>
                    )}
                </ImageBackground>
            </TouchableOpacity>
        </SafeAreaView>
    )
}
