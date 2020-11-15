import React from 'react'
import { StyleSheet, Text, View, Modal, FlatList, Image, Dimensions } from 'react-native'

import Icon from 'react-native-vector-icons/MaterialIcons'

import { StatusBar } from 'expo-status-bar'

import Perfil from '../../../assets/noAvatar.png'
import Stars from '../../../components/Stars'

import color from '../../../utils/colors'

export default ({ visible, close, reviews }) => {

    return (
        <Modal
            animationType='fade'
            visible={visible}
            transparent
            onRequestClose={close}
        >
            <View style={style.container} >
                <StatusBar style='light' backgroundColor="#262626" />

                <Text style={style.headerText} >Mais Reviews</Text>

                <FlatList 
                    data={reviews}
                    keyExtractor={(item, index) => index.toString()}
                    style={{width: '100%'}}
                    renderItem={({ item }) => 
                        <View style={style.cardContainer} >
                            <View style={style.avatarArea} >
                                <Image style={style.avatar} source={item.user.avatar ? {uri: item.user.avatar.url } : Perfil}  />
                                <View>
                                    <View style={{flexDirection:'row'}} >
                                        <Text style={style.name} >{item.user.name}</Text>
                                        <View style={style.tag} >
                                            <Text>{item.user.title}</Text>
                                        </View>
                                    </View>
                                    <View style={style.stars} >
                                        <Stars stars={item.stars} />
                                    </View>
                                </View>
                            </View>
                            <View style={style.reviewArea} >
                                <Text style={style.review} >{item.review}</Text>
                            </View>
                        </View>
                    }
                />

                <Icon 
                    name='arrow-back'
                    size={30}
                    color='#f2f2f2'
                    onPress={close}
                    style={style.arrowIcon}
                />

            </View>
        </Modal>
    )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: color.background,
        padding: 10
    },
    arrowIcon: {
        position: 'absolute',
        top: 20,
        left: 10
    },
    headerText: {
        fontSize: 18,
        fontFamily: "Domine_700Bold",
        fontWeight: 'bold',
        color: '#f2f2f2',
        marginVertical: 10,
        marginBottom: 20
    },
    cardContainer: {
        width: '100%',
        marginVertical: 20,
        backgroundColor: color.darkBlue,
        borderRadius: 5,
        padding: 10
    },
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 60
    },
    avatarArea: {
        flexDirection: 'row',
    },
    name: {
        color: '#f2f2f2',
        fontFamily: "Domine_700Bold",
        fontSize: 16,
        marginLeft: 5,
        marginRight: 10
    },
    tag: {
        paddingHorizontal: 5,
        backgroundColor: "#f2f2f2",
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    stars: {
        marginLeft: 5,
        marginTop: 5
    },
    review: {
        color: '#f2f2f2',
        textAlign: 'center',
        fontFamily: "Domine_400Regular",
        marginTop: 10,
    },
    reviewArea: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
})
