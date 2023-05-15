import styled from 'styled-components';
import Icon from './Icon';
import { CART_PATH } from '../../constants/svgPath';
import Cart from '../Cart';

interface Props {
  title: string;
}

const Header = ({ title }: Props) => {
  return (
    <S.Header>
      <S.Wrapper>
        <Icon width="44" height="36" color="#FFF" path={CART_PATH} viewBox="0 0 51 44" />
        <span>{title}</span>
        <Cart />
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
    color: #fff;

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
};

export default Header;
