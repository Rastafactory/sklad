import React from 'react';
import { View, Text } from 'react-native';
import CameraRollPicker from 'react-native-camera-roll-picker';

const ImageSelector = ({ callback }) => {

  return (
    <View style={styles.containerStyle}>
        <CameraRollPicker
        selectSingleItem
        selected={[]}
        imagesPerRow={1}
        maximum={1}
        callback={callback}
        />
        <Text style={styles.welcome}>
          Image Gallery
        </Text>  
    </View>
  );
};

const styles = {
    containerStyle: {
      height: 240
    }
  };

export { ImageSelector };
