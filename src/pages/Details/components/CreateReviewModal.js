import React from 'react'
import { Modal, View, StyleSheet, TouchableOpacity, Text, ActivityIndicator } from 'react-native'

import Icon from 'react-native-vector-icons/AntDesign'

import color from '../../../utils/colors'
import api from '../../../api'
import Input from '../../../components/Input'

import PressableStars from './PressableStars'

export default ({ visible, close, place }) => {

    const [review, setReview] = React.useState('')
    const [stars, setStars] = React.useState(0)
    const [loading, setLoading] = React.useState(false)

    async function handleCreateReview() {
        try {
            setLoading(true)
            const res = await api.post(`/review/create/${place}`, {
                review,
                stars
            })
            setLoading(false)
            alert("Review criada com sucesso");
            close();
        } catch (error) {
            alert("Erro ao criar post");
            return close()
        }
    }

    function handleStars(n) {
        setStars(n)
    }

    return (
        <Modal
            animationType='fade'
            visible={visible}
            onRequestClose={close}
            transparent
        >
            <TouchableOpacity style={style.container} onPress={close} >

                {loading && <ActivityIndicator size="large" color="#eb5757" />}

                <View style={style.containerModal} >
                    <Input 
                        placeholder="Escreva aqui a sua review..."
                        size={100}
                        multiline
                        backgroundColor="#5c5c5c"
                        color="#f2f2f2"
                        value={review}
                        onChangeText={e=>setReview(e)}
                    />

                    <PressableStars stars={handleStars} />

                    <TouchableOpacity style={style.postButton} onPress={handleCreateReview} disabled={loading} >
                        <Text style={style.confirmText} >Confirmar</Text>
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        </Modal>
    )
}

const style = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        backgroundColor: '#fff5',
    },
    containerModal: {
        width: "100%",
        height: "40%",
        borderRadius: 20,
        backgroundColor: color.background,
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: 10
    },
    postButton: {
        backgroundColor: color.fontLighter,
        width: '100%',
        height: 40,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
    },
    confirmText: {
        fontFamily: "Domine_700Bold",
        color: '#f2f2f2',
        
    },
    closeIcon: {
        position: 'absolute',
        top: 20,
        right: 20
    }
})