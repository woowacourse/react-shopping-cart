import styled from '@emotion/styled';

type OpenCouponModalButtonProps = {
  onClick: () => void;
};

const OpenCouponModalButton = ({ onClick }: OpenCouponModalButtonProps) => {
  return <S.Button onClick={onClick}>쿠폰 적용</S.Button>;
};

export default OpenCouponModalButton;

const S = {
  Button: styled.button`
    min-height: 40px;
    color: #000000;
    font-size: 16px;
    background-color: #ffffff;
    cursor: pointer;
    border: 1px solid #bebebe;
    border-radius: 8px;
  `,
};
