import React, { useState } from 'react'
import { TouchableOpacity, View, Text } from 'react-native'

import Input from '../../components/Input'
import api from '../../api'
import style from './styles'
import Tag from '../../components/Tag'
import color from '../../utils/colors'

// Legendas
// Type 0 para restaurante
// Type 1 para Ar Livre
// Type 2 para Lanches
// Type 3 para Música

export default ({ navigation, route }) => {

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [type, setType] = useState(0)

    const { lat, long } = route.params.data;

    // This function handles the creation of a new marker
    async function handleSend (){
        try {
            if(title === '' || description === '') return alert("Preencha todos os campos")
            const tags = handleTags()
            const res = await api.post("/place/create", {
                title,
                description,
                latitude: lat,
                longitude: long,
                tags
            })

            alert("Solicitação enviada com sucesso! só aguardar ser aprovada");

            navigation.navigate("Map");
        } catch (error) {
            if(error.response) alert(error.response.data.error)
            else alert("Erro ao criar novo lugar")
        }
    }

    function handleCancel (){
        navigation.goBack();
    }

    function handleTags() {
        switch (type) {
            case 0:
                return 'Restaurante'
            case 1:
                return 'Ar Livre'
            case 2:
                return 'Lanches'
            case 3:
                return 'Musica'
            default:
                return 'Restaurante'
        }
    }


    // JSX Here
    return (
        <View style={style.container} >

            <View style={style.headerArea} >
                <Text style={style.headerText} >Novo Lugar</Text>
            </View>

            <View style={style.inputArea} >
                <Input 
                    placeholder="Título" 
                    value={title} 
                    onChangeText={e => setTitle(e)} 
                    size={50}
                />
                <Input 
                    placeholder="Descrição" 
                    value={description} 
                    onChangeText={e => setDescription(e)} 
                    size={100}
                    multiline
                />
            </View>

            <View style={style.tagsArea} >
                <Text style={style.texto} >Tags</Text>

                <View style={{flexDirection: 'row', marginVertical: 10}} >
                    <TouchableOpacity onPress={() => setType(0)} >
                        <Tag title="Restaurante" color={type === 0 ? color.fontLight : '#5c5c5c'} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setType(1)} >
                        <Tag title="Ar Livre" color={type === 1 ? color.fontLight : '#5c5c5c'} />
                    </TouchableOpacity>
                </View>

                <View style={{flexDirection: 'row'}} >
                    <TouchableOpacity onPress={() => setType(2)} >
                        <Tag title="Lanches" color={type === 2 ? color.fontLight : '#5c5c5c'} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setType(3)} >
                        <Tag title="Música" color={type === 3 ? color.fontLight : '#5c5c5c'} />
                    </TouchableOpacity>
                </View>
            </View>

            <View style={style.buttonArea} >
                <TouchableOpacity style={style.botao} onPress={handleSend} >
                    <Text style={style.buttonText} >Enviar solicitação</Text>
                </TouchableOpacity>

                <TouchableOpacity style={style.cancel} onPress={handleCancel} >
                    <Text style={style.buttonText} >Cancelar</Text>
                </TouchableOpacity>
            </View>

        </View>
    )
}
