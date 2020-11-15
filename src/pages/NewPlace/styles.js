import { StyleSheet } from 'react-native'
import color from '../../utils/colors'

const style = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: color.background,
        flex: 1,
        padding: 20
    },
    headerText: {
        color: '#f2f2f2',
        fontFamily: "Domine_700Bold",
        fontSize: 18,
        fontWeight: 'bold'
    },
    texto: {
        color: '#f2f2f2',
        fontSize: 16,
        fontFamily: 'Domine_400Regular',
        marginBottom: 10
    },
    botao: {
        marginTop : 40,
        backgroundColor: color.fontLighter,
        width: '100%',
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
    },
    cancel: {
        marginTop : 10,
        width: '100%',
        alignItems: 'center',
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
    },
    buttonText: {
        color: '#f2f2f2',
        fontFamily: "Domine_400Regular",
        fontSize: 14,
        fontWeight: 'bold'
    },
    inputArea: {
        width: '100%',
        height: '40%',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    tagsArea: {
        width: '100%',
        height: "30%",
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonArea: {
        width: '100%',
        height: '20%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerArea: {
        width: '100%',
        height: '10%',
        alignItems: 'center',
        justifyContent: 'center',
    }
})

export default style;