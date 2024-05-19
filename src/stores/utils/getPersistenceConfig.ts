import { recoilPersist } from "recoil-persist";

export const getPersistenceConfig = (key: string) => {
  const { persistAtom } = recoilPersist({
    key,
    storage: localStorage,
  });

  return { persistAtom };
};
