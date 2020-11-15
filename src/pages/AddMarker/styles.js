import { StyleSheet } from 'react-native'

const style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#0d0d0d",
    },
    texto: {
        color: '#f2f2f2',
        fontSize: 25
    },
    map: {
        height: "100%",
        width: "100%"
    },
    buttonArea: {
        position: 'absolute',
        bottom: 40,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    confirmar: {
        height: 40,
        width: 100,
        borderRadius: 15,
        backgroundColor: '#02F564af',
        
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    cancelar: {
        height: 40,
        width: 100,
        borderRadius: 15,
        backgroundColor: 'rgba(255, 0, 0, 0.6)',

        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default style;