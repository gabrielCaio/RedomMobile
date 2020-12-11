import React from 'react';
import { StyleSheet, View, TextInput } from 'react-native'


export default ({placeholder, value, onChangeText, password, type, multiline, size, width, fontSize, radius, onSubmitEditing}) => {
    return (
        <View style={ style.container(size ? size : 60, width ? width : '100%', radius ? radius : 10) }>
            <TextInput
                style={style.input(fontSize ? fontSize : 12)}
                placeholder={placeholder}
                placeholderTextColor={"#f2f2f2"}
                value={value}
                onChangeText={onChangeText}
                secureTextEntry={password}
                onSubmitEditing={onSubmitEditing}
                keyboardType={type}
                multiline={multiline}
            />
        </View>
    );
}

const style = StyleSheet.create({
    container: (size, width, radius) => ({
        width: width,
        height: size,
        backgroundColor: "#001D25",
        flexDirection: "row",
        borderRadius: radius,
        paddingLeft: 10,
        paddingRight: 10,
        alignItems: "center",
        justifyContent: 'flex-start',
        marginBottom: 15,
        borderBottomWidth: 1,
        borderColor: "#f2f2f2"
    }),
    input: (fontSize) => ({
        width: "100%",
        fontSize: fontSize,
        color: "#f2f2f2",
        marginLeft: 10,
        fontFamily: "Domine_400Regular",
    }),
})