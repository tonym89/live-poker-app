import React from 'react';
import { Text, View, Modal } from 'react-native';
import { CardSection } from './CardSection';
import { ModalButton } from './ModalButton';

const FilterModal = ({ children, visible, onJanuaryFilterPress, onFebruaryFilterPress, onMarchFilterPress, onAprilFilterPress, onMayFilterPress, onJuneFilterPress, onJulyFilterPress, onAugustFilterPress, onSeptemberFilterPress, onOctoberFilterPress, onNovemberFilterPress, onDecemberFilterPress, FilterPress,onClearFilterPress }) => {
  const { containerStyle, textStyle, cardSectionStyle } = styles;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={() => {}}
    >
      <View style={containerStyle}>
        <CardSection style={cardSectionStyle}>
          <Text style={textStyle}>
            {children}
          </Text>
        </CardSection>
        <View style={{flexDirection: 'row'}}>
          <View style={{flexDirection: 'column', height: 400, flex: 0.5, justifyContent: 'center'}}>
            <ModalButton onPress={onJanuaryFilterPress}>January</ModalButton>
            <ModalButton onPress={onFebruaryFilterPress}>February</ModalButton>
            <ModalButton onPress={onMarchFilterPress}>March</ModalButton>
            <ModalButton onPress={onAprilFilterPress}>April</ModalButton>
            <ModalButton onPress={onMayFilterPress}>May</ModalButton>
            <ModalButton onPress={onJuneFilterPress}>June</ModalButton>
          </View>

          <View style={{flexDirection: 'column', height: 400, flex: 0.5, justifyContent: 'center'}}>
            <ModalButton onPress={onJulyFilterPress}>July</ModalButton>
            <ModalButton onPress={onAugustFilterPress}>August</ModalButton>
            <ModalButton onPress={onSeptemberFilterPress}>September</ModalButton>
            <ModalButton onPress={onOctoberFilterPress}>October</ModalButton>
            <ModalButton onPress={onNovemberFilterPress}>November</ModalButton>
            <ModalButton onPress={onDecemberFilterPress}>December</ModalButton>
          </View>

        </View>

        <ModalButton onPress={onClearFilterPress}>Clear Filters</ModalButton>
      </View>
    </Modal>
  );
};

const styles = {
  cardSectionStyle: {
    justifyContent: 'center'
  },
  textStyle: {
    flex: 1,
    fontSize: 18,
    textAlign: 'center',
    lineHeight: 40,
    color: '#FCFDFC',
  },
  containerStyle: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    position: 'relative',
    flex: 1,
    justifyContent: 'center'
  }
};

export { FilterModal };
