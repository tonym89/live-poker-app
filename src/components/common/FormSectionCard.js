import React from 'react';
import { View, Dimensions } from 'react-native';

const { height } = Dimensions.get('screen');
const screenHeight = height - 200;

const FormSectionCard = (props) => {
  return (
    <View style={styles.containerStyle}>
      {props.children}
    </View>
  );
};

const styles = {
  containerStyle: {
    padding: 5,
    marginBottom: 15
  }
};

export { FormSectionCard };
