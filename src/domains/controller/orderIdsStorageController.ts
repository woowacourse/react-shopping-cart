import { StorageController } from "@/shared/controller/StorageController";

export const orderIdsStorageController = new StorageController<number[]>(
  "orderIds",
  window.localStorage
);
