import React from 'react';
import { View } from 'react-native';
import NumericInput from 'react-native-numeric-input'

const PlusMinus = ({ onChange, initValue}) => {
  const { containerStyle } = styles;

  return (
    <View style={containerStyle}>
        <NumericInput 
        onChange={onChange}
        initValue={initValue}
        minValue={0}
        totalWidth={240} 
        totalHeight={50} 
        iconSize={25}
        step={1}
        rounded
        iconStyle={{ color: 'white' }} 
        rightButtonBackgroundColor='#87bdd8' 
        leftButtonBackgroundColor='#f7cac9'
        />
    </View>
  );
};

const styles = {
  containerStyle: {
    borderBottomWidth: 1,
    padding: 5,
    backgroundColor: '#fff',
    flexDirection: 'row',
    borderColor: '#ddd',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
};

export { PlusMinus };
