import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAXzzQq5ujPGoXrGpxy3qG04XdUpm0dzcM',
  authDomain: 'react-shopping-cart-6509f.firebaseapp.com',
  projectId: 'react-shopping-cart-6509f',
  storageBucket: 'react-shopping-cart-6509f.appspot.com',
  messagingSenderId: '850224930398',
  appId: '1:850224930398:web:9f7559b116f0fbf9101ecf',
  measurementId: 'G-DBWVTKQ6WE',
};

firebase.initializeApp(firebaseConfig);

const firestore = firebase.firestore();

export { firestore };
