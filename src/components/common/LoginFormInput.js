import React from 'react';
import { TextInput, View, Text } from 'react-native';
import { Fonts } from '../../utils/Fonts';

const LoginFormInput = ({ label, value, onChangeText, placeholder, secureTextEntry, onFocus}) => {
  const { inputStyle, labelStyle, containerStyle } = styles;

  return (
    <View style={containerStyle}>
      <Text style={labelStyle}>{label}</Text>
      <TextInput
        secureTextEntry={secureTextEntry}
        placeholder={placeholder}
        placeholderTextColor={'#cccccc'}
        autoCorrect={false}
        style={inputStyle}
        value={value}
        onChangeText={onChangeText}
        onFocus={onFocus}
      />
    </View>
  );
};

const styles = {
  inputStyle: {
    color: '#FCFDFC',
    paddingRight: 5,
    paddingLeft: 5,
    fontSize: 18,
    lineHeight: 23,
    width: 175,
    borderColor: '#13233B',
    borderWidth: 0.2,
    borderRadius: 5,
    marginRight: 20,
  },
  labelStyle: {
    fontSize: 20,
    color: '#FCFDFC',
    fontFamily: Fonts.Cabin,
    paddingLeft: 20,
    flex: 1
  },
  containerStyle: {
    height: 40,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  }
};

export { LoginFormInput };
