import React, { useEffect, useContext } from 'react'
import { ActivityIndicator, StyleSheet, SafeAreaView } from 'react-native'

import AsyncStorage from '@react-native-community/async-storage'
import { useNavigation } from '@react-navigation/native'

import { UserContext } from '../../contexts/userContext'
import api from '../../api'
import LogoSvg from '../../assets/svg/logoSvg'

import color from '../../utils/colors'


export default () => {

    // Using dispatch as userDispatch from UserContext
    const { dispatch } = useContext(UserContext)

    // Declating navigation
    const navigation = useNavigation();

    // Call verifyToken function when component mounts
    useEffect(() => {
        let isMounted = true
        if (isMounted) verifyUser()
        return () => { isMounted = false }
    }, [])

    // Verify user
    async function verifyUser() {
        try{
            // Gets token from AsyncStorage
            const token = await AsyncStorage.getItem("token");
    
            if(token) {
                // Calls api with authorization token and set userData on res
                const res = await api.post("/user/authenticate", {})

                await AsyncStorage.setItem("token", res.data.token);
    
                //set userData on dispatch to use in context
                dispatch({
                    type: "setDataUser",
                    data:{
                        id: res.data.user._id,
                        nome: res.data.user.name,
                        email: res.data.user.email,
                        username: res.data.user.username,
                        role: res.data.user.roles,
                        avatar: res.data.user.avatar ? res.data.user.avatar.url : "",
                        banner: res.data.user.banner ? res.data.user.banner.url : "",
                        numPosts: res.data.user.numPosts,
                        numReviews: res.data.user.numReviews,
                        numPlaces: res.data.user.numPlaces,
                        title: res.data.user.title
                    }
                })
    
                //after set userData reset navigation to Home
                navigation.reset({ routes: [{name: "MainTab"}] })
    
            }else {
                // If user not have token redirect to SignInPage
                navigation.reset({ routes: [{name: "SignIn"}] })
            }
        }catch(error) {
            navigation.reset({ routes: [{name: "SignIn"}] })
        }
    }

    // Return loading screen while verify data
    return (
        <SafeAreaView style={style.container} >
            <LogoSvg width={150} height={150} />
            <ActivityIndicator size="large" color='#f2f2f2' />
        </SafeAreaView>
    )
}

const style = StyleSheet.create({
    container: { 
        flex: 1, 
        alignItems: 'center', 
        justifyContent: "space-evenly", 
        backgroundColor: color.background,
    }
})