import React from 'react'
import { StyleSheet, Text, View, Modal, TouchableOpacity } from 'react-native'

import Icon from 'react-native-vector-icons/AntDesign'
import color from '../../../utils/colors'

export default ({ visible, close, logout, admin, approvePlaces, about, editProfile }) => {
    return (
        <Modal
            animationType='fade'
            visible={visible}
            onRequestClose={close}
            transparent
        >
            
            <View style={style.container} >

                <TouchableOpacity style={style.touch} onPress={close} >

                    <View style={style.containerModal} >

                        <View style={style.modalHeader} >
                            <Text style={style.headerText} >Opções</Text>
                        </View>

                        <Icon name='closecircle' size={25} color='#eb5757' style={style.icon} onPress={close} />

                        <TouchableOpacity onPress={editProfile} style={style.button} >
                            <Text style={style.item} >Editar Perfil</Text>
                        </TouchableOpacity>

                        <View style={{width:250, backgroundColor: color.fontLight, height: 1}} />

                        {admin && (
                            <View style={style.adminButton} >
                                <TouchableOpacity style={style.button} onPress={approvePlaces} >
                                <Text style={style.item} >Aprovar lugares (admin)</Text>
                                </TouchableOpacity>
                                <View style={{width:250, backgroundColor: color.fontLighter, height: 1}} />
                            </View>
                        )}

                        <TouchableOpacity onPress={logout} style={style.button} >
                            <Text style={style.item} >Deslogar</Text>
                        </TouchableOpacity>

                        <View style={{width:250, backgroundColor: color.fontLight, height: 1, marginBottom: 0}} />

                        <TouchableOpacity onPress={about} style={style.about} >
                            <Text style={style.item} >Atualizações</Text>
                        </TouchableOpacity>
                    </View>

                </TouchableOpacity>

            </View>
        </Modal>
    )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.4)",
    },
    touch: {
        backgroundColor: "rgba(0,0,0,0.4)",
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    headerText: {
        fontFamily: 'Domine_400Regular',
        fontWeight: 'bold',
        fontSize: 18,
        color: '#f2f2f2',
    },
    containerModal: {
        backgroundColor: color.darkBlue,
        width: 300,
        alignItems: 'center',
        // justifyContent: 'flex-start',
        borderRadius: 30
    },
    icon: {
        position: "absolute",
        top: 10,
        right: 10,
    },
    modalHeader: {
        width: '100%',
        backgroundColor: color.background,
        justifyContent: 'center',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingVertical: 15,
        paddingLeft: 20,
        // marginBottom: 20
    },
    item: {
        fontSize: 16,
        fontFamily: 'Domine_400Regular',
        color: color.fontLighter,
    },
    button: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 20
    },
    about: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 20,
        paddingBottom: 30,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    adminButton: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    }
})
