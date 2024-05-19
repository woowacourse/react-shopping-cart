function intersectionByProperty<T>(array1: T[], array2: T[], propertyName: keyof T): T[] {
  const set1 = new Set(array1.map(item => item[propertyName]));
  const set2 = new Set(array2.map(item => item[propertyName]));
  const result: T[] = [];

  set2.forEach(value => {
    if (set1.has(value)) {
      const commonItem = array2.find(item => item[propertyName] === value);
      if (commonItem) {
        result.push(commonItem);
      }
    }
  });

  return result;
}

export default intersectionByProperty;
