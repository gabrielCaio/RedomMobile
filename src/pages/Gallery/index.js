import React, { useEffect, useState, useContext, useRef, useCallback } from 'react'
import { View, SafeAreaView, FlatList, ActivityIndicator, Text, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import Camera from 'react-native-vector-icons/MaterialIcons'

import { UserContext } from '../../contexts/userContext'

import colors from '../../utils/colors'

import style from './styles'
import api from '../../api'

import Item from './components/GalleryItem'
import ShowMoreModal from './components/ShowMoreCommentsModal'

function EndPostsMessage({ active }) {
    if(!active) return null;
    return (
        <View style={{ width: '100%', alignItems: 'center' }} >
            <Text style={style.endPostsMessage} >Sem mais postagens</Text>
        </View>
    )
}

function Header({ headerPress, iconPress, type }) {
    return (
            <TouchableOpacity style={style.headerButton} onPress={headerPress} >
                    <Text style={style.headerText} >Feed</Text>

                    <TouchableOpacity style={{
                        width:30,height:30,alignItems: 'center',justifyContent: 'center',position:'absolute',
                        top: '20%',right: 10
                    }} onPress={iconPress} >
                        {type === 0 ? 
                            <Camera name="camera" size={20} color='#f2f2f2' />
                            :
                            <Icon name="newspaper-o" size={20} color="#f2f2f2" />
                        }
                    </TouchableOpacity>
            </TouchableOpacity>
    )
}

export default () => {

    //=================================== States ===================================//
    const [posts, setPosts] = useState([])
    const [news, setNews] = useState([])

    // type === 0 for posts, type === 1 for news
    const [type, setType] = useState(0)

    const [page, setPage] = useState(1)
    const [showMoreModal, setShowMoreModal] = useState(false)
    const [refresh, setRefresh] = useState(false)
    const [postId, setPostId] = useState("")
    const [loading, setLoading] = useState(false)
    const [end, setEnd] = useState(false)

    const { state, addRefreshFeed } = useContext(UserContext)

    const flatRef = useRef()

    //=============================== Refresh page ====================================//

    const onRefresh = useCallback(() => {
        setRefresh(true)
        setEnd(false)
        getPosts(true).then(() => setRefresh(false))
    }, [])

      //============================= Effect ==========================================//

    useEffect(() => {
        let isMounted = true
        setLoading(true)
        getPosts(isMounted)
        addRefreshFeed("refresh", onRefresh)
        return () => { isMounted = false }
    }, [])

    useEffect(() => {
        let isMounted = true;
        if(page !== 1 && !end) getMorePosts(isMounted)
        return () => { isMounted = false }
    }, [page])

    //============================== Functions ====================================//

    const getPosts = useCallback( async(isMounted) => {
        try {
            const post = await api.post("/post/nearUser", {
                latitude: state.latitude,
                longitude: state.longitude,
                dist: 20000,
                page: 1,
            })

            const res = await api.post('/news/nearUser', {
                latitude: state.latitude,
                longitude: state.longitude,
                dist: 30000
            })
            
            if(isMounted) {
                setPage(1)
                setPosts(post.data.docs)
                setNews(res.data)
                setLoading(false)
            }
        } catch (error) {
            if(error.response) alert(error.response.data.error)
            else alert("Erro ao coletar dados dos posts")
        }
    }, [])

    function showMore(data) {
        setPostId(data._id);
        setShowMoreModal(true)
    }

    function closeModal (){
        setShowMoreModal(false)
    }

    const headerPress = () => {
        flatRef.current?.scrollToOffset({
            y : 0,
            animated : true
        });
    }

    async function onEndReached() {
        if(!end) setLoading(true)
        setPage(previous => previous + 1)
    }

    async function getMorePosts(isMounted) {
        try {
            const res = await api.post("/post/nearUser", {
                latitude: state.latitude,
                longitude: state.longitude,
                dist: 20000,
                page,
            })

            if (res.data.docs.length === 0) {
                setLoading(false)
                setEnd(true)
            }
            else if(isMounted) {
                setPosts(previousPosts => [...previousPosts, ...res.data.docs])
                setLoading(false)
            }

        } catch (error) {
            alert("Erro ao buscar mais posts")
            console.log(error)
        }
    }

    function changeType() {
        if(type === 0) setType(1)
        else setType(0)
    }


    //========================== Here starts the jsx of the component :) ==============//
    return (
        <SafeAreaView style={style.container} >

            <Header headerPress={headerPress} iconPress={changeType} type={type} />
            
            <FlatList
                data={type === 0 ? posts : news}
                keyExtractor={(item, index) => index.toString()}
                style={{width: '100%', backgroundColor: colors.background}}     
                ref={flatRef}
                refreshing={refresh}
                onRefresh={onRefresh}
                onEndReached={onEndReached}
                onEndReachedThreshold={0.1}
                renderItem={({item}) =>
                    <Item 
                        item={item}
                        showMore={() => showMore(item)}
                        id={item._id}
                        type={type}
                    />
                }
                ListFooterComponent={<EndPostsMessage active={end} />}
            />

            {loading && <ActivityIndicator size='large' color="#f2f2f2" /> }

            {showMoreModal && <ShowMoreModal 
                close={closeModal}
                visible={showMoreModal}
                id={postId}
            />}

        </SafeAreaView>
    )
}

