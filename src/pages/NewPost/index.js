import React, { useState, useContext } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Platform , Image, SafeAreaView, ActivityIndicator} from 'react-native'

import api from '../../api'
import Input from '../../components/Input'
import Icon2 from 'react-native-vector-icons/FontAwesome'
import * as ImagePicker from 'expo-image-picker'
import { UserContext } from '../../contexts/userContext'
import LocationModal from './components/setLocationModal'
import CameraIcon from 'react-native-vector-icons/MaterialIcons'

import colors from '../../utils/colors'


export default ({ navigation }) => {

    const [image, setImage] = useState(null)
    const [description, setDescription] = useState("")
    const [loading, setLoading] = useState(false)
    const [locationModal, setLocationModal] = useState(false)
    const [type, setType] = useState('post')

    const { refreshFeed } = useContext(UserContext)


    async function getPermission () {
        if (Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
            if (status !== 'granted') {
                return false
            }
            else return true
        }
    }

    async function pickImage() {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [9, 12],
          quality: 1,
        });
    
        if (!result.cancelled) {
          setImage(result.uri);
        }
    }

    async function handleUploadButton() {
        const res = await getPermission();
        res ? pickImage() : close()
    }

    async function createPostWithPlace(placeId){
        try {
            if(description !== '') {
                setLoading(true)
                const filename = image.substring(image.lastIndexOf('/') + 1)

                const formData = new FormData()

                formData.append("file", {
                    uri: image,
                    type: "image/jpeg",
                    type: "image/png",
                    name: filename,
                })

                formData.append("json", JSON.stringify({ description: description, place: placeId }))

                await api.post('/post/create', formData)
                resetState()

                alert("Post Criado com sucesso!")

                setLoading(false)
                if(refreshFeed.func) refreshFeed.func()
                navigation.navigate("Gallery")
            }else alert("O post deve ter uma descrição")
        } catch (error) {
            alert("Falha na criação do post")
            setLoading(false)
        }
    }

    async function createPostWithoutPlace(data){
        try {
            if(description !== '') {
                setLoading(true)
                const filename = image.substring(image.lastIndexOf('/') + 1)

                const formData = new FormData()

                formData.append("file", {
                    uri: image,
                    type: "image/jpeg",
                    type: "image/png",
                    name: filename,
                })

                formData.append("json", JSON.stringify({ 
                    description: description,
                    latitude: data.latitude,
                    longitude: data.longitude
                }))

                await api.post(`/post/create/`, formData)
                resetState()

                alert("Post Criado com sucesso!")

                setLoading(false)
                if(refreshFeed.func) refreshFeed.func()
                navigation.navigate("Gallery")
            }else alert("O post deve ter uma descrição")
        } catch (error) {
            alert("Falha na criação do post")
            setLoading(false)
        }
    }

    function handleCreatePostButton() {
        setLocationModal(true)
    }

    function handleCreatePostWithPlace(id) {
        setLocationModal(false)
        image == null ? alert("O post deve ter uma imagem") : createPostWithPlace(id)
    }

    function handleCreatePostWithoutPlace(data) {
        setLocationModal(false)
        image == null ? alert("O post deve ter uma imagem") : createPostWithoutPlace(data)
    }

    async function createNews(data) {
        try {
            if(description !== '') {
                setLoading(true)
                const filename = image.substring(image.lastIndexOf('/') + 1)

                const formData = new FormData()

                formData.append("file", {
                    uri: image,
                    type: "image/jpeg",
                    type: "image/png",
                    name: filename,
                })

                formData.append("json", JSON.stringify({
                    description: description,
                    latitude: data.latitude,
                    longitude: data.longitude,
                }))

                await api.post('/news/create', formData)

                resetState()
                alert("Notícia criada com sucesso!")
                setLoading(false)
                if(refreshFeed.func) refreshFeed.func()
                navigation.navigate("Gallery")
            }else alert("O post deve ter uma descrição")
        } catch (error) {
            alert("Erro ao criar notícia")
        }
    }

    function handleCreateNews(data) {
        setLocationModal(false)
        image == null ? alert("A noticia deve ter uma imagem") : createNews(data)
    }

    function resetState() {
        setImage(null)
        setDescription("")
    }

    return (
        <SafeAreaView style={style.container} >
                <Text style={style.headerText} >Nova Publicação</Text>

                {loading && <ActivityIndicator size="large" color="#f2f2f2" />}

                <View style={{width:'100%'}} >
                    <View style={style.previewArea} >
                        <TouchableOpacity style={style.uploadImageButton} onPress={handleUploadButton} >
                            {!image &&<Icon2 name="image" size={100} color="#f2f2f2" />}
                            {image && <Image source={{ uri: image }} style={style.preview} />}
                        </TouchableOpacity>
                    </View>

                    <Input 
                        placeholder="Descrição..." 
                        value={description} 
                        onChangeText={e => setDescription(e)} 
                        multiline={true}
                        size={70}
                        color="#f2f2f2"
                        fontSize={12}
                    />

                    {/* <TouchableOpacity style={style.addLocation} onPress={() => setLocationModal(true)} >
                        <Text style={style.addLocationText} >Adicionar localização</Text>
                    </TouchableOpacity> */}

                    <View style={{width:'100%', flexDirection:'row',justifyContent:'space-evenly',marginTop:50}} >
                        <TouchableOpacity 
                            onPress={() => setType('post')} 
                            style={style.postButton(type === 'post' ? colors.fontLight : colors.darkBlue)} 
                        >
                            <CameraIcon 
                                name="camera" size={20}
                                color="#f2f2f2"
                            />
                            <Text style={{color:'#fff',fontFamily: 'Domine_400Regular',fontSize:12}} >Post</Text>
                        </TouchableOpacity>

                        <TouchableOpacity 
                            onPress={() => setType('news')} 
                            style={style.postButton(type === 'news' ? colors.fontLight : colors.darkBlue)} 
                        >
                            <Icon2 
                                name="newspaper-o" 
                                size={20} color="#f2f2f2"
                            />
                            <Text style={{color:'#fff',fontFamily: 'Domine_400Regular',fontSize:12}} >Notícia</Text>
                        </TouchableOpacity>
                    </View>

                </View>


                <TouchableOpacity style={style.createPost} onPress={handleCreatePostButton} disabled={loading} >
                    <Text style={style.text} >Publicar</Text>
                </TouchableOpacity>

                {locationModal && 
                    <LocationModal 
                        visible={locationModal}
                        close={() => setLocationModal(false)}
                        createPostWithPlace={handleCreatePostWithPlace}
                        createPostWithoutPlace={handleCreatePostWithoutPlace}
                        createNews={handleCreateNews}
                        type={type}
                    />
                }
        </SafeAreaView>
    )
}

const style = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: colors.background,
        alignItems: 'center',
        justifyContent: 'space-evenly',
        padding: '10%'
    },
    headerText: {
        color: '#f2f2f2dd',
        fontSize: 18,
        fontFamily: "Domine_400Regular",
        fontWeight: "bold",
        marginBottom: 15,
        position: 'absolute',
        top: 20,
    },
    previewArea: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        height: '50%',
    },
    text: {
        color: '#f2f2f2',
        fontSize: 16,
        fontFamily: "Domine_400Regular",
    },
    postButton: (color) => ({
        padding: 10,
        backgroundColor: color,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'space-evenly',
        flexDirection: 'row',
        width: 110,
    }),
    createPost: {
        width: "100%",
        backgroundColor: colors.fontLight,
        alignItems: 'center',
        height: 40,
        justifyContent: 'center',
        position: 'absolute',
        bottom: 20,
        borderRadius: 3
    },
    uploadImageButton: {
        width: '100%',
        height: "100%",
        alignItems: 'center',
        justifyContent: 'center'
    },
    preview: {
        width: "100%",
        height: "100%",
        resizeMode: 'contain'
    },
    buttonCreate: {
        width:'100%',
        paddingHorizontal:10,
        marginTop: 30
    },
    addLocation: {
        width: '100%',
        alignItems: 'flex-start'
    },
    addLocationText: {
        color: '#f2f2f2',
        fontFamily: 'Domine_400Regular',
        marginLeft: 20,
        opacity: 0.7
    },
})
