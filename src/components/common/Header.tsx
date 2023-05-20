import styled from 'styled-components';
import Icon from './Icon';
import { CART_PATH } from '../../constants/svgPath';
import CartRouteButton from '../main/CartRouteButton';

interface Props {
  title: string;
  onClickCartButton?: () => void;
  onClickTitle?: () => void;
}

const Header = ({ title, onClickTitle, onClickCartButton }: Props) => {
  return (
    <S.Header>
      <S.Wrapper>
        <Icon width="44" height="36" color="#FFF" path={CART_PATH} viewBox="0 0 51 44" />
        <S.TitleButton onClick={onClickTitle}>{title}</S.TitleButton>
        <CartRouteButton onClick={onClickCartButton!} />
      </S.Wrapper>
    </S.Header>
  );
};

const S = {
  Header: styled.header`
    width: 100%;
    height: 80px;
    margin-bottom: 62px;
    background: var(--text-color);
    font-size: 36px;
    font-weight: 900;
    line-height: 80px;
    letter-spacing: 0.1px;

    & svg {
      margin-right: 20px;
    }
  `,

  Wrapper: styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    max-width: 1270px;
    margin: 0 auto;
    padding: 0 20px;
  `,
  TitleButton: styled.button`
    color: #fff;
    background-color: transparent;
    cursor: pointer;
  `,
};

export default Header;
