import React from 'react'
import { View, StyleSheet, Text } from 'react-native'

export default ({ color, title, press }) => {
    return (
        <View style={style.container(color)} >
            <Text style={style.text} onPress={press} >{title}</Text>
        </View>
    )
}

const style = StyleSheet.create({
    container: color => ({
        padding: 10,
        height: 25,
        backgroundColor: color,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 5
    }),
    text: {
        color: '#f2f2f2',
        fontFamily: 'Domine_400Regular',
        fontWeight: 'bold'
    }
})