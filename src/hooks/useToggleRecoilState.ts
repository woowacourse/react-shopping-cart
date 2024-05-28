import { RecoilState, useRecoilState } from "recoil";

const useToggleRecoilState = (recoilState: RecoilState<boolean>) => {
  const [isActive, setIsActive] = useRecoilState(recoilState);

  const toggleActiveState = () =>
    setIsActive((prevActiveState) => !prevActiveState);

  return { isActive, toggleActiveState };
};

export default useToggleRecoilState;
