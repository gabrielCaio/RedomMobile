import { StyleSheet, Dimensions } from 'react-native'

const style = StyleSheet.create({
    container: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height
    },
    texto: {
        color: '#000',
        fontSize: 25,
        marginTop: 20
    },
    gradient: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20
    },
    imageArea: {
        width: 200,
        alignItems: "center",
        justifyContent: 'center',
        marginTop: 30
    },
    avatar: {
        width: 150,
        height: 150,
        borderRadius: 200,
    },
    editButton: {
        borderRadius: 50,
    },
    editView: {
        width: 50,
        height: 50,
        backgroundColor: '#eb5757',
        borderRadius: 50,
        alignItems: "center",
        justifyContent: 'center',

        position: 'relative',
        bottom: 45,
        left: 60
    },
    botaoSalvar: {
        width: "100%",
        height: 50,
        backgroundColor: '#EB5757',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        marginTop: 20
    },
    textBotaoSalvar: {
        color: "#f2f2f2",
        fontSize: 20
    }
})

export default style;