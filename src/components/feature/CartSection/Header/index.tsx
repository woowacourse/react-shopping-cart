import * as S from './Header.styles';

type Props = {
  title: string;
  description: string;
};

const Header = ({title, description}: Props) => {
  return (
    <S.Container>
      <S.Title>{title}</S.Title>
      <S.Description>{description}</S.Description>
    </S.Container>
  );
};

export default Header;
