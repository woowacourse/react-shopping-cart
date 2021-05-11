import firebase from 'firebase/app';
import 'firebase/firestore';

const config = {
  apiKey: 'AIzaSyAY9up5-vA-fWCY6pjoPaZWH2aaHb4nXwk',
  authDomain: 'simba-haru-s-happy-shopping.firebaseapp.com',
  projectId: 'simba-haru-s-happy-shopping',
  storageBucket: 'simba-haru-s-happy-shopping.appspot.com',
  messagingSenderId: '7196045342',
  appId: '1:7196045342:web:1b447ef2250dce59563e0f',
};

firebase.initializeApp(config);

export const firestore = firebase.firestore();

export const PRODUCT_LIST_COLLECTION = 'ProductList';
export const ORDER_LIST_COLLECTION = 'OrderList';

export const loadData = async (handleResponse, collectionName) => {
  const response = await firestore.collection(collectionName).get();
  handleResponse(response.docs.map((doc) => doc.data()));
};
