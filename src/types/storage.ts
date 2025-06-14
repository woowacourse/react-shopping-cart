import { KEY } from "../constants/storage";

export type StorageKeyType = keyof typeof KEY;

export interface BaseStorageDataType {
  id: number;
}

export interface StorageSelectDataType extends BaseStorageDataType {
  isSelected: boolean;
}
