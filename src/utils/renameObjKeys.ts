type ObjType = {
  [key: string]: string;
};

type KeyList = [key: string, newKey: string];

const clone = (obj: object): ObjType => Object.assign({}, obj);

export const renameObjKeys = (object: object, keyList: KeyList[]) => {
  const clonedObj = clone(object);

  keyList.forEach(([key, newKey]) => {
    const targetKey = clonedObj[key];

    delete clonedObj[key];
    clonedObj[newKey] = targetKey;
  });

  return clonedObj;
};
