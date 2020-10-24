import React, { useContext } from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { StatusBar } from 'expo-status-bar'
import AsyncStorage from '@react-native-community/async-storage'

import { UserContext } from '../../contexts/userContext'

import Icon from 'react-native-vector-icons/MaterialIcons'

import style from './styles'

// Test Avatar
import Avatar from '../../assets/perfil.png'

// Colors definition of Linear Gradient
const gradient = ['rgba(255,255,255,0.8)', 'rgba(0,0,0,1)']


export default ({ navigation }) => {

    // Getting user data from Context
    const { state, dispatch } = useContext(UserContext);

    // Function to handle edit profile button press
    const handleEdit = () => {
        navigation.navigate('EditProfile');
    }

    // Function to handle logout button press
    const handleLogout = async () => {
        try{
            dispatch({type: "clear"})
            await AsyncStorage.clear();
            alert("Deslogado com sucesso!");
            navigation.reset({
                routes:[{name:'SignIn'}]
            });
        }catch(erro) {
            alert("Erro ao deslogar");
        }
    }

    return (
        <View style={style.container} >

            {/* // Status bar definition */}
            <StatusBar style='dark' />

            {/* ---------- Starts LinearGradient Component ------------ */}
            <LinearGradient colors={gradient} style={style.gradient}>

                <View style={style.imageArea} >
                    <Image source={Avatar} style={style.avatar} />
                    <View style={style.editView} >
                        <TouchableOpacity style={style.editButton} onPress={handleEdit} >
                            <Icon name='edit' size={24} color='#f2f2f2' />
                        </TouchableOpacity>
                    </View>
                </View>


                <View style={style.header} >
                    <Text style={style.headerText} >Ranking:</Text>
                    <Text style={style.headerText} >59 lugares</Text>
                    <View style={style.tag} >
                        <Text style={style.tagText} >Mestre Saideiro</Text>
                    </View>
                </View>


                <Text style={style.infoBold} >Nome</Text>
                <Text style={style.info} >{state.nome}</Text>

                <Text style={style.infoBold} >Username</Text>
                <Text style={style.info} >{state.username}</Text>

                <Text style={style.infoBold} >Email</Text>
                <Text style={style.info} >{state.email}</Text>
                

                <View style={style.buttonArea}>
                    <TouchableOpacity style={style.logoutButton}  onPress={handleLogout}>
                        <Icon name='power-settings-new' size={20} color="#f2f2f2" style={{marginRight: 10}} />
                        <Text style={style.info} >Desconectar</Text>
                    </TouchableOpacity>
                </View>


            </LinearGradient>
            {/* ---------> LinearGradient ends here */}
        </View>
    )
}