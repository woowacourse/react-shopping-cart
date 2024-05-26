import { useRecoilState } from 'recoil';
import { remoteAreaState } from '../recoil';

export default function useRemoteAreaShipping() {
  const [isSelected, setSelected] = useRecoilState(remoteAreaState);
  const toggleSelected = () => {
    setSelected((prev) => !prev);
  };

  return {
    isSelected,
    toggleSelected,
  };
}
