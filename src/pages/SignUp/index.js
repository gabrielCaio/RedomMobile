import React, { useState } from 'react'
import { SafeAreaView, Text, StyleSheet, TouchableOpacity, View, ActivityIndicator } from 'react-native'

import Input from '../../components/Input'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Logo from '../../assets/svg/logoSvg'

import api from '../../api'

export default ({ navigation }) => {
    const [nome, setNome] = useState();
    const [email, setEmail] = useState();
    const [senha, setSenha] = useState();
    const [username, setUsername] = useState();
    const [loading, setLoading] = useState(false)

    async function handleCadastro() {
        try {
            setLoading(true);
            const res = await api.post("/user/register", {
                name: nome,
                email,
                password: senha,
                username
            })
            
            setLoading(false)
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
            <View style={{width:'100%',justifyContent:'center',alignItems:'center'}} >

                    {loading && <ActivityIndicator size='large' color="#f2f2f2" /> }

                    <View style={style.logoArea} >
                        <Logo width={60} height={60} />
                        <Text style={style.nome} >Redom</Text>
                    </View>

                    <View style={style.signUpIncdicatorArea} >
                        <Text style={style.signUpIndicator} >Cadastro</Text>
                    </View>

                    <Input 
                        placeholder="Nome" 
                        value={nome} 
                        onChangeText={e => setNome(e)} 
                        backgroundColor="#123b67"  
                        color="#f2f2f2"
                        fontSize={12}
                        size={50}
                    />
                    <Input 
                        placeholder="E-mail" 
                        value={email} 
                        onChangeText={e => setEmail(e)} 
                        backgroundColor="#123b67"  
                        color="#f2f2f2"
                        fontSize={12}
                        size={50}
                    />
                    <Input 
                        placeholder="Username" 
                        value={username} 
                        onChangeText={e => setUsername(e)} 
                        backgroundColor="#123b67"  
                        color="#f2f2f2"
                        fontSize={12}
                        size={50}
                    />
                    <Input 
                        placeholder="Senha" 
                        value={senha} 
                        onChangeText={e => setSenha(e)} 
                        backgroundColor="#123b67"  
                        color="#f2f2f2"
                        fontSize={12}
                        size={50}
                    />

                
                    <TouchableOpacity style={style.button} onPress={handleCadastro} >
                        <Text style={style.signUpText} >Cadastrar</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={style.login} onPress={handleRedirectSignIn} >
                        <Icon name="arrow-back" size={20} color="#f2f2f2" style={{marginRight:5}} />
                        <Text style={style.text} >Login</Text>
                    </TouchableOpacity>
                </View>
        </SafeAreaView>
    )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#001D25",
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: 20
    },
    text: {
        color: "#f2f2f2",
        fontSize: 12,
        fontFamily: 'Domine_400Regular',
    },
    button: {
        backgroundColor: "#00B9EC",
        width: '50%',
        alignItems: "center",
        justifyContent: 'center',
        marginTop: 30,
        padding: 10,
        borderRadius: 5
    },
    logoArea: {
        width: '100%',
        height: '25%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    login: {
        width: '40%',
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: 'center',
        padding: 10,
    },
    nome: {
        fontFamily: 'Domine_400Regular',
        color: '#f2f2f2',
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 5
    },
    signUpIndicator: {
        color: '#01A3D3',
        fontSize: 14,
    },
    signUpIncdicatorArea: {
        width: '100%',
        marginBottom: 10,
    },
    signUpText: {
        color: '#f2f2f2',
        fontSize: 14,
        fontWeight: 'bold',
    },

})