import { Meta } from '@storybook/react';
import ProductItemComponent from '../../components/main/ProductItem';
import { RecoilRoot } from 'recoil';
import { styled } from 'styled-components';

const meta = {
  component: ProductItemComponent,
  title: 'Components/ProductItem',
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
    id: 1,
    name: 'PET보틀-정사각(370ml)',
    price: 41000,
    imgUrl: `${process.env.PUBLIC_URL}/assets/product1.svg`,
  },
  argTypes: {},
} satisfies Meta<typeof ProductItemComponent>;

export default meta;

export const ProductItem = (args: any) => {
  return (
    <S.Wrapper>
      <ProductItemComponent id={args.id} name={args.name} price={args.price} imgUrl={args.imgUrl} />
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
    width: 50%;
    height: auto;
  `,
};
