export const snakeToCamel = (string: string): string => {
  return string.replace(/(_[A-Za-z])+/g, (character) => character[1].toUpperCase());
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const toCamelCaseKeyObjectArray = (target: Record<string, unknown>[]): any => {
  return target.map((item) => {
    let newObject = {};

    Object.entries(item).forEach(([key, value]) => {
      const camelizedKey = snakeToCamel(key);

      newObject = { ...newObject, [camelizedKey]: value };
    });

    return newObject;
  });
};
