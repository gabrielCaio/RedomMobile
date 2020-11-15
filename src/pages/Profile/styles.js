import { StyleSheet, Dimensions } from 'react-native'
import colors from '../../utils/colors'

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    texto: {
        color: '#000',
        fontSize: 25,
        marginTop: 20,
        fontFamily: "Domine_400Regular"
    },
    headerText: {
        color: '#f2f2f2',
        fontSize: 18,
        fontFamily: "Domine_400Regular",
        fontWeight: 'bold',
    },
    headerView: {
        width: '100%', 
        alignItems: 'center',
        position:'absolute', 
        top:20, 
    },
    gradient: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    bannerArea: {
        width: "100%",
        height: "50%"
    },
    banner: {
        width: '100%',
        height: "100%",
        alignItems: 'center',
        justifyContent: 'center',
    },  
    imageArea: {
        marginTop: 30,
        width: '100%',
        alignItems: "center",
        justifyContent: 'center',
    },
    avatar: {
        width: 150,
        height: 150,
        borderRadius: 20,
        marginTop: '20%'
    },
    name: {
        color:'#f2f2f2', 
        fontSize:18,
        marginTop: 10
    },
    optionsIcon: {
        position: 'absolute',
        top: 20,
        right: 10,
        padding: 5,
        alignItems: "center",
        justifyContent: 'center',
    },
    infoArea: {
        width: '100%',
        height: '13%',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    info: {
        fontSize: 12,
        color: '#f2f2f2',
        fontFamily: "Domine_400Regular",
    },
    buttonArea: {
        marginTop: 20
    },
    loading: {
        width: '100%', 
        height: '100%', 
        backgroundColor: '#001D25', 
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    infoItem: {
        alignItems: 'center',
        width: '32%'
    },
    titleArea: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 5,
        borderRadius: 20,
        marginTop: '-5%',
        width: '100%'
    },
    title: {
        fontFamily: 'Domine_400Regular',
        color: '#2c2c2c',
        backgroundColor: '#f2f2f2',
        padding: 5,
        borderRadius: 20
    },
})

export default style;