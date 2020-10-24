import { StyleSheet, Dimensions } from 'react-native'

const style = StyleSheet.create({
    container: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height
    },
    texto: {
        color: '#000',
        fontSize: 25,
        marginTop: 20
    },
    gradient: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    imageArea: {
        marginTop: 30,
        width: 150,
        alignItems: "center",
        justifyContent: 'center',
    },
    avatar: {
        width: 150,
        height: 150,
        borderRadius: 150,
    },
    editButton: {
        borderRadius: 50,
    },
    editView: {
        width: 50,
        height: 50,
        backgroundColor: '#eb5757',
        borderRadius: 50,
        alignItems: "center",
        justifyContent: 'center',

        position: 'relative',
        bottom: 40,
        left: 60
    },
    arrowLeft: {
        position: 'absolute',
        top: 30,
        left: 10
    },
    header: {
        marginTop: -20,
        width: '100%',
        paddingHorizontal: 20,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
    },
    headerText: {
        color: '#f2f2f2',
        fontSize: 18
    },
    tag: {
        backgroundColor: '#eb5757',
        borderRadius: 5,
        padding: 7
    },
    tagText: {
        color: '#f2f2f2',
        fontSize: 14
    },
    infoBold: {
        color: '#f2f2f2',
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 10
    },
    info: {
        color: '#f2f2f2',
        fontSize: 18,
    },
    logoutButton: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: 'center',
    },
    buttonArea: {
        marginTop: 20
    }
})

export default style;