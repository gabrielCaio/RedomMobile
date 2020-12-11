import { StyleSheet, Dimensions } from 'react-native'
import color from '../../utils/colors'
import Constants from 'expo-constants'

const style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: color.background,
    },
    backIcon: {
        position: 'absolute', 
        top: 30, 
        left: 10,
        height: 30,
        width: 30,
        borderRadius: 30,
        backgroundColor: '#f2f2f2',
        alignItems: 'center',
        justifyContent: 'center'
    },
    scroll: {
        flex: 1,
        backgroundColor: color.background
    },
    imagem: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height * 0.9,
        resizeMode: 'cover',
    },
    imageScroll: {
        width: 480
    },
    containerCards: {
        width: '100%',
        padding: 10
    },
    noImage: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height * 0.8,
        backgroundColor: '#262626',
        alignItems: 'center',
        justifyContent: 'center'
    },
    card: {
        width: '100%',
        // backgroundColor: '#5c5c5c',
        borderRadius: 5,
        alignItems: "center",
        justifyContent: 'center',
        padding: 15,
    },
    cardTitle: {
        fontSize: 24,
        color: '#fff',
        fontFamily: "Domine_700Bold",
        fontWeight: 'bold',
        textAlign: 'center'
    },
    cardDescription: {
        color: color.fontLight,
        fontSize: 14,
        textAlign: 'center',
        fontFamily: "Domine_400Regular",
        marginTop: 30
    },
    horarioText: {
        fontSize: 20,
        color: '#262626',
        fontFamily: "Domine_400Regular"
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
        fontFamily: "Domine_400Regular"
    },
    textoHor: {
        fontSize: 18,
        color: '#8c8c8c',
        textAlign: 'center',
        fontFamily: "Domine_400Regular"
    },
    showMore: {
        color: '#bbddf2',
        marginVertical: 10,
        textAlign: 'center',
        fontSize: 12,
        fontFamily: "Domine_400Regular",
        marginTop: 30
    },
    scrollComment: {
        width: Dimensions.get('window').width - 20
    },
    createReviewButton: {
        width: '100%',
        backgroundColor: color.darkBlue,
        padding: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },
    writeReview: {
        color: '#bbddf2',
        textAlign: 'center',
        fontSize: 14,
        fontFamily: "Domine_400Regular",
        marginTop: 5
    },
    noReviewText: {
        color: "#f2f2f2",
        fontFamily: "Domine_400Regular",
        textAlign: 'center'
    },
    delete: {
        position: 'absolute',
        top: 30,
        right: 10,
        height: 30,
        width: 30,
        borderRadius: 30,
        backgroundColor: '#f2f2f2',
        alignItems: 'center',
        justifyContent: 'center',
    }
})

export default style;