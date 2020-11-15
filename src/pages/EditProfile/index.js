import React, { useState, useContext } from 'react'
import { View, Text, TouchableOpacity, ImageBackground, Platform, ActivityIndicator } from 'react-native'
import * as ImagePicker from 'expo-image-picker'

import { useNavigation } from '@react-navigation/native'

import { UserContext } from '../../contexts/userContext'

// Icons
import Icon from 'react-native-vector-icons/FontAwesome5'
import BackIcon from 'react-native-vector-icons/MaterialIcons'

// StyleSheet
import style from './styles'

import api from '../../api'

// Components
import Input from '../../components/Input'

// Assets
import noAvatar from '../../assets/noAvatar.png'


export default () => {

    const navigation = useNavigation()

    const [name, setName] = useState('')
    const [loading, setLoading] = useState(false)
    const [avatar, setAvatar] = useState(null)
    const [banner, setBanner] = useState(null)

    const { state, dispatch } = useContext(UserContext)

    async function avatarPress() {
        const res = await getPermission();
        res ? pickImage('avatar') : alert("Nós precisamos dessa permissão para alterar a foto de perfil")
    }

    async function bannerPress() {
        const res = await getPermission();
        res ? pickImage() : alert("Nós precisamos dessa permissão para alterar a foto da capa")
    }

    async function confirmButton() {
        setLoading(true);
        await updateProfile()
        setLoading(false);
        alert("Alterações feitas com sucesso")
        navigation.goBack();
    }

    function cancelButton() {
        navigation.goBack()
    }

    async function uploadImage (image, type){
        try {
                const filename = image.substring(image.lastIndexOf('/') + 1)

                const formData = new FormData();

                formData.append("file", {
                    uri: image,
                    type: "image/jpeg",
                    type: "image/png",
                    name: filename,
                });

                const res = await api.post(`/image/${type}`, formData);

                if(type === 'avatar') {
                    dispatch({
                        type: "setAvatar",
                        payload: {
                            avatar: res.data.image.url
                        }
                    })
                }
                if(type === 'banner') {
                    dispatch({
                        type: "setBanner",
                        payload: {
                            banner: res.data.image.url
                        }
                    })
                }
        } catch (error) {
            if(error.response) alert(error.response.data.error)
            else alert("Falha na alteração do perfil")
        }
    }

    async function getPermission () {
        if (Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
            if (status !== 'granted') {
                return false
            }
            else return true
        }
    };

    async function pickImage(type) {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [9, 9],
          quality: 1,
        });
    
        if (!result.cancelled) {
          if(type === 'avatar') setAvatar(result.uri);
          else setBanner(result.uri)
        }
    };

    async function updateProfile() {
        try {
            if(avatar !== null) await uploadImage(avatar, 'avatar')
            if(banner !== null) await uploadImage(banner, 'banner')
            if(name !== "") {
                const res = await api.put("/user/updateSelf", {name: name})
                dispatch({
                    type: 'setNome',
                    payload: {
                        nome: res.data.name
                    }
                })
            }
        } catch (error) {
            console.log(error.response.data.error)
        }
    }

    // Here Starts the JSX
    return (
        <View style={style.container} >

            {loading && (
                <View style={{width:'100%',height:'100%',alignItems:'center',justifyContent:'center'}} >
                    <ActivityIndicator size='large' color="#f2f2f2" />
                </View>
            )}

            <View style={{width: '100%', alignItems: 'center',position:'absolute', top:20}} >
                <Text style={style.headerText} >Editar Perfil</Text>
            </View>

            <View style={style.bannerArea} >
                    <ImageBackground source={banner ? {uri:banner} : state.banner == '' ? noAvatar : {uri:state.banner}} style={style.banner} imageStyle={{opacity:0.2}} >

                        <Icon 
                            name="edit" 
                            size={20}
                            style={style.editBannerIcon} 
                            onPress={bannerPress} 
                            color="#f2f2f2" 
                        />

                        <ImageBackground source={avatar ? {uri:avatar} : state.avatar == '' ? noAvatar : {uri:state.avatar}} style={style.avatar} imageStyle={{borderRadius:20}} >
                            <Icon 
                                name="user-edit" 
                                size={25} 
                                style={style.editAvatarIcon} 
                                onPress={avatarPress} 
                                color="#f2f2f2" 
                            />
                        </ImageBackground>

                    </ImageBackground>
            </View>

            <View style={style.inputArea} >
                <Input 
                    backgroundColor='#f2f2f2'
                    placeholder="Nome..."
                    size={35}
                    radius={5}
                    value={name}
                    onChangeText={e=>setName(e)}
                    fontSize={14}
                />

                <View style={{width:'100%',marginVertical: 5}} />
            </View>

            <View style={style.buttonArea} >
                <TouchableOpacity onPress={confirmButton} style={style.confirmButton} >
                    <Text style={style.buttonText} >Salvar</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={cancelButton} style={style.cancelButton} >
                    <BackIcon size={20} name="arrow-back" color="#f2f2f2" style={{marginRight: 5}} />
                    <Text style={style.buttonText} >Cancelar</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}