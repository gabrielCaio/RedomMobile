import React, { useState } from 'react'
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity } from 'react-native'

import Input from '../../components/Input'

import api from '../../api'

export default ({ navigation }) => {
    const [nome, setNome] = useState();
    const [email, setEmail] = useState();
    const [senha, setSenha] = useState();
    const [username, setUsername] = useState();

    async function handleCadastro() {
        try {
            const res = await api.post("/user/register", {
                name: nome,
                email,
                password: senha,
                username
            })
    
            alert("Usuário Cadastrado com sucesso!");
    
            navigation.navigate("SignIn");
        } catch (error) {
            if(error.response) alert(error.response.data.error)
            else alert("Erro ao cadastrar")
        }
    }

    const handleRedirectSignIn = () => {
        navigation.navigate("SignIn");
    }

    return (
        <SafeAreaView style={style.container}>
           <Input placeholder="nome" value={nome} onChangeText={e => setNome(e)} />
           <Input placeholder="email" value={email} onChangeText={e => setEmail(e)} />
           <Input placeholder="senha" value={senha} onChangeText={e => setSenha(e)} />
           <Input placeholder="username" value={username} onChangeText={e => setUsername(e)} />

            <TouchableOpacity style={style.button} onPress={handleCadastro} >
                <Text style={style.text} >Cadastar</Text>
            </TouchableOpacity>

            <TouchableOpacity style={style.button} onPress={handleRedirectSignIn} >
                <Text style={style.text} >Ir para pagina de Login</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#262626",
        alignItems: 'center',
        justifyContent: "center",
        padding: 20
    },
    text: {
        color: "#f2f2f2",
        fontSize: 20
    },
    button: {
        backgroundColor: "#eb5757",
        width: '100%',
        alignItems: "center",
        marginTop: 30
    }
})