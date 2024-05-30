import { BackArrowIcon } from '../../../assets';
import * as Styled from './PreviousPageButton.style';

interface PreviousPageButtonProps {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function PreviousPageButton({ onClick }: PreviousPageButtonProps) {
  return (
    <Styled.PreviousPageButton type="button" onClick={onClick}>
      <img src={BackArrowIcon} alt="이전 화면으로 돌아가기" />
    </Styled.PreviousPageButton>
  );
}
