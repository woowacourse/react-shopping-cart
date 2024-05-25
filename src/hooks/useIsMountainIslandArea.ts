import { useRecoilState } from 'recoil';
import { isMountainIslandAreaState } from '../recoil/price/isMountainIslandAreaState';

const useIsMountainIslandArea = () => {
  const [isMountainIslandArea, setIsMountainIslandArea] = useRecoilState(isMountainIslandAreaState);

  const handleIsMountainIslandArea = () => {
    setIsMountainIslandArea((prev) => !prev);
  };

  return { handleIsMountainIslandArea, isMountainIslandArea };
};

export default useIsMountainIslandArea;
