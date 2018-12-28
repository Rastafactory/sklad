import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import firebase from 'firebase';
import ReduxThunk from 'redux-thunk';
import reducers from './reducers';
import LoginForm from './components/LoginForm';
import Router from './Router';

class App extends Component {
  componentWillMount() {
    const config = {
    apiKey: 'AIzaSyCRzAvbyvMVC34x0r6KXAJwg4fqCh7jc2w',
    authDomain: 'storage-b19a5.firebaseapp.com',
    databaseURL: 'https://storage-b19a5.firebaseio.com',
    projectId: 'storage-b19a5',
    storageBucket: 'storage-b19a5.appspot.com',
    messagingSenderId: '79683803224'
  };

  firebase.initializeApp(config);
  }

  render () {
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

    return (
      <Provider store={store}>
          <Router />
      </Provider>
    );
  }
}

export default App;
