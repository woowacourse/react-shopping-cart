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
        <S.TitleButton onClick={onClickTitle}>
          <Icon width="44" height="36" color="#FFF" path={CART_PATH} viewBox="0 0 51 44" />
          <S.Title>{title}</S.Title>
        </S.TitleButton>
        <CartRouteButton onClick={onClickCartButton!} />
      </S.Wrapper>
    </S.Header>
  );
};

const S = {
  Header: styled.header`
    width: 100%;
    height: 80px;
    position: fixed;
    z-index: 1;
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
    justify-content: space-between;
    max-width: 1270px;
    margin: 0 auto;
    padding: 0 20px;

    @media all and (max-width: 479px) {
      & > :nth-child(1) span {
        display: none;
      }
    }
  `,

  TitleButton: styled.button`
    background-color: transparent;
    cursor: pointer;
    color: #fff;
  `,

  Title: styled.span``,
};

export default Header;
