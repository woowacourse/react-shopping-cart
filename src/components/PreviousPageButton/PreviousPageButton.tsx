import { BackArrowIcon } from '../../assets';
import styled from '@emotion/styled';

interface PreviousPageButtonProps {
  onClick: () => void;
}

export default function PreviousPageButton({ onClick }: PreviousPageButtonProps) {
  return <Button onClick={onClick} />;
}

const Button = styled.button({
  width: '32px',
  height: '32px',
  background: `url(${BackArrowIcon}) no-repeat center`,
  backgroundSize: 'auto',
  cursor: 'pointer',
});
