import { KEY } from "../constants/storage";
import { BaseStorageDataType, StorageKeyType } from "../types/storage";
import storageClient from "./storageClient";

const storageService = {
  getStoredData<T>(key: StorageKeyType): T[] {
    const data = storageClient.getData<T[]>(KEY[key]);
    return data ?? [];
  },

  addData<T>(key: StorageKeyType, newData: T): void {
    const totalStoredData = this.getStoredData<T>(key);
    const newDataList = [...totalStoredData, newData];
    storageClient.setData<T[]>(KEY[key], newDataList);
  },

  updateData<T extends BaseStorageDataType>(
    key: StorageKeyType,
    updatedData: T
  ): void {
    const totalStoredData = this.getStoredData<T>(key);
    const newDataList = totalStoredData.map((item) =>
      item.id === updatedData.id ? updatedData : item
    );
    storageClient.setData<T[]>(KEY[key], newDataList);
  },

  deleteData<T extends BaseStorageDataType>(
    key: StorageKeyType,
    targetId: number
  ): void {
    const totalStoredData = this.getStoredData<T>(key);
    const newDataList = totalStoredData.filter((item) => item.id !== targetId);
    storageClient.setData<T[]>(KEY[key], newDataList);
  },

  isDataInStorage<T extends BaseStorageDataType>(
    key: StorageKeyType,
    targetId: number
  ): boolean {
    const totalStoredData = this.getStoredData<T>(key);
    return totalStoredData.some((item) => item.id === targetId);
  },
};

export default storageService;
