import { LOCAL_STORAGE_KEY } from "@/constants";

export const toggleCheck = (id: number, isCheck: boolean) => {
  const localData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) ?? "{}");
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify({ ...localData, [id]: isCheck }));
};

export const deleteCheck = (id: number) => {
  const localData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) ?? "{}");
  delete localData[id];
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(localData));
};
