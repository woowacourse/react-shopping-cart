import { firestore } from '../firebase';

const collection = {
  productList: firestore.collection('productList'),
  orderList: firestore.collection('orderList'),
  shoppingCart: firestore.collection('shoppingCart'),
};

const requestTable = {
  GET: async (ref, targetId) => {
    if (targetId) {
      return (await collection[ref].doc(targetId).get()).data();
    }
    return (await collection[ref].get()).docs.map(doc => ({ id: doc.id, ...doc.data() }));
  },
  POST: async (ref, content) => collection[ref].add(content),
  PUT: async (ref, targetId, content) => collection[ref].doc(targetId).update(content),
  DELETE: async (ref, targetId) => collection[ref].doc(targetId).delete(),
};

export { requestTable };
