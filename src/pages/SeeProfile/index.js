import React from 'react'
import { View, Text, ImageBackground, Image, FlatList, TouchableOpacity } from 'react-native'
import style from '../Profile/styles'

import Icon from 'react-native-vector-icons/MaterialIcons'
import noAvatar from '../../assets/noAvatar.png'
import api from '../../api'

import PostItem from '../Profile/components/PostItem'
import ModalReview from './components/ModalReview'
import ModalLugares from './components/ModalLugares'


const numColumns = 3
export default ({ route, navigation }) => {
    const { user } = route.params
    const [posts, setPosts] = React.useState([])
    const [userData, setUserData] = React.useState({
        name: "",
        numPlaces: 0,
        numPosts: 0,
        numReviews: 0,
        title: "",
        username: "",
        avatar: null,
        banner: null
    })

    const [modalReview, setModalReview] = React.useState(false)
    const [modalLugares, setModalLugares] = React.useState(false)

    React.useEffect(() => {
        let isMounted = true
        getInfo(isMounted);
        return () => { isMounted = false }
    }, [])

    async function getInfo(isMounted) {
        try {
            const res = await api.get(`/post/listPostsUser/${user}`)

            if(isMounted) {
                setUserData({
                    name: res.data.user.name,
                    numPlaces: res.data.user.numPlaces,
                    numPosts: res.data.user.numPosts,
                    numReviews: res.data.user.numReviews,
                    title: res.data.user.title,
                    username: res.data.user.username,
                    avatar: res.data.user.avatar ? res.data.user.avatar.url : null,
                    banner: res.data.user.banner ? res.data.user.banner.url : null
                })
                setPosts(res.data.posts)
            }
        } catch (error) {
            alert("Erro ao buscar informações")
        }
    }

    return (
        <View style={style.container} >
                
                <View style={style.bannerArea} >
                        <ImageBackground source={userData.banner ? {uri: userData.banner} : noAvatar} style={style.banner} imageStyle={{opacity:0.2}} >
                            <Image source={userData.avatar ? {uri: userData.avatar} : noAvatar} style={style.avatar} />
                            <Text style={style.name} >{userData.name}</Text>
                        </ImageBackground>
                </View>

                <View style={style.infoArea} >
                    <TouchableOpacity style={{alignItems:'center'}} onPress={() => setModalLugares(true)} >
                        <Text style={style.info} >{userData.numPlaces}</Text>
                        <Text style={style.info} >Lugares</Text>
                    </TouchableOpacity>
                    <View style={{width:1,height:'40%',backgroundColor:"#f2f2f2"}} />
                    <TouchableOpacity style={{alignItems:'center'}} onPress={() => setModalReview(true)} >
                        <Text style={style.info} >{userData.numReviews}</Text>
                        <Text style={style.info} >Reviews</Text>
                    </TouchableOpacity>
                    <View style={{width:1,height:'40%',backgroundColor:"#f2f2f2"}} />
                    <View style={{alignItems:'center'}} >
                        <Text style={style.info} >{userData.numPosts}</Text>
                        <Text style={style.info} >Posts</Text>
                    </View>
                </View>

                <Icon 
                    name="arrow-back" 
                    size={30} 
                    color="#f2f2f2" 
                    style={{position:'absolute',top:20,left:20}}
                    onPress={() => navigation.goBack()}
                />

                {modalLugares && 
                    <ModalLugares 
                        visible={modalLugares}
                        close={() => setModalLugares(false)}
                        user={user}
                    />
                }

                {modalReview && 
                    <ModalReview 
                        visible={modalReview}
                        close={() => setModalReview(false)}
                        user={user}
                    />
                }

                <FlatList
                    data={posts}
                    keyExtractor={(item, index) => index.toString()}
                    numColumns={numColumns}
                    renderItem={({ item }) => <PostItem item={item} canDelete={false} />}
                    style={{ marginBottom: 40 }}
                />

            </View>
    )
}
