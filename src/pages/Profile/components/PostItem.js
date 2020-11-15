import React from 'react'
import { StyleSheet, Image, View, Dimensions } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

import FocusPost from './FocusPost'

export default ({ item, refresh, canDelete }) => {


	const [visible, setVisible] = React.useState(false)

	function handlePostPress() {
		setVisible(true)
	}
	
    return (
        <View style={style.container} >

			{visible && <FocusPost 
				visible={visible}
				close={() => setVisible(false)}
				image={item.image.url}
				id={item._id}
				refresh={refresh}
				description={item.description}
				canDelete={canDelete}
			/>}
			<TouchableOpacity style={style.imageContainer} onPress={handlePostPress} >
				<Image source={{ uri: item.image.url }} style={style.image}  />
			</TouchableOpacity>

        </View>
	)
}

const style = StyleSheet.create({
    container: {
        flex: 0.33,
        height: '20%',
        borderRadius: 10,
		margin: 5
	},
	image: {
		width: '100%',
        height: '100%',
        borderRadius: 10,
	},
	imageContainer: {
		width: '100%',
		height: Dimensions.get('window').height * 0.3,
		borderRadius: 10
	},
	trashIcon: {
		position: 'absolute',
		top: 5,
		right: 0
	}
})
