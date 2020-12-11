import React from 'react'
import { Modal, View, StyleSheet, Text, TouchableOpacity, ActivityIndicator } from 'react-native'
import colors from '../../utils/colors'
import Input from '../../components/Input'

export default ({ visible, close, createUpdate }) => {

    const [title, setTitle] = React.useState('')
    const [description, setDescription] = React.useState("")
    const [loading, setLoading] = React.useState(false)

    function create() {
        setLoading(true)
        createUpdate(title, description).then(() => {
            setLoading(false)
            close()
        })
    }

    return (
        <Modal
            animationType='fade'
            onRequestClose={close}
            visible={visible}
            transparent
        >
            <TouchableOpacity style={style.container} onPress={close} >
                <View style={style.modalContainer} >
                    <Text style={style.text} >Criar Update</Text>

                    {loading && <ActivityIndicator size="large" color="#f2f2f2" />}

                    <View style={style.inputArea} >
                        <Input 
                            value={title}
                            onChangeText={setTitle}
                            placeholder="Título do update..."
                        />

                        <Input 
                            value={description}
                            onChangeText={setDescription}
                            size={150}
                            multiline
                            placeholder="Digite aqui uma mensagem..."
                        />

                    </View>

                    <TouchableOpacity style={style.button} onPress={create} >
                        <Text style={style.buttonText} >Criar Atualização</Text>
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        </Modal>
    )
}


const style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f2f2f23f',
    },
    modalContainer: {
        width: '90%',
        backgroundColor: colors.background,
        alignItems: 'center',
        justifyContent: 'flex-start',
        borderRadius: 10,
    },
    text: {
        fontSize: 16,
        color: '#f2f2f2',
        marginVertical: 20
    },
    button: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.fontLight,
        paddingVertical: 20,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        marginTop: 20
    },
    buttonText: {
        color: "#f2f2f2",
        fontFamily: 'Domine_400Regular',
    },
    inputArea: {
        width: '100%'
    }
})