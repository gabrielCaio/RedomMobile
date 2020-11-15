import { StyleSheet, Dimensions } from 'react-native'
import color from '../../utils/colors'

const style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: color.background,
    },
    description: {
        color: '#f2f2f2',
        textAlign: 'center'
    },
    name: {
        color: '#f2f2f2',
        fontFamily: 'Domine_400Regular',
        fontWeight: 'bold',
        marginBottom: 10
    },
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 60,
    },
    descriptionArea: {
        width: '100%',
        backgroundColor: '#0008',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20
    },
    image: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        resizeMode: 'cover',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    text: {
        fontSize: 18,
        fontFamily: 'Domine_400Regular',
        color: color.fontLighter,
    },
})


export default style