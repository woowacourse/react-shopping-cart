import * as S from './CartHeader.styles';

interface CartHeaderProps {
  title: string;
  cartTypeQuantity: number;
  content: React.ReactNode;
}

export default function CartHeader({ title, cartTypeQuantity, content }: CartHeaderProps) {
  return (
    <S.CartHeaderContainer>
      <S.CartHeaderTitle>{title}</S.CartHeaderTitle>
      {cartTypeQuantity > 0 && <S.CartHeaderContent>{content}</S.CartHeaderContent>}
    </S.CartHeaderContainer>
  );
}
