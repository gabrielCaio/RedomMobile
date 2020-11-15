import React, { useState, useEffect, useCallback, useContext } from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native'

import Icon2 from 'react-native-vector-icons/MaterialIcons'
import NewsIcon from 'react-native-vector-icons/FontAwesome'
import noAvatar from '../../../assets/noAvatar.png'

import { useNavigation } from '@react-navigation/native'
// import { UserContext } from '../../../contexts/userContext'

// import api from '../../../api'


export default ({ item, showMore, type}) => {
    // const [like, setLike] = useState(0)
    // const [disable, setDisable] = useState(false)
    const [show, setShow] = useState(false)
    const [commentButtonDisable, setCommentButtonDisable] = useState(false)

    // const { state } = useContext(UserContext)

    const navigation = useNavigation()

    // useEffect(() => {
    //     setLike(item.numLikes)
    // }, [])

    // async function handleLike() {
    //     try {
    //         if(!disable) {
    //             setDisable(true)
    //             const res = await api.post(`/post/like/${item._id}`, {})
    //             setLike(res.data.numLikes)
    //         }
    //     } catch (error) {
    //         if(error.response) return
    //         else alert('Erro ao dar like')
    //     }
    // }

    // async function handleDislike() {
    //     try {
    //         if(!disable) {
    //             setDisable(true)
    //             const res = await api.post(`/post/dislike/${item._id}`, {})
    //             setLike(res.data.numLikes)
    //         }
    //     } catch (error) {
    //         if(error.response) return
    //         else alert('Erro ao dar dislike')
    //     }
    // }

    function handleAvatarPress() {
        const user = item.user._id
        navigation.navigate("SeeProfile", {user})
    }

    function handleDescriptionPress() {
        setShow(!show);
    }

    function handleCommentButton() {
        setCommentButtonDisable(true)
        showMore()
        setCommentButtonDisable(false)
    }

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

    const utcToLocal = useCallback((date) => {
        let d = new Date(date)
        return d.toLocaleString()
    }, [])

    return (
        <View style={style.container} >

            <View style={style.header} >
                <TouchableOpacity onPress={handleAvatarPress} >
                    <Image 
                        source={item.user.avatar === undefined ? noAvatar : { uri: item.user.avatar.url} } 
                        style={style.avatar} 
                    />
                </TouchableOpacity>
                <View>
                    <Text style={style.name} onPress={handleAvatarPress} >{item.user.name}</Text>
                    <Text style={style.place} onPress={handleAvatarPress} >
                        {item.place ? item.place.title : utcToLocal(item.createdAt)}
                    </Text>
                </View>
                {type === 0 && <Icon2 name='camera' size={20} color='#f2f2f2' style={style.icon} />}
                {type === 1 && <NewsIcon name='newspaper-o' size={20} color='#f2f2f2' style={style.icon} />}
            </View>

            <TouchableOpacity style={style.description} onPress={handleDescriptionPress} >
                {!show && <Text style={style.descriptionText} >{truncateStr(item.description, 76)}</Text>}
                {show && <Text style={style.descriptionText} >{item.description}</Text>}
            </TouchableOpacity>

            <Image style={style.post} source={{ uri: item.image.url}} />

            {/* {type === 0 && 
                <View style={style.footer}>
                    <TouchableOpacity onPress={handleLike} disabled={disable} >
                        <Icon2 name='call-made' size={25} color={item.like.includes(state.id) ? "#0f0" : "#0ffff02"} />
                    </TouchableOpacity>

                    <Text style={style.footerText} >{like}</Text>

                    <TouchableOpacity disabled={disable} onPress={handleDislike} style={style.dislike} >
                        <Icon2 name='call-received' size={25} color={item.dislike.includes(state.id) ? "#f00" : "#fff4"} />
                    </TouchableOpacity>

                    <TouchableOpacity  onPress={handleCommentButton} disabled={commentButtonDisable} >
                        <Icon2 name='comment' size={25} color="#f2f2f2" />
                    </TouchableOpacity>
                </View>
            } */}
            
            {type === 0 && 
                <View style={style.footer}>
                    <TouchableOpacity
                        style={{width: '100%', justifyContent: 'center', alignItems: 'center'}}
                        onPress={handleCommentButton} 
                        disabled={commentButtonDisable}  
                    >
                        <Text style={{color: '#f2f2f2', fontFamily: 'Domine_400Regular'}}>Comentários...</Text>
                    </TouchableOpacity>
                </View>
            }
        </View>
    )
}

const style = StyleSheet.create({
    container: {
        width: "100%",
        backgroundColor: "#003B4C80",
        marginVertical: 10,
        borderRadius: 8,
    },
    header: {
        margin: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatar: {
        width: 40,
        borderRadius: 40,
        height: 40,
        marginRight: 10,
    },
    icon: {
        position: 'absolute',
        top: 10,
        right: 10,
    },
    post: {
        width: '100%',
        height: Dimensions.get('window').height * 0.75,
        marginBottom: 10,
        resizeMode: "cover",
    },
    name: {
        color: "#fff",
        fontSize: 14,
        fontFamily: "Domine_700Bold",
        fontWeight: 'bold',
    },
    place: {
        color: "#bbddf2",
        fontSize: 12,
        fontFamily: "Domine_400Regular",
        opacity: 0.7,
    },
    description: {
        width: '100%',
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingHorizontal: 10,
    },
    descriptionText: {
        color: "#f2f2f2",
        marginBottom: 20,
        textAlign: 'left',
        fontFamily: 'Domine_400Regular',
        fontSize: 13,
    },
    footer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
        padding: 5
    },
    footerText: {
        color: "#f2f2f2",
        fontSize: 14,
        marginLeft: -40,
    },
    dislike: {
        transform: [{ rotate: "270deg" }]
    },
})
