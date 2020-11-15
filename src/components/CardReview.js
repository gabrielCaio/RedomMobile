import React from 'react'
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native'

import noAvatar from '../assets/noAvatar.png'
import Stars from './Stars'
import color from '../utils/colors'

export default (props) => {

    // this function truncates the title of the item
    function truncateStr(str, size){
        if (str==undefined || str=='undefined' || str =='' || size==undefined || size=='undefined' || size ==''){
            return str;
        }
         
        var shortText = str;
        if(str.length >= size+3){
            shortText = str.substring(0, size).concat('...');
        }
        return shortText;
    }

    return (
        <View style={style.card}>
            <View style={{justifyContent: 'flex-start', alignItems: 'center'}} >
                <Image 
                    source={props.item.user.avatar ? {uri: props.item.user.avatar.url } : noAvatar} 
                    style={style.avatar} 
                />
                <Text style={style.name} >{props.item.user.name}</Text>
                <View style={style.tagProfile} >
                    <Text style={style.tag}>{props.item.user.title}</Text>
                </View>
                <Stars stars={props.item.stars} />
            </View>
            <Text style={style.cardDescription} >{truncateStr(props.item.review, 100)}</Text>
        </View>
    )
}

const style = StyleSheet.create({
    card: {
        width: Dimensions.get('window').width - 20,
        backgroundColor: color.darkBlue,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: 'flex-start',
        paddingTop: 10,
        paddingHorizontal: 10
    },
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 60
    },
    name: {
        fontSize: 16,
        marginTop: 10,
        color: '#f2f2f2',
        fontFamily: "Domine_400Regular",
        marginBottom: 2
    },
    tagProfile: {
        padding: 10,
        height: 20,
        backgroundColor: '#f2f2f2',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        marginBottom: 4
    },
    tag: {
        fontSize: 12,
        textAlign: 'center',
        fontFamily: "Domine_400Regular",
    },
    cardDescription: {
        color: '#f2f2f2',
        fontSize: 15,
        textAlign: 'center',
        fontFamily: "Domine_400Regular",
        marginTop: 20
    },
})