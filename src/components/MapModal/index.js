import React from 'react'
import { View, Text, Modal, StyleSheet, TouchableOpacity } from 'react-native'

export default ({ visible, onRequestClose, pressModal }) => {
    return(
        <Modal
            animationType='fade'
            visible={visible}
            onRequestClose={onRequestClose}
            transparent={true}
        >
            <TouchableOpacity onPress={pressModal} >
                <View style={style.container}>
                    <Text style={style.texto} >Clique no mapa para adicionar um marcador</Text>
                </View>
            </TouchableOpacity>
        </Modal>
    )
}

const style = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(242,242,242, 0.3)',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20
    },
    texto: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center'
    }
})