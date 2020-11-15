import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'

export default ({ stars, size }) => {
    let s = [0, 0, 0, 0, 0];
    let floor = Math.floor(stars);
    let left = stars - floor;

    for(var i=0;i<floor;i++) {
    s[i] = 2;
    }

    if(left > 0) {
    s[i] = 1;
    }

    return (
        <View style={style.cardStar} >
            {s.map((i, k)=>(
                <View key={k}>
                    {i === 0 && <Icon name='star-border' size={size ? size : 15} color="#F2C94C" />}
                    {i === 1 && <Icon name='star-half' size={size ? size : 15} color="#F2C94C" />}
                    {i === 2 && <Icon name='star' size={size ? size : 15} color="#F2C94C" />}
                </View>
            ))}
            <Text style={style.rating} >{stars}</Text>
        </View>
    )
}

const style = StyleSheet.create({
    cardStar: {
        flexDirection: "row",
        alignItems: 'center'
    },
    rating: {
        color: '#f2f2f2',
        fontSize: 12,
        marginLeft: 5,
        opacity: 0.8,
    }
})