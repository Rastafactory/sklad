import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import firebase from 'firebase';
import RNFetchBlob from 'react-native-fetch-blob';
import CameraRollPicker from 'react-native-camera-roll-picker';

export default class Gallery extends Component {

  getSelectedImages = (selectedImages, currentImage) => {
    console.log(selectedImages);
    console.log(currentImage);

    const image = currentImage.uri;

    const Blob = RNFetchBlob.polyfill.Blob;
    const fs = RNFetchBlob.fs;
    window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
    window.Blob = Blob;

    let uploadBlob = null;
    const imageRef = firebase.storage().ref(`/images`).child(`${currentImage.filename}`);
    let mime = 'image/jpg';
    fs.readFile(image, 'base64')
      .then((data) => {
        return Blob.build(data, { type: `${mime};BASE64` });
    })
    .then((blob) => {
        uploadBlob = blob;
        return imageRef.put(blob, { contentType: mime });
      })
      .then(() => {
        uploadBlob.close();
        return imageRef.getDownloadURL();
      })
      .then((url) => {
        // URL of the image uploaded on Firebase storage
        console.log(url);

      })
      .catch((error) => {
        console.log(error);

      })
  }

  render() {

    return (
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <Text style={styles.welcome}>
          Image Gallery
        </Text>
        <CameraRollPicker selected={[]} maximum={1} callback={this.getSelectedImages} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  gallery: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  }
});
