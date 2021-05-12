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

// TODO 에러 처리
export const loadData = async ({ table, handler }) => {
  const response = await db.collection(table).get();
  handler(response.docs.map((doc) => doc.data()));
};

// TODO 에러 처리
export const loadSortedData = async ({ table, handler, sortField = '', sortDirection = ASC }) => {
  const response = await db.collection(table).orderBy(sortField, sortDirection).get();
  handler(response.docs.map((doc) => doc.data()));
};

// TODO 에러 처리
export const addData = async ({ table, key, value }) => {
  db.collection(table).doc(key).set(value);
};
