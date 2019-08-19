import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { Fonts } from '../../utils/Fonts';

const ModalButton = ({ onPress, children }) => {
  const { buttonStyle, textStyle } = styles;

  return (
    <TouchableOpacity onPress={onPress} style={buttonStyle}>
      <Text style={textStyle}>
        {children}
      </Text>
    </TouchableOpacity>
  );
};

const styles = {
  textStyle: {
    textAlign: 'center',
    color: '#FCFDFC',
    fontSize: 16,
    fontWeight: '600',
    paddingTop: 10,
    paddingBottom: 10,
    fontFamily: Fonts.CabinBold
  },
  buttonStyle: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3B5889',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#274272',
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 20
  }
};

export { ModalButton };
