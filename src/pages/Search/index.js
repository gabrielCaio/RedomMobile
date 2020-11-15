import React, { useState, useEffect, useContext, useCallback } from 'react'
import { SafeAreaView, FlatList, ScrollView, TouchableOpacity, ActivityIndicator, View, Text } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import { UserContext } from '../../contexts/userContext'

import SearchBar from './components/SearchBar'
import Tag from '../../components/Tag'
import Stars from '../../components/Stars'

import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

// StyleSheet
import style from './style'

// API
import api from '../../api'

// Number of columns of flatlist
const numColumns = 2

function EmptyList() {
    return (
        <View style={{flex:1,alignItems:'center',justifyContent:'center'}} >
            <Text style={{
                fontFamily: 'Domine_400Regular',
                fontSize: 16,
                color: '#f2f2f2',
            }} >Não há nada por aqui :(</Text>
        </View>
    )
}

export default () => {
    
    const [places, setPlaces] = useState([])
    const [filteredArray, setFilteredArray] = useState([])
    const [refresh, setRefresh] = useState(false)
    const [loading, setLoading] = useState(false)

    const { state } = useContext(UserContext);

    // When component mount get array of places from api
    useEffect(() => {
        let isMounted = true
        setLoading(true)
        if (isMounted) getPlaces(isMounted)
        return () => { isMounted = false }
    }, [])

    // Navigation declaration
    const navigation = useNavigation()

    // Navigate do Details page when pressed item
    function handleItemPress(data) {
        navigation.navigate("Details", {data})
    }

    // This function get the places and sets on the places array
    const getPlaces = useCallback( async (isMounted) => {
        try{
            const res = await api.post("/place/nearUser", {
                latitude: state.latitude,
                longitude: state.longitude,
                dist: 30000
            })
            
            if(isMounted) {
                setPlaces(res.data)
                setFilteredArray(res.data)
                setRefresh(false)
                setLoading(false)
            }
        }catch(error) {
            if(error.response) alert(error.response.data.error);
            else alert("Erro ao buscar lugares")
        }
    }, [])

    // this function truncates the title of the item
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

    // filter items dinamically
    function onChangeSearch(e) {
        const newData = places.filter(item => {
            const itemData = `${item.title}`

            const textData = e

            return itemData.indexOf(textData) > -1
        })

        setFilteredArray(newData)
    }

    function onRefresh() {
        setRefresh(true)
        getPlaces(true)
    }


    //------------------------------------------------ JSX ---------------------------------------//
    return (
        <SafeAreaView style={style.container} >
            {loading && (
                <View style={{width:'100%',height:'100%',marginBottom:40, alignItems:'center', justifyContent: 'center'}} >
                    <ActivityIndicator size="large" color="#f2f2f2" />
                </View>
            )}

            <Text style={style.headerText} >Encontre</Text>

            <SearchBar
                placeholder='Pesquisar...'
                onChangeText={e => onChangeSearch(e)}
            />

            <ScrollView style={style.categoria} horizontal showsHorizontalScrollIndicator={false} >

            </ScrollView>


                <FlatList 
                    data={filteredArray}
                    keyExtractor={(item, index) => index.toString()}
                    numColumns={numColumns}
                    style={style.flatList}
                    refreshing={refresh}
                    onRefresh={() => onRefresh()}
                    ListEmptyComponent={<EmptyList />}
                    renderItem={({ item }) => 
                        <Container>
                            <TouchableOpacity onPress={() => handleItemPress(item)}  style={{width: '100%', height: '100%'}} >
                                {item.image.length === 0 ? 
                                    (<View style={style.noImageView} >
                                        <Icon name="image-off" size={50} color="#f2f2f2" />
                                    </View>) :
                                    <Imagem source={{ uri: item.image[0].url }} />
                                }
                                <Info>
                                    <Info.title>
                                        {truncateStr(item.title, 12)}
                                    </Info.title>
                                    <Stars stars={item.rating} size={10} />
                                </Info>
                            </TouchableOpacity>
                        </Container>
                    }
                />
        </SafeAreaView>
    )
}



//--------------------------------------- Card Style -------------------------------//

import styled from 'styled-components/native';
import colors from '../../utils/colors'

const Container = styled.View`
    flex: 0.5;
    margin: 3px;
    align-items: center;
    justify-content: center;
    background-color: #f2f2f2;
    height: 140px;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    margin-bottom: 70px;
`;

Container.Button = styled.TouchableOpacity`
`;

const Info = styled.View`
    width: 100%;
    height: 60px;
    background-color: ${colors.darkBlue };
    align-items: center;
    justify-content: center;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
`;

Info.title = styled.Text`
    color: #ECEBEB;
    font-size: 14px;
    font-family: Domine_400Regular;
    opacity: 0.8;
`;

const Imagem = styled.Image`
    width: 100%;
    height: 100%;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
`;