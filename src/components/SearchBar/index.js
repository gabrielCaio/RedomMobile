import React from 'react';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const InputArea = styled.View`
    width: 100%;
    height: 50px;
    background-color: #f2f2f2;
    flex-direction: row;
    border-radius: 10px;
    padding-left: 15px;
    align-items: center;
    margin-top: 15px;
`;
const Input = styled.TextInput`
    flex: 1;
    font-size: 16px;
    color: #268596;
    margin-left: 10px;
`;

export default ({placeholder, value, onChangeText,}) => {
    return (
        <InputArea>
            <Input
                placeholder={placeholder}
                placeholderTextColor="#0d0d0d"
                value={value}
                onChangeText={onChangeText}
            />
            <Icon name='filter' size={20} color='#8c8c8c' style={{ marginRight: 10 }} />
        </InputArea>
    );
}