import { delayClick } from './utils';
import { Meta, StoryObj } from '@storybook/react';
import { within } from '@storybook/testing-library';
import ProductCardList from 'components/ProductCardList/ProductCardList';
import { RecoilRoot } from 'recoil';
import { ThemeProvider } from 'styled-components';
import theme from 'styles/theme';

const meta = {
  tags: ['autodocs'],
  component: ProductCardList,
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme}>
        <RecoilRoot>
          <Story />
        </RecoilRoot>
      </ThemeProvider>
    ),
    (Story) => {
      window.localStorage.clear();

      return <Story />;
    },
  ],
} satisfies Meta<typeof ProductCardList>;

export default meta;

type Story = StoryObj<typeof meta>;

const mockProducts = [
  {
    id: 1,
    name: '순살치킨 해마로 1kg 냉동',
    price: 10800,
    imageUrl: 'https://cdn-mart.baemin.com/sellergoods/main/28786eaa-d9f0-456c-b318-07236fe17ab2.jpg?h=400&w=400',
  },
  {
    id: 2,
    name: '사조오양 치킨텐더 1000gx1개',
    price: 9900,
    imageUrl: 'https://cdn-mart.baemin.com/sellergoods/main/f9923d11-5ba9-4301-a73c-fc4817544f6a.jpg?h=400&w=400',
  },
  {
    id: 3,
    name: '사세통상 순살치킨가라아게(냉동 1kg/ea)',
    price: 10000,
    imageUrl: 'https://cdn-mart.baemin.com/sellergoods/main/ca728030-5e96-45f7-aa25-b7ebc0a1de7a.jpg?h=400&w=400',
  },
  {
    id: 4,
    name: '수월한 텐더스틱 10kg, 1kg * 10개',
    price: 86000,
    imageUrl: 'https://cdn-mart.baemin.com/sellergoods/main/47ea49b2-19c5-4c2b-a98a-7a4c6e9d241a.jpg?h=400&w=400',
  },
  {
    id: 5,
    name: '[먹깨비네] 진주햄 골드 스모크햄 1kgx1개(냉장)',
    price: 6700,
    imageUrl: 'https://cdn-mart.baemin.com/sellergoods/main/5abcf791-e088-4366-b7ab-72a6bff14032.jpg?h=400&w=400',
  },
  {
    id: 6,
    name: '아워홈 그릴드 치킨브레스트 1kg (냉장)',
    price: 15700,
    imageUrl: 'https://cdn-mart.baemin.com/sellergoods/main/20158780-0e9e-4bf4-a845-615caeeed86e.jpg?h=400&w=400',
  },
  {
    id: 7,
    name: '[택배]식자재왕 양념편육 430g',
    price: 11100,
    imageUrl: 'https://cdn-mart.baemin.com/sellergoods/main/5f74280a-d3f2-4122-8e6c-32f212495183.png?h=400&w=400',
  },
  {
    id: 8,
    name: '상도 닭똥집 튀김 1kg',
    price: 11600,
    imageUrl: 'https://cdn-mart.baemin.com/sellergoods/main/76233b02-8544-4adf-b8f6-37c4372050a7.jpg?h=400&w=400',
  },
  {
    id: 9,
    name: '에쓰푸드 통삼겹 차슈 700g',
    price: 18100,
    imageUrl: 'https://cdn-mart.baemin.com/sellergoods/main/c11eca86-6f22-4026-a6b7-c90233f41704.jpg?h=400&w=400',
  },
  {
    id: 10,
    name: '에쓰푸드 보스턴핫 소시지 300g',
    price: 3900,
    imageUrl: 'https://cdn-mart.baemin.com/sellergoods/main/87ccd2e5-37f1-4ee6-a8f5-17b60a6592f9.jpg?h=400&w=400',
  },
  {
    id: 11,
    name: '홍고추 100g',
    price: 2500,
    imageUrl: 'https://cdn-mart.baemin.com/sellergoods/main/f7d2521e-4e73-49f4-b7c9-15480ecd3fb5.jpg?h=400&w=400',
  },
  {
    id: 12,
    name: '냉동알감자(탈피 1Kg/EA)',
    price: 3080,
    imageUrl: 'https://cdn-mart.baemin.com/sellergoods/main/fdfed495-a5f1-4c97-b24a-3d93829dbd49.jpg?h=400&w=400',
  },
  {
    id: 13,
    name: '양상추 1개',
    price: 3900,
    imageUrl: 'https://cdn-mart.baemin.com/sellergoods/main/5bf92975-ffe4-4758-b131-52d561402e7b.jpg?h=300&w=300',
  },
  {
    id: 14,
    name: '깐마늘(대 1K)',
    price: 17900,
    imageUrl: 'https://cdn-mart.baemin.com/sellergoods/main/075e031d-cee3-48f1-b4f7-95f4d5c5c4a8.jpg?h=400&w=400',
  },
  {
    id: 15,
    name: '양파(햇양파,국내산)1.5kg',
    price: 3900,
    imageUrl: 'https://cdn-mart.baemin.com/sellergoods/main/7c21db47-014b-40d4-bef7-fd55f12d1d86.jpg?h=400&w=400',
  },
  {
    id: 16,
    name: '고수(200g/EA)',
    price: 5300,
    imageUrl: 'https://cdn-mart.baemin.com/sellergoods/main/17703033-3a78-4d8d-b65d-03fba822333e.jpg?h=400&w=400',
  },
  {
    id: 17,
    name: '청양고추 1kg',
    price: 6500,
    imageUrl: 'https://cdn-mart.baemin.com/sellergoods/main/915ff638-bdc4-48f2-b887-8ed07ed543d2.jpg?h=400&w=400',
  },
  {
    id: 18,
    name: '다진 마늘 1kg(간마늘)',
    price: 2200,
    imageUrl: 'https://cdn-mart.baemin.com/sellergoods/main/b74b7cfa-4cbc-49df-b500-720e1a86a652.jpg?h=400&w=400',
  },
  {
    id: 19,
    name: '국내산 부추',
    price: 5200,
    imageUrl: 'https://cdn-mart.baemin.com/sellergoods/main/dd885cd8-0176-40fc-ae19-94ec6a36804e.jpg?h=400&w=400',
  },
  {
    id: 20,
    name: '새싹채소 500그램',
    price: 6500,
    imageUrl: 'https://cdn-mart.baemin.com/sellergoods/main/e92ffe11-2f1d-4be6-934b-d5c28e046ccb.jpg?h=400&w=400',
  },
];

export const Default: Story = {
  args: {
    products: mockProducts,
  },
};

export const Interaction: Story = {
  args: {
    products: mockProducts,
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    const addCartButton0 = canvas.getAllByTestId('addCartButton')[0];
    const addCartButton1 = canvas.getAllByTestId('addCartButton')[1];

    await step('첫번째 상품의 장바구니 버튼을 클릭하여 상품 하나를 장바구니에 넣는다.', async () => {
      await delayClick(addCartButton0);
    });

    const increaseButton = canvas.getAllByRole('button')[1];
    await step('첫번째 상품을 두개를 추가로 장바구니에 넣는다.', async () => {
      await delayClick(increaseButton);
      await delayClick(increaseButton);
    });

    await step('두번째 상품의 장바구니 버튼을 클릭하여 상품 하나를 장바구니에 넣는다.', async () => {
      await delayClick(addCartButton1);
    });
  },
};
