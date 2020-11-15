import React from 'react'
import { StyleSheet, View, TouchableOpacity } from 'react-native'
import Icon from "react-native-vector-icons/MaterialIcons";
import Icon2 from "react-native-vector-icons/MaterialCommunityIcons";

const iconsize = 30;

export default ({ state, descriptors, navigation }) =>  {
    const focusedOptions = descriptors[state.routes[state.index].key].options;
  
    if (focusedOptions.tabBarVisible === false) {
      return null;
    }

    function Ico (label, color) {
        switch (label) {
            case 'Gallery':
                return <Icon name="web-asset" size={iconsize} color={color} />
            case 'Search':
                return <Icon name="search" size={iconsize} color={color} />
            case 'Map':
                return <Icon2 name="map-marker-outline" size={iconsize} color={color} />
            case 'NewPost':
                return <Icon name="add-circle" size={iconsize} color={color} />
            case 'Profile':
                return <Icon name="person" size={iconsize} color={color} />
            default:
                return <Icon name="web-asset" size={iconsize} color={color} />
        }
    }
  
    return (
      <View style={{ flexDirection: 'row', backgroundColor: '#262626' }}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;
  
          const isFocused = state.index === index;
  
          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });
  
            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };
  
          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };
  
          return (
            <TouchableOpacity
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={style.bar}
              key={index}
            >
              {Ico(label, isFocused ? '#00B9EC' : '#f2f2f2')}
            </TouchableOpacity>
          );
        })}
      </View>
    );
  }
  
const style = StyleSheet.create({
    bar: {
        flex: 1,
        backgroundColor: '#001D25',
        alignItems: 'center',
        justifyContent: 'center',
        height: 40
    }
})
