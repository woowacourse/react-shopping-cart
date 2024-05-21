import { ButtonHTMLAttributes } from 'react';
import * as S from './ShowModalButton.style';

interface ShowModalButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  content: string;
  onClick: () => void;
}

function ShowModalButton({ content, onClick, ...rest }: ShowModalButtonProps) {
  return (
    <S.Layout onClick={onClick} {...rest}>
      {content}
    </S.Layout>
  );
}

export default ShowModalButton;
