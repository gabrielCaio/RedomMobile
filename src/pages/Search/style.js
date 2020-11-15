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
    texto: {
        color: '#f2f2f2',
        fontSize: 25,
    },
    categoria: {
        marginTop: 10,
        height: 40
    },
    cards: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20
    },
    flatList: {
        width: '100%',
        height: '100%'
    },
    headerText: {
        color: "#f2f2f2",
        fontSize: 18,
        fontWeight: "bold",
        fontFamily: "Domine_400Regular",
    },
    noImageView: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        backgroundColor: '#5c5c5c',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10
    },
})

export default style;