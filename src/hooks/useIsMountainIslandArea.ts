import { useRecoilState } from 'recoil';
import { isMountainIslandAreaState } from '../recoil/price/isMountainIslandAreaState';

const useIsMountainIslandArea = () => {
  const [isMountainIslandArea, setIsMountainIslandArea] = useRecoilState(isMountainIslandAreaState);

  const handleIsMountainIslandArea = () => {
    setIsMountainIslandArea((prev) => !prev);
  };

  const clearIsMountainIslandArea = () => {
    setIsMountainIslandArea(false);
  };

  return { handleIsMountainIslandArea, isMountainIslandArea, clearIsMountainIslandArea };
};

export default useIsMountainIslandArea;
