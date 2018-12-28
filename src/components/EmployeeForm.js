import React, { Component } from 'react';
import { Image, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { employeeUpdate } from '../actions';
import { CardSection, Input, TextArea, ImageSelector, PlusMinus, Button } from './common';
import firebase from 'firebase'
import RNFetchBlob from 'react-native-fetch-blob'
import ImagePicker from 'react-native-image-picker';

class EmployeeForm extends Component {

  getSelectedImages = (selectedImages, currentImage) => {
    
    const image = currentImage.uri
 
    const Blob = RNFetchBlob.polyfill.Blob
    const fs = RNFetchBlob.fs
    window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
    window.Blob = Blob
 
   
    let uploadBlob = null
    const imageRef = firebase.storage().ref(`/images`).child(`${currentImage.filename}`)
    let mime = 'image/jpg'
    fs.readFile(image, 'base64')
      .then((data) => {
        return Blob.build(data, { type: `${mime};BASE64` })
    })
    .then((blob) => {
        uploadBlob = blob
        return imageRef.put(blob, { contentType: mime })
      })
      .then(() => {
        uploadBlob.close()
        return imageRef.getDownloadURL()
      })
      .then((url) => {
        console.log(url);
        this.props.employeeUpdate({ prop: 'image', url })
      })
      .catch((error) => {
        console.log(error);
 
      })  
 
  }

  render() {
    return (
      <ScrollView>
        <CardSection>
          <Input
            label="Name"
            placeholder="Jane"
            value={this.props.name}
            onChangeText={value => this.props.employeeUpdate({ prop: 'name', value })}
          />
        </CardSection>

        <CardSection>
        <Image
          style={styles.imageStyle}
          source={{ uri: this.props.image }}
          // source={require('../images/no_photo.jpg') }
        />
        </CardSection>

        <CardSection>
          <Input
            label="Barcode"
            placeholder="23432676532"
            value={this.props.barcode}
            onChangeText={value => this.props.employeeUpdate({ prop: 'barcode', value })}
          />
        </CardSection>

        <TextArea
          placeholder="Type product description"
          value={this.props.description}
          onChangeText={value => this.props.employeeUpdate({ prop: 'description', value })}
          editable
        />
        
        <PlusMinus onChange={value => this.props.employeeUpdate({ prop: 'stock', value })}
          initValue={this.props.stock}
        />
      </ScrollView>
    );
  }
}

const styles = {
  imageStyle: {
    height: 300,
    flex: 1,
    width: null
  }
};

const mapStateToProps = (state) => {
  const { name, description, barcode, image, stock } = state.employeeForm;

  return { name, description, barcode, image, stock };
};

export default connect(mapStateToProps, { employeeUpdate })(EmployeeForm);
