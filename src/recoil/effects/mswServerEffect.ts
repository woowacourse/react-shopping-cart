import type { AtomEffect } from 'recoil';
import mockServerClient from '../../api';

const mswServerEffect: <T>(path: string) => AtomEffect<T> =
  (path) =>
  ({ setSelf, trigger }) => {
    // If there's a persisted value - set it on load
    const loadPersisted = async () => {
      const data = await mockServerClient.get(path);
      const savedValue = data.response;

      if (savedValue != null) {
        setSelf(savedValue);
      }
    };

    if (trigger === 'get') {
      loadPersisted();
    }
  };

export default mswServerEffect;
