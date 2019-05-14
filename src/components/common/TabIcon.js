import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { MonoSessionsSvg } from '.';

const TabIcon = ({ selected }) => {
  return (
    <Text style={{color: selected ? 'red' :'black'}}>Hello</Text>
  );
}

const styles = {
  textStyle: {
    backgroundColor: 'black',
    color: 'white'
  }
};


export { TabIcon };
