import { worker } from "./browser";

export const initMocks = async () => {
  if (typeof window !== "undefined") {
    await worker.start();
  }
};
