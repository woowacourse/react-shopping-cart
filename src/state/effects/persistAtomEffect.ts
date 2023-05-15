import { AtomEffect } from 'recoil';

type Persister = {
  getItem: (key: string) => string | null;
  setItem: (key: string, value: string) => void;
};

type PersistAtomEffectParams<T> = {
  key: string;
  initialValue: T;
  options: {
    persister?: Persister;
    serializer?: (value: T) => string;
    deserializer?: (serializedValue: string) => T;
  };
};

const persistAtomEffect =
  <T>({ key, initialValue, options }: PersistAtomEffectParams<T>): AtomEffect<T> =>
  ({ onSet, setSelf, trigger }) => {
    const { persister = localStorage, serializer = JSON.stringify, deserializer = JSON.parse } = options;

    if (trigger === 'get') {
      const storedValue = persister.getItem(key);
      const state = storedValue ? deserializer(storedValue) : initialValue;

      setSelf(state);
    }

    onSet((newValue) => {
      persister.setItem(key, serializer(newValue));
    });
  };

export default persistAtomEffect;
