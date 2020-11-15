import { StyleSheet, Dimensions } from 'react-native'
import color from '../../utils/colors'
import Constants from 'expo-constants'
import colors from '../../utils/colors';

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.background,
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
        marginTop: '20%',
        justifyContent: 'flex-end',
        alignItems: 'flex-end'
    },
    headerText: {
        color: '#f2f2f2',
        fontFamily: 'Domine_400Regular',
        marginTop: 20,
    },
    editBannerIcon: {
        position: 'absolute',
        top: 20,
        right: 10
    },
    editAvatarIcon: {
        marginRight: 10,
        marginBottom: 10
    },
    inputArea: {
        width: '100%',
        padding: 10,
        marginTop: 20
    },
    confirmButton: {
        width: '40%',
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.fontLighter,
        borderRadius: 5
    },
    cancelButton: {
        width: '100%',
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        marginTop: 10,
        flexDirection: 'row'
    },
    buttonText: {
        fontFamily: 'Domine_400Regular',
        color: '#f2f2f2',
        fontSize: 14
    },
    buttonArea: {
        width: '100%', 
        padding: 10, 
        alignItems: 'center',
        position: 'absolute',
        bottom: 20
    },
})

export default style;