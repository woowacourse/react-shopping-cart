/* eslint-disable import/prefer-default-export */
const toCamel = (s: string) => {
  return s.replace(/([-_][a-z])/gi, ($1) => {
    return $1.toUpperCase().replace('-', '').replace('_', '');
  });
};

const isArray = (a: unknown) => Array.isArray(a);

const isObject = (o: unknown) => o === Object(o) && !isArray(o) && typeof o !== 'function';

type NestedObject = Record<string, unknown>;
type NestedType = NestedObject | NestedObject[];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const snakeToCamel = (o: NestedType): any => {
  if (isObject(o)) {
    const n: NestedObject = {};

    Object.keys(o as NestedObject).forEach((k) => {
      n[toCamel(k)] = snakeToCamel((o as NestedObject)[k] as NestedType);
    });

    return n;
  }

  if (isArray(o)) {
    return (o as NestedObject[]).map((i: unknown) => snakeToCamel(i as NestedType));
  }

  return o;
};

export default snakeToCamel;
