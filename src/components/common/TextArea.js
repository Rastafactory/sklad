import React from 'react';
import { TextInput, View } from 'react-native';

const TextArea = ({ value, onChangeText, placeholder, editable }) => {
  const { textAreaContainer, textArea } = styles;

  return (
    <View style={textAreaContainer} >
    <TextInput
      style={textArea}
      underlineColorAndroid="transparent"
      placeholder={placeholder}
      placeholderTextColor="grey"
      multiline={true}
      value={value}
      onChangeText={onChangeText}
      editable={editable}
    />
  </View>
  );
};

const styles = {
  textAreaContainer: {
    backgroundColor: '#fff',
    borderColor: '#ddd',
    borderWidth: 1,
    padding: 5,
    position: 'relative'
  },
  textArea: {
    height: 150,
    justifyContent: "flex-start"
  }
};

export { TextArea };
