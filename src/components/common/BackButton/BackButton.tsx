import { BackArrow } from '@assets/index';
import * as Styled from './BackButton.styled';

const BackButton: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({ ...props }) => {
  return (
    <Styled.BackButton {...props}>
      <BackArrow />
    </Styled.BackButton>
  );
};

export default BackButton;
