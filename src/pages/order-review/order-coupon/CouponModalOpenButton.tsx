import BaseButton from '@/components/common/Button';
import { css } from '@emotion/react';

interface CouponModalOpenButtonProps {
  handleClick: () => void;
  children?: React.ReactNode;
}

const CouponModalOpenButton = ({
  handleClick,
  children,
}: CouponModalOpenButtonProps) => {
  return (
    <BaseButton onClick={handleClick} css={CouponModalOpenButtonStyle}>
      {children}
    </BaseButton>
  );
};

export default CouponModalOpenButton;

const CouponModalOpenButtonStyle = css`
  width: 100%;
  height: 40px;
  padding: 8px 0;
  font-size: 14px;
  font-weight: 500;
  color: #333333bf;
  background-color: #ffffff;
  border-radius: 4px;
  border: 1px solid #33333340;
  cursor: pointer;

  &:hover {
    background-color: #dfdfdf40;
  }

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;
