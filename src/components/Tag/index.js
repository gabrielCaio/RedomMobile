import React from 'react'
import { View, StyleSheet, Text } from 'react-native'

export default ({ color, title }) => {
    return (
        <View style={style.container(color)} >
            <Text>{title}</Text>
        </View>
    )
}

const style = StyleSheet.create({
    container: color => ({
        padding: 10,
        height: 25,
        backgroundColor: color,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 5
    }),
})

// const Container = styled.View`
//     width: 70px;
//     height: 25px;
//     background-color: ${(props) => (props.show ? "#f00" : "#fff")};
//     border-radius: 5px;
//     align-items: center;
//     justify-content: center;
//     margin-left: 5px;
//     margin-right: 5px;
// `;
