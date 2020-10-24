import React from 'react'
import { View, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'

export default () => {
    return (
        <View style={style.cardStar} >
            <Icon name='star' size={15} color="#6d6d6d" />
            <Icon name='star' size={15} color="#6d6d6d" />
            <Icon name='star' size={15} color="#6d6d6d" />
            <Icon name='star' size={15} color="#6d6d6d" />
            <Icon name='star' size={15} color="#6d6d6d" />
        </View>
    )
}

const style = StyleSheet.create({
    cardStar: {
        flexDirection: "row",
        alignItems: 'center'
    },
})