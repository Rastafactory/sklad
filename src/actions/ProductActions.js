import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import RNFetchBlob from 'react-native-fetch-blob';

import {
  PRODUCT_UPDATE,
  PRODUCT_CREATE,
  PRODUCTS_FETCH_SUCCESS,
  PRODUCT_SAVE_SUCCESS,
  PRODUCT_BY_BARCODE
} from './types';


//prop can be whatever. For example name of employee and value Rastislav
export const employeeUpdate = ({ prop, value }) => {
  console.log('value ' + value);
  return {
    type: PRODUCT_UPDATE,
    payload: { prop, value }
  };
};

export const uploadImage = ({ currentImage }) => {
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
        return(url);

      })
      .catch((error) => {
        console.log(error);

      })
};

export const employeeCreate = ({ name, description, barcode, image, stock }) => {
  //currently authenticated user
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/employees`)
      .push({ name, description, barcode, image, stock })
      .then(() => {
        dispatch({ type: PRODUCT_CREATE });
        Actions.pop();
      });
  };
};

export const employeesFetch = () => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/employees`)
      .on('value', snapshot => {
        dispatch({ type: PRODUCTS_FETCH_SUCCESS, payload: snapshot.val() });
      });
  };
};

export const productFetch = ({ barcode }) => {
  const { currentUser } = firebase.auth();
  console.log('barcode: ' + barcode);

  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/employees/`).orderByChild("barcode").equalTo(barcode)
      .on('value', snapshot => {
        dispatch({ type: PRODUCT_BY_BARCODE, payload: snapshot.val() });
        Actions.productDetail();
      });
  };
};

export const employeeSave = ({ name, description, barcode, image, stock, uid }) => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/employees/${uid}`)
      .set({ name, description, barcode, image, stock })
      .then(() => {
        dispatch({ type: PRODUCT_SAVE_SUCCESS });
        Actions.pop();
      });
  };
};

export const employeeDelete = ({ uid }) => {
  const { currentUser } = firebase.auth();

  return () => {
    firebase.database().ref(`/users/${currentUser.uid}/employees/${uid}`)
      .remove()
      .then(() => {
        Actions.pop();
      });
  };
};
