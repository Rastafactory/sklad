import {
    PRODUCT_BY_BARCODE
  } from '../actions/types';

  const INITIAL_STATE = {
    name: '',
    description: '',
    shift: '',
    barcode: '',
    image: 'https://firebasestorage.googleapis.com/v0/b/storage-b19a5.appspot.com/o/images%2Fno_photo.JPG?alt=media&token=d539d3bf-a4c7-44b1-aa50-e26577cec4c6',
    stock: 0
  };

  export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case PRODUCT_BY_BARCODE:
        return action.payload ;
      default:
        return state;
    }
  };
