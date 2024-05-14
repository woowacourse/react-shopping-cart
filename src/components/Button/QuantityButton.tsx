import BorderButton from './BorderButton';
import { FlexCenter } from '@/style/common.style';
import Minus from '@/assets/Minus.svg';
import Plus from '@/assets/Plus.svg';
import styled from '@emotion/styled';

interface Props {
  onClick: () => void;
}

export const PlusButton = ({ onClick }: Props) => {
  return (
    <BorderButton onClick={onClick}>
      <StyledImg src={Plus} alt="increase button" />
    </BorderButton>
  );
};

export const MinusButton = ({ onClick }: Props) => {
  return (
    <BorderButton onClick={onClick}>
      <StyledImg src={Minus} alt="decrease button" />
    </BorderButton>
  );
};

const StyledImg = styled.img`
  ${FlexCenter}
  width: 12px;
  height: 12px;
`;
