import { ReactNode } from 'react';
import * as Styled from './BottomButton.styled';

const BottomButton: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement> & { children: ReactNode }> = (props) => {
  return <Styled.BottomButton>{props.children}</Styled.BottomButton>;
};
export default BottomButton;
