import React from "react";
import styled from "styled-components/native";
import Icon from "react-native-vector-icons/MaterialIcons";
import Icon2 from "react-native-vector-icons/MaterialCommunityIcons";

const TabArea = styled.View`
  height: 45px;
  background-color: #262626;
  flex-direction: row;
`;
const TabItem = styled.TouchableOpacity`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
const TabItemCenter = styled.TouchableOpacity`
  width: 60px;
  height: 60px;
  justify-content: center;
  align-items: center;
  background-color: #8d8b8b;
  border-radius: 35px;
  border: 3px solid #f2f2f2;
  margin-top: -25px;
`;

const iconsize = 30;

export default (props) => {
  const goTo = async (screenName) => {
    props.navigation.navigate(screenName);
  };

  return (
    <TabArea>
      <TabItem onPress={() => goTo("Gallery")}>
        <Icon name="web-asset" size={iconsize} color='#f2f2f2' />
      </TabItem>
      <TabItem onPress={() => goTo("Search")}>
        <Icon name="search" size={iconsize} color='#f2f2f2' />
      </TabItem>
      <TabItemCenter onPress={() => goTo("Map")}>
        <Icon2 name="map-marker-outline" size={iconsize} color='#f2f2f2' />
      </TabItemCenter>
      <TabItem onPress={() => goTo("AddMarker")}>
        <Icon name="add-circle" size={iconsize} color='#f2f2f2' />
      </TabItem>
      <TabItem onPress={() => goTo("Profile")}>
        <Icon name="person" size={iconsize} color="#f2f2f2" />
      </TabItem>
    </TabArea>
  );
};
