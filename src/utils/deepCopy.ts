const deepCopy = <T>(obj: T): T => {
  if (typeof window !== 'undefined' && 'structuredClone' in self) {
    return self.structuredClone(obj);
  } else {
    return JSON.parse(JSON.stringify(obj));
  }
};

export default deepCopy;
