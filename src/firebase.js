import firebase from 'firebase/app';
import 'firebase/firestore';
import { SCHEMA } from './constants';
import mockData from './test/mockData.json';

const firebaseConfig = {
  apiKey: 'AIzaSyAMOeYg3Z4rve_ayjWXifc7eGM_C7JUjjo',
  authDomain: 'doby-react-shopping-cart.firebaseapp.com',
  projectId: 'doby-react-shopping-cart',
  storageBucket: 'doby-react-shopping-cart.appspot.com',
  messagingSenderId: '597867993730',
  appId: '1:597867993730:web:daa41ec94188e916cd729b',
  measurementId: 'G-P45WL17LRV',
};

firebase.initializeApp(firebaseConfig);

const firestore = firebase.firestore();

const initFirebaseState = () => {
  mockData.productList.forEach((product, index) => firestore.collection(SCHEMA.PRODUCT).doc(`${index}`).set(product));
};

/** init Firebase State Once */
// initFirebaseState();

export { firestore, initFirebaseState };
