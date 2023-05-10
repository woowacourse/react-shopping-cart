import { RecoilRoot, useRecoilState } from 'recoil';
import { Header } from '../layout/header/Header';
import { Meta } from '@storybook/react';
import { cartListState } from '../App';
import styled from 'styled-components';

const meta = {
  title: 'Header',
  component: Header,
  decorators: [
    (Story) => {
      return <RecoilRoot>{Story()}</RecoilRoot>;
    },
  ],
} as Meta;

export default meta;

export const HeaderComponent = () => {
  return (
    <>
      <Header />
      <Counter />
    </>
  );
};

const Counter = () => {
  const [, setCartList] = useRecoilState(cartListState);
  return (
    <>
      <Button
        onClick={() => {
          setCartList((current) => [...current, 1]);
        }}
      >
        장바구니 추가
      </Button>
      <Button
        onClick={() => {
          setCartList((current) => current.slice(0, -1));
        }}
      >
        장바구니 빼기
      </Button>
    </>
  );
};

const Button = styled.button`
  margin-top: 120px;
`;
