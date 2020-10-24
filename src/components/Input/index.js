import React from 'react';
import { StyleSheet, View, TextInput } from 'react-native'


export default ({placeholder, value, onChangeText, password, type, multiline, size}) => {
    return (
        <View style={ style.container(size ? size : 60) }>
            <TextInput
                style={style.input}
                placeholder={placeholder}
                placeholderTextColor="#0d0d0d"
                value={value}
                onChangeText={onChangeText}
                secureTextEntry={password}
                keyboardType={type}
                multiline={multiline}
            />
        </View>
    );
}

const style = StyleSheet.create({
    container: size => ({
        width: "100%",
        height: size,
        backgroundColor: "#f2f2f2",
        flexDirection: "row",
        borderRadius: 10,
        paddingLeft: 15,
        alignItems: "center",
        justifyContent: 'flex-start',
        marginBottom: 15,
    }),
    input: {
        width: "100%",
        fontSize: 16,
        color: "#268596",
        marginLeft: 10,
        
    },
})