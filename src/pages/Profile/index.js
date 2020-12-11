import React, { useContext, useState, useEffect } from 'react'
import { View, Text, Image, TouchableOpacity, FlatList, ActivityIndicator, ImageBackground } from 'react-native'
import { StatusBar, setStatusBarHidden } from 'expo-status-bar'
import AsyncStorage from '@react-native-community/async-storage'

// Context
import { UserContext } from '../../contexts/userContext'

// Icons
import Icon2 from 'react-native-vector-icons/SimpleLineIcons'

// Stylesheet
import style from './styles'

// Test Avatar
import Avatar from '../../assets/noAvatar.png'

// API
import api from '../../api'

// Post Item
import PostItem from './components/PostItem'

// Modal
import ModalProfile from './components/ModalProfile'
import ModalMyReviews from './components/ModalMyReviews'

// Columns flatlist
const numColumns = 3

// Opacity Background Image --- Change Here
const obi = 0.2;

export default ({ navigation }) => {

    // Getting user data from Context
    const { state, dispatch } = useContext(UserContext);

    const [posts, setPosts] = useState([]);
    const [refresh, setRefresh] = useState(false)
    const [loading, setLoading] = useState(false)
    const [visible, setVisible] = useState(false)
    // const [myReviewsVisible, setMyReviewsVisible] = useState(false)

    // Getting posts of user on mount
    useEffect(() => {
        let isMounted = true
        setStatusBarHidden(true, true)
        setLoading(true)
        getPosts(isMounted, false)
        getNewData(isMounted)
        return () => { isMounted = false }
    }, []);

    // Get new user data after reload
    async function getNewData(isMounted) {
        try {
            const res = await api.post("/user/authenticate")

            if(isMounted) {
                dispatch({
                    type: 'update',
                    data: {
                        numPlaces: res.data.user.numPlaces,
                        numPosts: res.data.user.numPosts,
                        numReviews: res.data.user.numReviews
                    }
                })
    
                setRefresh(false)
                setLoading(false)
            }

        } catch (error) {
            alert("Erro ao pegar informações do usuário")
        }
    }

    // This function get the posts of user and sets on array
    async function getPosts (isMounted, reload) {
        try {
            const res = await api.get('/post/listPostsSelf')

            if(isMounted) {
                setPosts(res.data)

                if(reload) {
                    setRefresh(false)
                    setLoading(false)
                }
            }
        } catch (error) {
            if(error.response) alert(error.response.data.error)
            else alert("Erro ao buscar posts")
        }
    }

    // Function to handle edit profile button press
    const handleEdit = () => {
        closeModal()
        navigation.navigate('EditProfile')
    }

    // Function to Logout the user
    const handleLogout = async () => {
        try{
            await AsyncStorage.clear()
            await dispatch({
                type: 'clear'
            })
            closeModal()
            alert("Deslogado com sucesso!")
            navigation.reset({
                routes:[{name:'SignIn'}]
            });
        }catch(erro) {
            alert("Erro ao deslogar")
        }
    }

    // Redirects, if user is admin, to approve places page
    function handleRedirectToAdminPage() {
        closeModal()
        navigation.navigate("ApprovePlaces")
    }

    // Redirect user to my places
    function handleRedirectToMyPlaces() {
        closeModal()
        navigation.navigate("MyPlaces")
    }

    // close Modal
    function closeModal() {
        setVisible(false)
    }

    // Refresh page
    function onRefresh() {
        setRefresh(true);
        getPosts(true, false);
        getNewData(true);
    }

    function redirectToUpdates() {
        setVisible(false)
        navigation.navigate("Updates")
    }

    return (
        <View style={style.container} >
            <StatusBar style='light' />

            <ModalProfile 
                visible={visible}
                close={closeModal}
                admin={state.role === 'admin'}
                approvePlaces={handleRedirectToAdminPage}
                logout={handleLogout}
                about={redirectToUpdates}
                editProfile={handleEdit}
            />

            {/* {myReviewsVisible && 
                <ModalMyReviews
                    visible={myReviewsVisible}
                    close={()=>setMyReviewsVisible(false)}
                />
            } */}


            <View style={style.headerView} >
                <Text style={style.headerText} >Perfil</Text>
            </View>

            <View style={style.bannerArea} >
                    <ImageBackground source={state.banner ? {uri:state.banner} : Avatar} style={style.banner} imageStyle={{opacity:obi}} >
                        <Image source={state.avatar ? {uri:state.avatar} : Avatar} style={style.avatar} />
                        <Text style={style.name} >{state.nome}</Text>
                    </ImageBackground>
                    {/* <View style={style.titleArea} >
                        <Text style={style.title} >{state.title}</Text>
                    </View> */}
            </View>

            <View style={style.infoArea} >

                <TouchableOpacity style={style.infoItem}  onPress={handleRedirectToMyPlaces}>
                    <Text style={style.info} >{state.numPlaces}</Text>
                    <Text style={style.info} >Lugares</Text>
                </TouchableOpacity>

                <View style={{width:1,height:'40%',backgroundColor:"#f2f2f2"}} />

                <TouchableOpacity style={style.infoItem} onPress={()=>{}} >
                    <Text style={style.info} >{state.numReviews}</Text>
                    <Text style={style.info} >Reviews</Text>
                </TouchableOpacity>

                <View style={{width:1,height:'40%',backgroundColor:"#f2f2f2"}} />

                <View style={style.infoItem} >
                    <Text style={style.info} >{state.numPosts}</Text>
                    <Text style={style.info} >Posts</Text>
                </View>
                
            </View>


            <TouchableOpacity style={style.optionsIcon}  onPress={() => setVisible(true)}>
                <Icon2 name='options-vertical' size={20} color="#f2f2f2"  />
            </TouchableOpacity>

            {loading && (
                <View style={style.loading} >
                    <ActivityIndicator size='large' color='#f2f2f2' />
                </View>
            )}

            {!loading &&
                <FlatList
                    data={posts}
                    keyExtractor={(item, index) => index.toString()}
                    numColumns={numColumns}
                    refreshing={refresh}
                    onRefresh={() => onRefresh()}
                    renderItem={({ item }) => <PostItem item={item} refresh={onRefresh} canDelete={true} />}
                    style={{ marginBottom: 40 }}
                />
            }
        </View>
    )
}