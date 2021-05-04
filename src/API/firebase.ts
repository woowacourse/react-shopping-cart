import firebase from 'firebase';
import 'firebase/firestore';

const config = {
  apiKey: 'AIzaSyD7gOCNCY-XfJwB0vaBvCXZDTBZlMSZYG0',
  authDomain: 'wtc-react-shopping-cart.firebaseapp.com',
  projectId: 'wtc-react-shopping-cart',
  storageBucket: 'wtc-react-shopping-cart.appspot.com',
  messagingSenderId: '834801451836',
  appId: '1:834801451836:web:74d5bac2a46d08603f9439',
};

firebase.initializeApp(config);

export const firestore = firebase.firestore();
