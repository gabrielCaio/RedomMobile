import { StyleSheet } from 'react-native'
import color from '../../utils/colors'

const style = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: color.background,
        paddingHorizontal: 20,
    },
    title: {
        color: '#f2f2f2',
        fontSize: 18,
        fontFamily: 'Domine_400Regular',
        fontWeight: 'bold',
        textAlign: 'center'
    },
    description: {
        color: '#f2f2f2',
        fontSize: 14,
        fontFamily: 'Domine_400Regular',
        marginTop: 20,
        textAlign: 'center',
    },
    headerText: {
        color: '#f2f2f2',
        fontFamily: 'Domine_700Bold',
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 20
    },
    item: {
        width: '100%',
        backgroundColor: color.darkBlue,
        marginVertical: 30,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        borderRadius: 10
    },
    backIcon: {
        position: 'absolute',
        top: 20,
        left: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f2f2f2',
        width: 30,
        height: 30,
        borderRadius: 30
    },
    trash: {
        position: 'absolute',
        top: 25,
        right: 20,
    },
})

export default style;