import { recoilPersist } from "recoil-persist";

const getPersistenceConfig = (key: string) => {
  const { persistAtom } = recoilPersist({
    key,
    storage: localStorage,
  });

  return { persistAtom };
};

export default getPersistenceConfig;
