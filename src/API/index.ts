import { firestore } from './firebase';

type Collection = 'productionList';

const APIClient = {
  async getAll<T>(collection: Collection) {
    const result: T[] = [];
    const docRef = await firestore.collection(collection).get();

    docRef.forEach((doc) => result.push(doc.data() as T));

    return result;
  },
};

export default APIClient;
