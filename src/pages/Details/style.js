import { StyleSheet, Dimensions } from 'react-native'

const style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#f2f2f2"
    },
    scroll: {
        flex: 1,
    },
    imagem: {
        width: 480,
        height: Dimensions.get('window').height * 0.8,
        resizeMode: 'cover',
    },
    imageScroll: {
        width: 480
    },
    containerCards: {
        width: '100%',
        padding: 10
    },
    card: {
        width: '100%',
        backgroundColor: '#d9d9d9',
        borderRadius: 5,
        alignItems: "center",
        justifyContent: 'center',
        padding: 15,
    },
    cardTitle: {
        fontSize: 24,
        color: '#262626'
    },
    cardDescription: {
        color: '#8c8c8c',
        fontSize: 18,
        textAlign: 'center'
    },
    horarioText: {
        fontSize: 20,
        color: '#262626'
    },
    showHor: {
        color: 'rgba(45, 27, 255, 0.6)',
        marginTop: 10,
        textAlign: 'center'
    },
    textoDia: {
        fontSize: 18,
        color: '#262626',
        textAlign: 'center',
        marginTop: 10,
    },
    textoHor: {
        fontSize: 18,
        color: '#8c8c8c',
        textAlign: 'center'
    },
    showMore: {
        color: 'rgba(45, 27, 255, 0.6)',
        marginTop: 10,
        textAlign: 'center',
        fontSize: 18
    },
    scrollComment: {
        width: Dimensions.get('window').width - 20
    }
})

export default style;