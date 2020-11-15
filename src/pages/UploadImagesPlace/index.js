import React, { useState, useEffect } from 'react'
import { StyleSheet, Platform, SafeAreaView, ImageBackground, TouchableOpacity, Text, FlatList, ActivityIndicator } from 'react-native'
import * as ImagePicker from 'expo-image-picker';

import Icon from 'react-native-vector-icons/MaterialIcons'
import api from '../../api'
import color from '../../utils/colors'


export default ({ route, navigation }) => {
    const id = route.params.id

    // List of preview
    const [image, setImage] = useState([])
    const [loading, setLoading] = useState(false)
    const [leftImages, setLeftImages] = useState(5)
    const [uploading, setUploading] = useState(false)

    useEffect(() => {
        let isMounted = true
        const getNumImagesPlace = async () => {
            setLoading(true)
            const place = await api.get(`/place/getPlaceByIdWithoutImage/${id}`)

            let qnt = place.data.image.length
            
            if(qnt === 5) {
                alert("Lugar ja possui quantidade maxima de imagens")
                navigation.goBack();
            }else {
                setLeftImages(previous => previous - qnt)
                setLoading(false)
            }
        }
        if(isMounted) getNumImagesPlace();
        return () => { isMounted = false }
    }, [])

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
            setLeftImages(previous => previous - 1)
            setImage(old => [...old, result])
        }
    }

    async function handleUploadButton() {
        if(leftImages === 0) alert("Quantidade Máxima de imagens");
        else {
            const res = await getPermission()
            res ? pickImage() : alert("Precisamos dessa permissão para upar a imagem")
        }
    }

    async function upload (image) {
        try {
            const filename = image.uri.substring(image.uri.lastIndexOf('/') + 1)

            const formData = new FormData()

            formData.append("file", {
                uri: image.uri,
                type: "image/jpeg",
                type: "image/png",
                name: filename,
            });

            await api.put(`/place/uploadImages/${id}`, formData)

        } catch (error) {
            alert(error)
        }
    }

    function removeImage(index) {
        setLeftImages(previous => previous + 1)
        image.splice(index, 1)
    }

    async function uploadToAws() {
        setUploading(true)
        Promise.all(image.map(async (item) => {
            await upload(item)
        })).then(() => {
            setUploading(false)
            alert("Imagens subidas com sucesso!")
            navigation.goBack()
        })
        .catch((err) => {
            alert("Erro ao subir imagens")
            navigation.goBack()
        })
    }

    return (
        <SafeAreaView style={style.container} >
                <Text style={style.headerText} >Adicionar imagens</Text>

                {!loading && <Text style={style.leftImages} >Imagens Possiveis Restantes: {leftImages}</Text>}

                {!loading && <FlatList 
                    data={image}
                    extraData={image}
                    horizontal
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({item, index}) =>  
                        <TouchableOpacity style={style.preview} onPress={() => removeImage(index)} >
                            <ImageBackground style={style.preview} source={{ uri: item.uri }} imageStyle={{opacity:0.6, borderRadius: 10}} >
                                <Icon name="close" size={30} color="#f00" />
                            </ImageBackground>
                        </TouchableOpacity>
                    }
                    ListFooterComponent={
                        <TouchableOpacity onPress={handleUploadButton} style={style.button} >
                            <Icon name="add-to-photos" size={30} color="#f2f2f2" />
                        </TouchableOpacity>
                    }
                />}

                {loading && <ActivityIndicator size='large' color="#f2f2f2" />}

                {uploading && <ActivityIndicator size='large' color="#f2f2f2" />}

                <TouchableOpacity style={style.confirmButton} onPress={uploadToAws} >
                    <Text style={style.buttonText} >Subir Imagens</Text>
                </TouchableOpacity>

                <TouchableOpacity style={style.backIcon} onPress={() => navigation.goBack()} >
                    <Icon name="arrow-back" size={20} color="#000" />
                </TouchableOpacity>
        </SafeAreaView>
    )
}


const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.background,
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: 20,
    },
    headerText: {
        color: "#f2f2f2",
        fontFamily: 'Domine_700Bold',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: '50%'
    },
    preview: {
        width: 100,
        height: 100,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    backIcon: {
        position: 'absolute',
        top: 20,
        left: 10,
        width: 30,
        height: 30,
        borderRadius: 30,
        backgroundColor: '#f2f2f2',
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        width: 100,
        height: 100,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: color.darkBlue,
    },
    confirmButton: {
        width: '100%',
        height: 40,
        backgroundColor: '#0f0',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5
    },
    buttonText: {
        color: '#000',
        fontFamily: 'Domine_400Regular',
        fontSize: 14,
    },
    leftImages: {
        fontFamily: 'Domine_400Regular',
        color: '#f2f2f2',
        fontSize: 14
    },
})
