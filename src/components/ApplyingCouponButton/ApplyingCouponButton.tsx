import { useSetRecoilState } from 'recoil';
import * as Styled from './style';
import { isApplyingCouponModalOpenState } from '../../recoil/atoms';

const ApplyingCouponButton = () => {
  const setIsApplyingCouponModalOpen = useSetRecoilState(
    isApplyingCouponModalOpenState,
  );

  const handleOnClick = () => setIsApplyingCouponModalOpen(true);

  return (
    <Styled.ApplyingCouponButton onClick={handleOnClick}>
      쿠폰 적용
    </Styled.ApplyingCouponButton>
  );
};

export default ApplyingCouponButton;
