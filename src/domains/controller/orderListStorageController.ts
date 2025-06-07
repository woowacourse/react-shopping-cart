import { StorageController } from "@/shared/controller/StorageController";

export const orderListStorageController = new StorageController<number[]>(
  "orderList",
  window.localStorage
);
