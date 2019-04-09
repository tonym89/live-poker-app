import React from 'react';
import { View, Dimensions } from 'react-native';

const { height } = Dimensions.get('screen');
const screenHeight = height - 200;

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
    elevation: 1,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
    height: screenHeight
  }
};

export { Card };
