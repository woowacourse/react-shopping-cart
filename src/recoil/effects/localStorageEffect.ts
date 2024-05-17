export const localStorageEffect =
  (key: string) =>
  ({ setSelf, onSet }: any) => {
    const savedValue = localStorage.getItem(key);
    if (savedValue != null) {
      setSelf(JSON.parse(savedValue));
    } else {
      setSelf(JSON.parse('[]')); // TODO: effect있을 수 있음
    }

    onSet((newValue: any, _: any, isReset: boolean) => {
      isReset ? localStorage.removeItem(key) : localStorage.setItem(key, JSON.stringify(newValue));
    });
  };
