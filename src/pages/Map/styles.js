import { StyleSheet } from 'react-native'
import colors from '../../utils/colors'

const style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.background,
    },
    headerText: {
        position: 'absolute',
        top: 20,
        fontWeight: 'bold',
        fontSize: 18,
        fontFamily: 'Domine_400Regular',
        color: '#f2f2f2'
    },
    texto: {
        color: '#f2f2f2',
        fontSize: 25
    },
    map: {
        height: "100%",
        width: "100%"
    },
    reloadIcon: {
        position: 'absolute',
        bottom: 20,
        right: 10,
        padding: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    addMarkerIcon: {
        position: 'absolute',
        top: 50,
        left: 10,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 5
    },
    markerView: {
        width: 40,
        height: 40,
        backgroundColor: '#f00'
    },
    loadingScreen: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
        backgroundColor: "#262626",
      },
      filterIcon: {
        position: 'absolute',
        top: 50,
        right: 10,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 5
      },
})

export default style;