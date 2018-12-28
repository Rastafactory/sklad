import {
    PRODUCT_UPDATE,
    PRODUCT_CREATE,
    PRODUCT_SAVE_SUCCESS
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
      case PRODUCT_UPDATE:
        // action.payload === {prop: 'name', value: 'jane'}
        //this is not an array ...in tihis case it can be [action.payload.prop] = name
        return { ...state, [action.payload.prop]: action.payload.value };

      case PRODUCT_CREATE:
        return INITIAL_STATE;

      case PRODUCT_SAVE_SUCCESS:
        return INITIAL_STATE;
      default:
        return state;
    }
  };
