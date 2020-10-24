import React, { useEffect, useContext } from 'react'
import { View, ActivityIndicator } from 'react-native'

import AsyncStorage from '@react-native-community/async-storage'
import { useNavigation } from '@react-navigation/native'

import { UserContext } from '../../contexts/userContext'
import api from '../../api'


export default () => {

    // Using dispatch as userDispatch from UserContext
    const { dispatch: userDispatch } = useContext(UserContext)

    // Declating navigation
    const navigation = useNavigation();

    // Call verifyToken function when component mounts
    useEffect(() => {
        verifyToken();
    }, [])

    // Async function to verify the token and 
    // if it exists authenticate user on api and save data o dispatch
    // else redirect user to SignIn page
    const verifyToken = async () => {
        try{
            // Gets token from AsyncStorage
            const token = await AsyncStorage.getItem("token");

            if(token) {
                // Calls api with authorization token and set userData on res
                const res = await api.post("/user/authenticate", {}, {
                    headers: { Authorization: `Bearer ${token}` }
                })

                //set userData on dispatch to use in context
                userDispatch({
                    type: "setDataUser",
                    data:{
                        nome: res.data.name,
                        email: res.data.email,
                        username: res.data.username,
                        role: res.data.roles,
                    }
                })

                //after set userData reset navigation to Home
                navigation.reset({ routes: [{name: "MainTab"}] })

            }else {
                // If user not have token redirect to SignInPage
                navigation.navigate("SignIn");
            }
        }catch(error) {

            // This if catch the error response of api, so use this to show error to user
            if(error.response) console.log(error.response.data.error);

            // This will be called if the above go wrong
            else console.log("Erro ao autenticar usuário");
        }
    }

    // Return loading screen while verify data
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: "center", backgroundColor: "#262626" }} >
            <ActivityIndicator size="large" color='#f2f2f2' />
        </View>
    )
}