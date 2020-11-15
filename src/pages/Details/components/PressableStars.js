import React from 'react'
import { View } from 'react-native'

import Icon from 'react-native-vector-icons/MaterialIcons'

export default ({stars}) => {

    const [number, setNumber] = React.useState([
        "star-border", "star-border", "star-border", "star-border", "star-border"
    ])


    function handleStarPress(n) {
        const arr = ["star-border", "star-border", "star-border", "star-border", "star-border"]
        for (let i = 0; i < n; i++) {
            arr[i] = 'star'
        }
        setNumber(arr);
        stars(n)
    }

    return (
        <View style={{flexDirection:'row'}} >
            <Icon name={number[0]} size={30} color="#F2C94C" onPress={()=>handleStarPress(1)} />
            <Icon name={number[1]} size={30} color="#F2C94C" onPress={()=>handleStarPress(2)} />
            <Icon name={number[2]} size={30} color="#F2C94C" onPress={()=>handleStarPress(3)} />
            <Icon name={number[3]} size={30} color="#F2C94C" onPress={()=>handleStarPress(4)} />
            <Icon name={number[4]} size={30} color="#F2C94C" onPress={()=>handleStarPress(5)} />
        </View>
    )
}