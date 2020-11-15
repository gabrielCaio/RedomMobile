import React from 'react'
import { Modal, View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import color from '../../../utils/colors'

export default ({ visible, close, all, news, places, colors }) => {

    return (
        <Modal
            animationType='fade'
            onRequestClose={close}
            visible={visible}
            transparent
        >
            <TouchableOpacity style={style.container} onPress={close} >
                <View style={style.modalContainer} >

                    <View style={style.headerArea} >
                        <Text style={style.headerText} >Filtros</Text>
                    </View>

                    <TouchableOpacity style={style.item} onPress={all} >
                        <Text style={style.itemAll(colors.one)} >Tudo</Text>
                    </TouchableOpacity>

                    <View style={{width: '80%', height: 0.5, backgroundColor: color.fontLight}} />

                    <TouchableOpacity style={style.item} onPress={news} >
                        <Text style={style.itemNews(colors.two)} >Notícias</Text>
                    </TouchableOpacity>

                    <View style={{width: '80%', height: 0.5, backgroundColor: color.fontLight}} />

                    <TouchableOpacity style={style.item} onPress={places} >
                        <Text style={style.itemPlace(colors.three)} >Lugares</Text>
                    </TouchableOpacity>

                </View>
            </TouchableOpacity>
        </Modal>
    )
}


const style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0006',
    },
    modalContainer: {
        backgroundColor: color.darkBlue,
        width: '80%',
        height: '40%',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    headerArea: {
        width: '100%',
        height: '20%',
        backgroundColor: color.background,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    headerText: {
        fontSize: 18,
        fontFamily: 'Domine_400Regular',
        color: '#f2f2f2',
        marginLeft: 20
    },
    item: {
        width: '100%',
        height: '25%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    itemAll: (cor) => ({
        color: cor,
        fontFamily: 'Domine_400Regular',
        fontSize: 18,
        marginVertical: 5
    }),
    itemPlace: (cor) => ({
        color: cor,
        fontFamily: 'Domine_400Regular',
        fontSize: 18,
        marginVertical: 5
    }),
    itemNews: (cor) => ({
        color: cor,
        fontFamily: 'Domine_400Regular',
        fontSize: 18,
        marginVertical: 5
    }),
})