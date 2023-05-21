export const getLocalStorage = <T extends unknown>(key: string): T | [] => {
  try {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : [];
  } catch (error) {
    if (error instanceof Error) console.error(error.message);
    return [];
  }
};

export const updateLocalStorage = <T extends unknown>(key: string, valueToStore: T) => {
  try {
    if (typeof window === 'undefined') throw new Error('Cannot store Value');
    localStorage.setItem(key, JSON.stringify(valueToStore));
  } catch (error) {
    if (error instanceof Error) console.error(error.message);
  }
};
