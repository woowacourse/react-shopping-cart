export const getFormattedAsKRW = (number) => {
  return Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' }).format(number);
};

export const getDateInNumber = () => {
  const date = new Date();
  const YYYY = date.getFullYear().toString();
  const MM = date.getMonth().toString().padStart(2, '0');
  const DD = date.getDate().toString().padStart(2, '0');
  const hh = date.getHours().toString().padStart(2, '0');
  const mm = date.getMinutes().toString().padStart(2, '0');
  const ss = date.getSeconds().toString().padStart(2, '0');

  return `${YYYY}-${MM}-${DD}-${hh}${mm}${ss}`;
};

export const snakeToCamel = (strInSnakeCase) => {
  let strInCamelCase = '';

  for (let i = 0; i < strInSnakeCase.length; i++) {
    const char = strInSnakeCase[i];

    if (char === '_') {
      const nextChar = strInSnakeCase[i + 1];

      strInCamelCase += nextChar.toUpperCase();
      i++;
      continue;
    }
    strInCamelCase += char;
  }
  return strInCamelCase;
};

export const deepCamelize = (obj) => {
  if (Array.isArray(obj)) {
    return obj.map((entity) => deepCamelize(entity));
  }

  const entries = Object.entries(obj).map(([key, value]) => {
    if (typeof value === 'object') {
      return [snakeToCamel(key), deepCamelize(value)];
    }
    return [snakeToCamel(key), value];
  });

  return Object.fromEntries(entries);
};

export const camelToSnake = (strInCamelCase) => {
  let strInSnakeCase = '';

  for (let i = 0; i < strInCamelCase.length; i++) {
    const char = strInCamelCase[i];

    if (char.toUpperCase() === char) {
      strInSnakeCase += '_' + char.toLowerCase();
      continue;
    }
    strInSnakeCase += char;
  }
  return strInSnakeCase;
};

export const deepDecamelize = (obj) => {
  if (Array.isArray(obj)) {
    return obj.map((entity) => deepDecamelize(entity));
  }

  const entries = Object.entries(obj).map(([key, value]) => {
    if (typeof value === 'object') {
      return [camelToSnake(key), deepDecamelize(value)];
    }
    return [camelToSnake(key), value];
  });

  return Object.fromEntries(entries);
};
