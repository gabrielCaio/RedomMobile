import React, { useState, useEffect } from 'react'
import { SafeAreaView, View, StyleSheet, FlatList, ScrollView, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import Input from '../../components/SearchBar'
import Tag from '../../components/Tag'

import Hamburger from '../../assets/hamburger.jpg'

import Stars from '../../components/Stars'

import api from '../../api'

// Number of columns of flatlist
const numColumns = 2;

export default () => {
    // Declaration of array of places
    const [places, setPlaces] = useState([]);

    // When component mount get array of places from api
    useEffect(() => {
        getPlaces();
    }, [])

    // Navigation declaration
    const navigation = useNavigation()

    // Navigate do Details page when pressed item
    function handleItemPress(data) {
        navigation.navigate("Details", {data});
    }

    async function getPlaces () {
        try{
            const res = await api.get("/place/list");

            setPlaces(res.data);
        }catch(error) {
            if(error.response) alert(error.response.data.error);
            else alert("Erro ao buscar lugares");
        }
    }

    function truncateStr(str, size){
        if (str==undefined || str=='undefined' || str =='' || size==undefined || size=='undefined' || size ==''){
            return str;
        }
         
        var shortText = str;
        if(str.length >= size+3){
            shortText = str.substring(0, size).concat('...');
        }
        return shortText;
    }

    return (
        <SafeAreaView style={style.container} >
            <Input
                placeholder='Pesquisar...'
            />

            <ScrollView style={style.categoria} horizontal >
                <Tag color='#eb5757' title='Teste' />
                <Tag color='#eb5757' title='Teste' />
                <Tag color='#eb5757' title='Teste' />
                <Tag color='#eb5757' title='Teste' />
                <Tag color='#eb5757' title='Teste' />
                <Tag color='#eb5757' title='Teste' />
                <Tag color='#eb5757' title='Teste' />
                <Tag color='#eb5757' title='Teste' />
            </ScrollView>


                <FlatList 
                    data={places}
                    keyExtractor={(item) => item._id}
                    numColumns={numColumns}
                    style={style.flatList}
                    renderItem={({ item }) => 
                        <Container style={{ margin: 5 }} >
                            <TouchableOpacity onPress={() => handleItemPress(item)}  style={{width: '100%', height: '100%'}} >
                            <Imagem source={item.image == [] ? { uri: item.image[0]  } : Hamburger } />
                                <Info>
                                    <Info.title>
                                        {truncateStr(item.title, 12)}
                                    </Info.title>
                                    <Stars />
                                </Info>
                            </TouchableOpacity>
                        </Container>
                    }
                />
        </SafeAreaView>
    )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: "#262626",
        padding: 20
    },
    texto: {
        color: '#f2f2f2',
        fontSize: 25,
    },
    categoria: {
        marginTop: 10,
        height: 50
    },
    cards: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20
    },
    flatList: {
        width: '100%',
    },
})

//--------------------------------------- Card Style -------------------------------//

import styled from 'styled-components/native';

const Container = styled.View`
    width: 45%;
    align-items: center;
    justify-content: center;
    background-color: #f2f2f2;
    height: 160px;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    margin-bottom: 70px;
`;

Container.Button = styled.TouchableOpacity`
`;

const Info = styled.View`
    width: 100%;
    height: 60px;
    background-color: #f2f2f2;
    align-items: center;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
`;

Info.title = styled.Text`
    color: #000;
    font-size: 18px;
`;

const Imagem = styled.Image`
    width: 100%;
    height: 100%;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
`;