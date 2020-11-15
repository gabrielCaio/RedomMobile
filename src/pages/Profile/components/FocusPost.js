import React, { useState, useEffect, useCallback } from 'react'
import { View, Modal, StyleSheet, ImageBackground, TouchableWithoutFeedback, Text, ActivityIndicator, TouchableOpacity, FlatList } from 'react-native'

import Icon from 'react-native-vector-icons/Entypo'
import Icon2 from 'react-native-vector-icons/MaterialIcons'

import api from '../../../api'

export default ({ visible, close, image, id, canDelete, refresh, canLike, description }) => {

    const [focused, setFocused] = React.useState(true)
    const [loading, setLoading] = React.useState(false)

    async function deletePost() {
		try {
            setLoading(true)
			const res = await api.delete(`/post/delete/${id}`)
            alert(res.data.message);
            setLoading(false)
            refresh()
            close()
		} catch (error) {
			if(error.response) alert(error.response.data.error)
			else alert("Algo inesperado ocorreu")
		}
	}

    return (
        <Modal 
            animationType='fade'
            onRequestClose={close}
            visible={visible}
        >
            <TouchableWithoutFeedback style={style.container} onPress={()=>setFocused(!focused)} >
                <ImageBackground style={style.image} source={{uri: image}} >
                    {loading && <ActivityIndicator size='large' color='#eb5757' />}
                    {canDelete && <Icon name="trash" size={20} color="#eb5757" style={style.icon} onPress={deletePost} />}
                    
                    {focused && (
                        <View style={style.footer} >
                            <Text style={style.description} >{description}</Text>
                        </View>
                    )}

                    <TouchableOpacity onPress={close} style={style.backIcon} >
                        <Icon2 name='arrow-back' size={20} color='#000' />
                    </TouchableOpacity>
                </ImageBackground>
            </TouchableWithoutFeedback>
        </Modal>
    )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#262626"
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
        alignItems: 'center',
        justifyContent: 'center'
    },
    icon: {
        position: 'absolute',
        top: "5%",
        right: 10
    },
    backIcon: {
        position: 'absolute',
        top: "5%",
        left: 10,
        backgroundColor: '#f2f2f2',
        width: 30,
        height: 30,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    footer: {
        width: '100%',
        backgroundColor: '#262626',
        opacity: 0.8,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 20,
        padding: 10
    },
    description: {
        color: '#f2f2f2',
        fontFamily: 'Domine_400Regular',
        fontSize: 14,
        textAlign: "center"
    },
})