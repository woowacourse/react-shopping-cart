import styled, { css } from 'styled-components';
import Icon from './Icon';
import { CART_PATH } from '../../constants/svgPath';

interface Props {
  title: string;
}

const Header = ({ title }: Props) => {
  return (
    <S.Header>
      <Icon
        width="50"
        height="44"
        color="#FFF"
        path={CART_PATH}
        viewBox="0 0 51 44"
        svgStyle={svgStyle}
      />
      <span>{title}</span>
    </S.Header>
  );
};

const S = {
  Header: styled.header`
    display: flex;
    width: 100%;
    height: 80px;
    margin-bottom: 62px;
    padding-top: 10px;
    background: var(--text-color);
    font-size: 40px;
    font-weight: 900;
    color: #fff;

    & svg {
      margin: 0 20px 0 210px;
    }
  `,
};

const svgStyle = css``;

export default Header;
