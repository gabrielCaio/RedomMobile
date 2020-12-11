import React, { useEffect, useContext, useState } from 'react'
import { ActivityIndicator, StyleSheet, SafeAreaView, Text } from 'react-native'

import AsyncStorage from '@react-native-community/async-storage'
import { useNavigation } from '@react-navigation/native'
import * as Location from 'expo-location'
import * as Permission from 'expo-permissions'

import { UserContext } from '../../contexts/userContext'
import api from '../../api'
import LogoSvg from '../../assets/svg/logoSvg'

import color from '../../utils/colors'


export default () => {

    const [error, setError] = useState(false)
    const { dispatch } = useContext(UserContext)
    const navigation = useNavigation()

    // Call verifyToken function when component mounts
    useEffect(() => {
        let isMounted = true
        if(isMounted) getLocation()
        return () => { isMounted = false }
    }, [])

    async function getLocation() {
        try {
            let {status} = await Permission.askAsync(Permission.LOCATION)
            if(status !== 'granted') {
                setError(true)
            }else verifyUser()

        } catch (error) {
            setError(true)
        }
    }


    async function verifyUser() {
        try{
            // Gets token from AsyncStorage
            const token = await AsyncStorage.getItem("token")
    
            if(token) {
                
                let location = await Location.getCurrentPositionAsync({})

                const res = await api.post("/user/authenticate", {})

                await AsyncStorage.setItem("token", res.data.token)
    
                //set userData on dispatch to use in context
                dispatch({
                    type: "preload",
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
                        title: res.data.user.title,
                        latitude: location.coords.latitude,
                        longitude: location.coords.longitude
                    }
                })
    
                //after set userData reset navigation to Home
                navigation.reset({ routes: [{name: "MainTab"}] })
    
            }else {
                // If user not have token redirect to SignInPage
                let location = await Location.getCurrentPositionAsync({})

                dispatch({
                    type: 'setUserLocation',
                    coords: {
                        latitude: location.coords.latitude,
                        longitude: location.coords.longitude
                    }
                })

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
            {!error && <ActivityIndicator size="large" color='#f2f2f2' />}
            {error && <Text style={style.text} >Precisamos dessa permissão para o aplicativo funcionar corretamente</Text>}
        </SafeAreaView>
    )
}

const style = StyleSheet.create({
    container: { 
        flex: 1, 
        alignItems: 'center', 
        justifyContent: "space-evenly", 
        backgroundColor: color.background,
    },
    text: {
        color: '#f2f2f2',
        fontFamily: 'Domine_400Regular',
        fontSize: 16,
        marginTop: '-40%',
        textAlign: 'center'
    },
})