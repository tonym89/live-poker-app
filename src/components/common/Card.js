import React from 'react';
import { View, Dimensions } from 'react-native';

const { height } = Dimensions.get('screen');
const screenHeight = height - 100;

const Card = (props) => {
  return (
    <View style={styles.containerStyle}>
      {props.children}
    </View>
  );
};

const styles = {
  containerStyle: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'transparent',
    borderBottomWidth: 0,
    height: screenHeight
  }
};

export { Card };
