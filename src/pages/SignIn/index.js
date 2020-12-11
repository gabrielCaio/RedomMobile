import React, { useState, useContext } from 'react'
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native'
import AsyncStorage from "@react-native-community/async-storage"

import { UserContext } from '../../contexts/userContext'

import api from '../../api'
import Input from '../../components/Input'
import Logo from '../../assets/svg/logoSvg'

export default ({ navigation }) => {

    // Using dispatch as userDispatch from UserContext
    const { dispatch: userDispatch } = useContext(UserContext)

    // Email field state
    const [email, setEmail] = useState("");

    // Password field state
    const [senha, setSenha] = useState("");

    // Set an loading indication while the app is loading
    const [loading, setLoading] = useState(false);

    // This function is called when the user press the login button
    // and alert if error, else take the user data from api and stores
    // the token in AsyncStorage then redirects the user to mainTab
    async function handleLogin() {
        try {
            setLoading(true);
            // Getting the response from api
            const res = await api.post("/user/login", {
                email,
                password: senha
            })

            // Saving token in Async Storage
            await AsyncStorage.setItem("token", res.data.token);
            // Saving user data in context
            await userDispatch({
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
            
            setLoading(false);

            // Reseting navigation to main tab
            navigation.navigate("MainTab")


        } catch (error) {
            setLoading(false)
            alert("Usuário não encontrado ou não existe")
        }
    }

    // This function redirects user to SignUp page
    function handleRedirectSignUpPage() {
        navigation.navigate("SignUp")
    }

    return (
        <SafeAreaView style={style.container}>

            <View style={style.logoArea} >
                <Logo width={60} height={60} />
                <Text style={{
                    fontFamily: 'Domine_400Regular',
                    color: '#f2f2f2',
                    fontSize: 20,
                    fontWeight: 'bold',
                    marginTop: 5
                }} >Redom</Text>
            </View>

            {loading && <ActivityIndicator size='large' color="#f2f2f2" />}

            <View style={style.inputArea} >

                <View style={style.loginIncdicatorArea} >
                    <Text style={style.loginIndicatior} >Login</Text>
                </View>

                <Input 
                    placeholder="E-mail" 
                    value={email} 
                    onChangeText={e => setEmail(e)}
                    backgroundColor="#123b67"  
                    color="#f2f2f2"
                    size={50}
                    fontSize={12}
                />
                <Input 
                    placeholder="Senha" 
                    value={senha} 
                    onChangeText={e => setSenha(e)}
                    backgroundColor="#123b67"  
                    color="#f2f2f2"
                    size={50}
                    fontSize={12}
                    password
                />
            </View>

            <View style={style.buttonArea} >
                <TouchableOpacity style={style.login} onPress={handleLogin} disabled={loading} >
                    <Text style={style.text} >Login</Text>
                </TouchableOpacity>

                <TouchableOpacity style={style.signUp} onPress={handleRedirectSignUpPage} disabled={loading} >
                    <Text style={style.signUpText} >Cadastre-se</Text>
                </TouchableOpacity>
            </View>

        </SafeAreaView>
    )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#001D25",
        alignItems: "center",
        justifyContent: 'flex-start',
        padding: 20
    },
    text: {
        color: "#f2f2f2",
        fontSize: 14,
        fontWeight: 'bold'
    },
    login: {
        width: "100%",
        backgroundColor: "#00B9EC",
        alignItems: "center",
        padding: 10,
        borderRadius: 5
    },
    signUp: {
        width: "100%",
        alignItems: "center",
        marginTop: 10,
        padding: 10,
    },
    signUpText: {
        fontFamily: 'Domine_400Regular',
        color: '#f2f2f2',
        fontSize: 12
    },
    loginIndicatior: {
        color: '#01A3D3',
        fontSize: 14,
    },
    loginIncdicatorArea: {
        width: '100%',
        marginBottom: 10
    },
    logoArea: {
        width: '100%',
        height: '25%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputArea: {
        width: '100%',
        height: '50%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonArea: {
        width: '50%',
        justifyContent: 'flex-start'
    },
})