import styled from "styled-components";

export interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  disabled?: boolean;
}

export default function ApplyCouponButton({
  disabled = false,
  onClick,
}: ButtonProps) {
  return (
    <S.Button disabled={disabled} onClick={onClick}>
      쿠폰 적용
    </S.Button>
  );
}

const S = {
  Button: styled.button`
    height: 48px;
    cursor: pointer;
    font-weight: 700;
    font-size: 15px;
    border-radius: 5px;
    border: 1px solid #33333340;
    color: #333333bf;
  `,
};
