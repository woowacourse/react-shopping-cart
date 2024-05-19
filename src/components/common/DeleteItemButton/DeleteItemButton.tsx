import * as Styled from './DeleteItemButton.style';

interface DeleteItemButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  buttonText: string;
}

export default function DeleteItemButton({ buttonText, ...props }: DeleteItemButtonProps) {
  return <Styled.DeleteItemButton {...props}>{buttonText}</Styled.DeleteItemButton>;
}
