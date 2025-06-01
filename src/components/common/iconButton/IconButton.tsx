import { ComponentProps } from 'react';
import * as S from './IconButton.styles';

interface IconButtonProps {
  iconSrc: string;
  alt?: string;
}

function IconButton({
  iconSrc,
  alt,
  ...props
}: IconButtonProps & ComponentProps<'button'>) {
  return (
    <S.Container {...props}>
      <img src={iconSrc} alt={alt} />
    </S.Container>
  );
}

export default IconButton;
