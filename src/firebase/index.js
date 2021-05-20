import firebase from 'firebase/app';
import 'firebase/firestore';

export const PRODUCT_LIST = 'ProductList';
export const ORDER_LIST = 'OrderList';

export const ASC = 'asc';
export const DESC = 'desc';

export const ORDER_ID = 'orderId';

const config = {
  apiKey: 'AIzaSyAY9up5-vA-fWCY6pjoPaZWH2aaHb4nXwk',
  authDomain: 'simba-haru-s-happy-shopping.firebaseapp.com',
  projectId: 'simba-haru-s-happy-shopping',
  storageBucket: 'simba-haru-s-happy-shopping.appspot.com',
  messagingSenderId: '7196045342',
  appId: '1:7196045342:web:1b447ef2250dce59563e0f',
};

firebase.initializeApp(config);

const db = firebase.firestore();

export const loadData = async ({ table }) => {
  try {
    const response = await db.collection(table).get();
    return response.docs.map((doc) => doc.data());
  } catch (e) {
    console.error(e);
  }
};

export const loadSortedData = async ({ table, sortField = '', sortDirection = ASC }) => {
  try {
    const response = await db.collection(table).orderBy(sortField, sortDirection).get();
    return response.docs.map((doc) => doc.data());
  } catch (e) {
    console.error(e);
  }
};

export const addData = async ({ table, key, value }) => {
  try {
    db.collection(table).doc(key).set(value);
  } catch (e) {
    console.error(e);
    throw new Error(e);
  }
};
