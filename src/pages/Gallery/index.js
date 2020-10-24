import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView, Modal } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

import AsyncStorage from '@react-native-community/async-storage'

import { StatusBarHeight } from '../../utils/StatusBarTam'

// Image test
import img from '../../assets/hamburger.jpg'
import avatar from '../../assets/perfil.png'

// Import of tag component
import Tag from '../../components/Tag'

// Import Input
import Input from '../../components/Input'

// Api import
import api from '../../api'

// Item component, this is a post item, receive the item data and a function to add comment
function Item({ item, showMore }) {
    return (
        <View>
            <Container >
                <Img source={img} style={{resizeMode: 'cover'}} />
                <Avatar source={avatar} />
                <Container.title>{item.user.name}</Container.title>
                <Tag color="#eb5757" title="Topper demais" />
                <Container.comment>{item.description}</Container.comment>
            </Container>
            <Text style={style.commentPost} onPress={showMore} >Exibir mais</Text>
        </View>
    )
}

// Modal component of newPost
function NewPostModal ({ visible, close, value, onChangeText, createPost }){
    return (
        <Modal
            animationType="fade"
            visible={visible}
            transparent
            onRequestClose={close}
        >
            <View style={style.modalContainer} >
                <Input 
                    placeholder="Descrição" 
                    value={value} 
                    onChangeText={e => onChangeText(e)} 
                    multiline={true}
                    size={100}
                />

                <TouchableOpacity style={style.createPost} onPress={createPost} >
                    <Text>Criar Post</Text>
                </TouchableOpacity>
            </View>
        </Modal>
    )
}

// Modal to show more comments of post to user
// ************************************* Implementar id abaixo ****************************** //
function ShowMoreModal ({ visible, close, comments }){
    return (
        <Modal
            animationType="fade"
            visible={visible}
            transparent
            onRequestClose={close}
        >
            <ScrollView style={{ width: "100%", backgroundColor: "#f2f2f2" }} >
                <View style={{ width: "100%", alignItems: "center", justifyContent: 'center' }} >
                    {comments.map(item => (
                        <View key={item.id} style={{ marginBottom: 20 }} >
                            {/* Mudar id para ficar unico */}
                            <Text key={item.id} >Usuário: {item.user.name}</Text>
                            <Text key={item.id} >Comentário: {item.comment}</Text>
                        </View>
                    ))}
                </View>
            </ScrollView>
        </Modal>
    )
}

export default () => {

    // Array of posts to render
    const [posts, setPosts] = useState([]);

    // Sets if the new post modal is visible or not
    const [newPostModalVisible, setNewPostModalVisible] = useState(false);

    // Sets if the show more modal is visible
    const [showMoreModal, setShowMoreModal] = useState(false);

    // Sets post id to modal 
    const [comments, setComments] = useState([])

    // New post modal info
    const [newPostModalInfo, setNewPostModalInfo] = useState("");

    // When the component is opened, call the funciotn to get Posts and save on array
    useEffect(() => {
        getPosts();
    }, [])

    // This function call the api and set in the array of posts
    // if returns an error show to the user through alert *** Change this later
    async function getPosts (){
        try {
            const res = await api.get("/post/list");

            setPosts(res.data)
        } catch (error) {
            if(error.response) alert(error.response.data.error)
            else alert("Erro ao coletar dados dos posts")
        }
    }

    // This function is called when the user clicks on comment post
    async function showMore(data) {
        try{
            const res = await api.get(`/post/listComments/${data._id}`)

            setComments(res.data);

            setShowMoreModal(true)
        }catch(error) {
            if(error.response) alert(error.response.data.error)
            else alert("Erro ao exibir mais")
        }
    }

    // This function is called to make the user create a new post
    function handleNewPost (){
        setNewPostModalVisible(true)
    }

    // This function is called to close modal
    function closeModal (){
        setNewPostModalVisible(false);
        setShowMoreModal(false)
    }

    // This function is called when the create post button on newPostModal is pressed
    async function createPost (){
        try {
            const token = await AsyncStorage.getItem("token");

            if(!token) alert("Usuário não autorizado")

            await api.post("/post/create", { description: newPostModalInfo }, {
                headers: { Authorization: `Bearer ${token}` }
            })

            alert("Post Criado com sucesso!")

            closeModal();
            
        } catch (error) {
            if(error.response) alert(error.response.data.error)
            else alert("Falha na criação do post")
        }
    }


    // Here starts the jsx of the component :)
    return (
        <SafeAreaView style={style.container} >
            <NewPostModal close={closeModal} visible={newPostModalVisible} />

            <ScrollView style={{ width: '100%' }} >

                    <View style={{ alignItems: 'center', justifyContent: 'center' }} >
                        <TouchableOpacity style={style.addPostButton} onPress={handleNewPost} >
                            <Icon name='md-add' size={40} color="#767676" />
                        </TouchableOpacity>
                        <Text style={style.newPostText} >Postar Conteúdo</Text>
                    </View>

                    <View style={style.listContainer} >
                        {posts.map((item) => (
                            <Item key={item._id} item={item} showMore={() => showMore(item)} />
                        ))}
                        <View style={{ width: '100%', marginBottom: 40}} />
                    </View>

            </ScrollView>

            <NewPostModal
                close={closeModal} 
                visible={newPostModalVisible}
                value={newPostModalInfo}
                onChangeText={e => setNewPostModalInfo(e)}
                createPost={createPost}
            />

            <ShowMoreModal 
                close={closeModal}
                visible={showMoreModal}
                comments={comments}
            />

        </SafeAreaView>
    )
}

// --------------------------------------- Create StyleSheet -----------------------------------//

const style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: "#262626",
    },
    newPostText: {
        color: '#f2f2f2',
        fontSize: 18,
        marginVertical: 10
    },
    addPostButton: {
        width: 60,
        height: 60,
        borderRadius: 60,
        backgroundColor: '#f2f2f2',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: StatusBarHeight + 10,
    },
    listContainer: {
        backgroundColor: '#f2f2f2',
        width: '100%',
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
    },
    commentPost: {
        fontSize: 16,
        textAlign: "center",
        marginTop: 20
    },
    // ============= Modal Style =============== //
    modalContainer: {
        flex: 1,
        backgroundColor: "#262626",
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    createPost: {
        width: "100%",
        backgroundColor: "rgba(255, 0, 0, 0.6)",
        alignItems: 'center'
    }
})

//--------------------------- Item styles ------------------//

import styled from 'styled-components'

const Container = styled.View`
    width: 100%;
    background-color: #d9d9d9;
    margin-top: 60px;
    align-items: center;
    justify-content: flex-start;
`;

Container.title = styled.Text`
    font-size: 18px;
    color: #000;
`;

Container.comment = styled.Text`
    font-size: 16px;
    font-weight: bold;
    color: #8c8c8c;
    text-align: center;
    margin-bottom: 20px;
`;

const Img = styled.Image`
    width: 100%;
    height: 400px;
`;

const Avatar = styled.Image`
    width: 60px;
    height: 60px;
    border-radius: 60px;
    margin-top: 10px;
`;