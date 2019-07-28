import React from 'react';
import { TextInput, View, Text } from 'react-native';
import { Fonts } from '../../utils/Fonts';


const BuyinInput = ({ label, value, onChangeText, placeholder, secureTextEntry }) => {
  const { inputStyle, labelStyle, containerStyle } = styles;

  return (
    <View style={containerStyle}>
      <Text style={labelStyle}>{label}</Text>
      <TextInput
        keyboardType='numeric'
        secureTextEntry={secureTextEntry}
        placeholder={placeholder}
        autoCorrect={false}
        style={inputStyle}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
};

const styles = {
  inputStyle: {
    color: '#000',
    paddingRight: 5,
    paddingLeft: 5,
    fontSize: 18,
    lineHeight: 23,
    width: 100,
    borderColor: '#13233B',
    borderWidth: 0.2,
    borderRadius: 5,
    marginRight: 20,
  },
  labelStyle: {
    fontFamily: Fonts.Cabin,
    fontSize: 20,
    paddingLeft: 20,
    flex: 1
  },
  containerStyle: {
    height: 25,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  }
};

export { BuyinInput };
