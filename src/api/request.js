import { SCHEMA } from '../constants';
import { firestore } from '../firebase';

const collection = {
  [SCHEMA.PRODUCT]: firestore.collection(SCHEMA.PRODUCT),
  [SCHEMA.ORDER]: firestore.collection(SCHEMA.ORDER),
  [SCHEMA.SHOPPING_CART]: firestore.collection(SCHEMA.SHOPPING_CART),
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
