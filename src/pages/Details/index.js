import React, { useState, useEffect } from 'react'
import { 
    View, 
    Text, 
    Image, 
    ScrollView, 
    FlatList, 
    ActivityIndicator, 
    Dimensions, 
    SafeAreaView,
    TouchableOpacity
} from 'react-native'

import Icon from 'react-native-vector-icons/MaterialIcons'
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons'

import { setStatusBarHidden } from 'expo-status-bar'

import style from './style'

import Stars from '../../components/Stars'
import CardReview from '../../components/CardReview'
import Line from '../../components/Line'

import MoreReviews from  './components/MoreReviewsModal'
import CreateReviewModal from './components/CreateReviewModal'

import api from '../../api'

function Item (props) {
    return (
        <Image style={style.imagem} source={{uri: props.item.url}} />
    )
}

export default ({ navigation, route }) => {
    const { data } = route.params
    const images = data.image
    
    // ==================================== States =========================================//
    
    const [visible, setVisible] = useState(false);
    const [createReviewModalVisible, setcreateReviewModalVisible] = useState(false)
    const [haveImage, setHaveImage] = useState(true)
    const [haveReviews, setHaveReviews] = useState(true)
    const [reviews, setReviews] = useState([])
    const [previewReview, setPreviewReview] = useState([]);
    const [loading, setLoading] = useState(false)
    const [refresh, setRefresh] = useState(false)

    // =================================== Effects =========================================//

    useEffect(()=> {
        setLoading(true)
        if(images.length === 0) setHaveImage(false)
        getReviews()

        return setLoading(false)
    }, [refresh])

    useEffect(() => {
        let isMounted = true
        setStatusBarHidden(true, true)
        setLoading(true)
        if(images.length === 0) setHaveImage(false)
        getReviews(isMounted)

        return () => { isMounted = false }
    }, [])

    // ====================================== Functions ===================================== //

    async function getReviews(isMounted) {
        try {
            const res = await api.get(`/review/listReviewsPlace/${data._id}`) 

            if(isMounted) {
                setReviews(res.data)
                setPreviewReview(res.data.slice(0,4))
                if(res.data.length === 0) setHaveReviews(false)
                setLoading(false)
            }
        } catch (error) {
            if(error.response) alert(error.response.data.error)
            else alert("Erro ao bucar reviews")
        }
    }

    function handleArrowBack() {
        navigation.goBack();
    }

    function handleShowMorePress() {
        setVisible(true)
    }

    function handleCloseCreateReview() {
        setRefresh(!refresh)
        setcreateReviewModalVisible(false)
    }

    // ================================= Component ================================ //

    return (
    <SafeAreaView style={{flex: 1}} >
        <ScrollView style={style.scroll}>

            {loading && <ActivityIndicator size="large" color="#f2f2f2" style={{marginTop: '50%'}} />}
            {!loading && <View style={style.container} >

                {visible && 
                <MoreReviews 
                    visible={visible}
                    close={()=>setVisible(false)}
                    reviews={reviews}
                />}

                {createReviewModalVisible && 
                <CreateReviewModal 
                    visible={createReviewModalVisible}
                    close={handleCloseCreateReview}
                    place={data._id}
                />}


                {haveImage && <FlatList 
                    data={images}
                    horizontal
                    pagingEnabled
                    keyExtractor={item => item._id}
                    renderItem={Item}
                    style={{height: Dimensions.get('window').height * 0.8}}
                />}

                {!haveImage &&(
                    <View style={style.noImage} >
                        <Icon2 name="image-off" size={200} color="#f2f2f2" />
                    </View>   
                )}

                <TouchableOpacity style={style.backIcon} onPress={handleArrowBack} >
                    <Icon name="arrow-back"size={20} color="#000"  />
                </TouchableOpacity>

                <View style={style.containerCards} >

                    <View style={style.card} >
                        <Text style={style.cardTitle} >{data.title}</Text>
                        <Stars stars={data.rating} size={20} />
                        <Text style={style.cardDescription} >{data.description}</Text>
                    </View>

                    <Line />
                    
                    {haveReviews && 
                    <FlatList 
                        data={previewReview}
                        horizontal
                        pagingEnabled
                        keyExtractor={item => item._id}
                        renderItem={CardReview}
                        style={{height: "22%", width: '100%'}}
                    />
                    }

                    {haveReviews && (
                        <View style={{width:'100%'}} >

                            <TouchableOpacity style={{width:"100%"}} onPress={handleShowMorePress} >
                                <Text style={style.showMore} >Mostrar mais reviews</Text>
                            </TouchableOpacity>

                            <Line />
                        </View>
                    )}

                    {!haveReviews && (
                        <View>
                            <Text style={style.noReviewText} >Este lugar ainda não possui nemhuma review</Text>
                            <Line />
                        </View>
                    )}

                    <TouchableOpacity style={style.createReviewButton} onPress={()=>setcreateReviewModalVisible(true)} >
                        <Icon name="add-circle-outline" size={20} color="#bbddf2" />
                        <Text style={style.writeReview} >Escrever uma Review</Text>
                    </TouchableOpacity>

                    <View style={{width: "100%", marginBottom: 60}} />

                </View>
            </View>}
        </ScrollView>
    </SafeAreaView>
    
    )
}