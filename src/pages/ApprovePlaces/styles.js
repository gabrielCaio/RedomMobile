import { StyleSheet } from 'react-native'
import colors from '../../utils/colors'

const style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: colors.background,
        padding: 20
    },
    headerText: {
        color: '#f2f2f2',
        fontFamily: 'Domine_700Bold',
        fontWeight: 'bold',
        fontSize: 18
    },
    title: {
        color: colors.fontLight,
        fontSize: 16,
        fontFamily: 'Domine_400Regular',
        textAlign: 'center',
        fontWeight: 'bold'
    },
    description: {
        fontFamily: 'Domine_400Regular',
        color: colors.fontLighter,
        marginTop: 20,
        textAlign: 'center'
    },
    item: {
        width: '100%',
        marginTop: 30,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.darkBlue,
        borderRadius: 10
    },
    buttons: {
        flexDirection: 'row',
        marginTop: 20,
        width: '50%',
        justifyContent: 'space-evenly'
    }
})

export default style;