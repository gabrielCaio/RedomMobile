import { StyleSheet } from 'react-native'

const style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#262626',
        padding: 20
    },
    text: {
        color: '#f2f2f2',
        fontSize: 20
    },
    item: {
        width: '100%',
        marginTop: 30,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f2f2f2',
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