import React from 'react';
import { TextInput, View, Text } from 'react-native';
import { Fonts } from '../../utils/Fonts';


const BlindInputOngoing = ({ label, value, onChangeText, placeholder, secureTextEntry }) => {
  const { inputStyle, labelStyle, containerStyle } = styles;

  return (
    <View style={containerStyle}>
      <Text style={labelStyle}>{label}</Text>
      <TextInput
        keyboardType='numeric'
        secureTextEntry={secureTextEntry}
        placeholder={placeholder}
        placeholderTextColor={'#cccccc'}
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
    color: '#FCFDFC',
    backgroundColor: '#3B5889',
    fontSize: 18,
    height: 35,
    width: 50,
    borderColor: '#FCFDFC',
    borderWidth: 0.6,
    borderRadius: 5,
    paddingLeft: 10,
    paddingTop: 0,
    paddingBottom: 0
  },
  labelStyle: {
    color: '#FCFDFC',
    fontFamily: Fonts.Cabin,
    fontSize: 20,
    paddingLeft: 20,
    paddingRight: 5
  },
  containerStyle: {
    height: 25,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  }
};

export { BlindInputOngoing };
