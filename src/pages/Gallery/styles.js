import { StyleSheet } from 'react-native'
import Constants from 'expo-constants'
import colors from '../../utils/colors'

// --------------------------------------- Create StyleSheet -----------------------------------//

const style = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: colors.background,
    },
    headerButton: {
        alignItems:'center',
        justifyContent:'center',
        width:'100%', 
        marginBottom: 10,
    },
    filterIcon: {
        position: 'absolute',
        right: 10,
        top: '30%'
    },
    headerText: {
        color: "#f2f2f2",
        fontSize: 18,
        marginTop: "2%",
        fontWeight: "bold",
        fontFamily: "Domine_400Regular",
    },
    newPostText: {
        color: '#f2f2f2',
        fontSize: 18,
        marginVertical: 10
    },
    addPostButton: {
        width: 30,
        height: 30,
        borderRadius: 60,
        backgroundColor: '#f2f2f2',
        alignItems: 'center',
        justifyContent: 'center',
        
        position: 'absolute',
        top: Constants.statusBarHeight,
        right: 20
    },
    listContainer: {
        backgroundColor: '#f2f2f2',
        width: '100%',
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        marginTop: Constants.statusBarHeight,
    },
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 60,
        marginTop: 10,
    },
    endPostsMessage: {
        color: '#f2f2f2',
        fontFamily: 'Domine_400Regular',
        fontSize: 16
    },
})


export default style;