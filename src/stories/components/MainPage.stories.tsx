import { Meta } from '@storybook/react';
import { RecoilRoot } from 'recoil';
import { styled } from 'styled-components';
import Header from '../../components/common/Header';
import ProductList from '../../components/main/ProductList';

const meta = {
  component: ProductList,
  title: 'Components/MainPage',
  tags: ['autodocs'],
  decorators: [
    (Story) => {
      return (
        <RecoilRoot>
          <S.StoryWrapper>
            <Story />
          </S.StoryWrapper>
        </RecoilRoot>
      );
    },
  ],
  args: {

  },
  argTypes: {},
} satisfies Meta<typeof ProductList>;

export default meta;

export const Main = (args: any) => {
  return (
    <S.Wrapper>
      <Header title="STORE" onClickCartButton={() => {}} />
      <ProductList />
    </S.Wrapper>
  );
};

const S = {
  StoryWrapper: styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    width: calc(100vw - 32vw);
  `,

  Wrapper: styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: auto;
  `,
};
