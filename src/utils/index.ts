type NestedObject = Record<string, unknown>;
type NestedType = NestedObject | NestedObject[];

const toCamel = (s: string) => {
  return s.replace(/([-_][a-z])/gi, ($1) => {
    return $1.toUpperCase().replace('-', '').replace('_', '');
  });
};

const isArray = (array: unknown) => Array.isArray(array);
const isObject = (obj: unknown) => obj === Object(obj) && !isArray(obj) && typeof obj !== 'function';

export const keysToCamel = (obj: NestedType): unknown => {
  if (isObject(obj)) {
    const n: NestedObject = {};

    Object.keys(obj as NestedObject).forEach((key) => {
      n[toCamel(key)] = keysToCamel((obj as NestedObject)[key] as NestedType);
    });

    return n;
  }

  if (isArray(obj)) {
    return (obj as NestedObject[]).map((i: unknown) => keysToCamel(i as NestedType));
  }

  return obj;
};
