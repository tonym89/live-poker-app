import React from 'react';
import { View, Dimensions } from 'react-native';

const { height } = Dimensions.get('screen');
const screenHeight = height - 200;

const FormSectionBottomCard = (props) => {
  return (
    <View style={styles.containerStyle}>
      {props.children}
    </View>
  );
};

const styles = {
  containerStyle: {
    borderBottomWidth: 0,
    borderColor: '#13233B',
    padding: 5,
    marginBottom: 15
  }
};

export { FormSectionBottomCard };
