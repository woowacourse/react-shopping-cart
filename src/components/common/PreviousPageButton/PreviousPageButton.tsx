import * as Styled from './PreviousPageButton.style';

interface PreviousPageButtonProps {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function PreviousPageButton({ onClick }: PreviousPageButtonProps) {
  return <Styled.PreviousPageButton type="button" onClick={onClick} />;
}
