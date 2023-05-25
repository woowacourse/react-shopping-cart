import { ChangeEvent } from 'react';
import { Link } from 'react-router-dom';

import { styled } from 'styled-components';

import { CartSize } from './CartSize';

import { CartLogo } from '../assets/svg';
import { useApiBaseUrlState } from '../recoils/recoilApiBaseUrl';

export const Header = () => {
  const [apiUrlkey, setApiUrlKey] = useApiBaseUrlState();

  const onChange = ({ target: { value } }: ChangeEvent<HTMLSelectElement>) => {
    setApiUrlKey(value);
  };

  return (
    <Style.Container>
      <Style.Content>
        <Style.Title to="/">
          <CartLogo fill="var(--grey-100)" style={{ width: '40px' }} />
        </Style.Title>
        <Style.RightWrapper>
          <Style.Selector onChange={onChange} value={apiUrlkey}>
            <option value="이리내">이리내</option>
            <option value="채채">채채</option>
          </Style.Selector>
          <Style.CartLink to="/shopping-cart">
            <CartSize />
          </Style.CartLink>
        </Style.RightWrapper>
      </Style.Content>
    </Style.Container>
  );
};

const Style = {
  Container: styled.div`
    position: fixed;

    display: flex;
    justify-content: center;
    align-items: center;

    padding: 0px 16px;

    width: 100vw;
    height: 80px;
    background-color: var(--grey-500);

    color: var(--grey-100);

    z-index: 100;
  `,

  Content: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    width: 1263px;
  `,

  Title: styled(Link)`
    display: flex;
    align-items: center;

    font-size: 32px;
    font-weight: 900;

    &::after {
      content: 'SHOP';
      padding-left: 12px;
    }
  `,

  RightWrapper: styled.div`
    display: flex;
    align-items: center;
  `,

  Selector: styled.select`
    height: 42px;
    width: 102px;

    font-size: 16px;
    margin-right: 30px;
  `,

  CartLink: styled(Link)`
    display: flex;
    align-items: center;

    font-weight: 500;

    &::before {
      content: '장바구니';
      padding-right: 6px;
    }
  `,
};
