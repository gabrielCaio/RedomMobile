import React, { useState, useContext } from 'react'
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import AsyncStorage from "@react-native-community/async-storage"

import { UserContext } from '../../contexts/userContext'

import api from '../../api'

import Input from '../../components/Input'

export default ({ navigation }) => {

    // Using dispatch as userDispatch from UserContext
    const { dispatch } = useContext(UserContext)

    // Email field state
    const [email, setEmail] = useState("");

    // Password field state
    const [senha, setSenha] = useState("");

    // This function is called when the user press the login button
    // and alert if error, else take the user data from api and stores
    // the token in AsyncStorage then redirects the user to mainTab
    async function handleLogin() {
        try {
            // Getting the response from api
            const res = await api.post("/user/login", {
                email,
                password: senha
            })
            
            // Saving token in Async Storage
            await AsyncStorage.setItem("token", res.data.token);

            // Saving user data in context
            dispatch({
                type: "setDataUser",
                data:{
                    nome: res.data.name,
                    email: res.data.email,
                    username: res.data.username,
                    role: res.data.roles,
                }
            })
            
            // Reseting navigation to main tab
            navigation.navigate("MainTab");


        } catch (error) {
            if(error.response) alert(error.response.data.error)
            alert("Erro ao logar");
        }
    }

    // This function redirects user to SignUp page
    function handleRedirectSignUpPage() {
        navigation.navigate("SignUp");
    }

    return (
        <SafeAreaView style={style.container}>

            <Input placeholder="email" value={email} onChangeText={e => setEmail(e)}  />
            <Input placeholder="senha" value={senha} onChangeText={e => setSenha(e)}  />

            <TouchableOpacity style={style.login} onPress={handleLogin} >
                <Text style={style.text} >Logar</Text>
            </TouchableOpacity>

            <TouchableOpacity style={style.login} onPress={handleRedirectSignUpPage} >
                <Text style={style.text} >Ir para tela de Cadastro</Text>
            </TouchableOpacity>

        </SafeAreaView>
    )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#262626",
        alignItems: "center",
        justifyContent: "center",
        padding: 20
    },
    text: {
        color: "#f2f2f2",
        fontSize: 20
    },
    login: {
        width: "100%",
        backgroundColor: "#f00",
        alignItems: "center",
        marginTop: 50,
    }
})