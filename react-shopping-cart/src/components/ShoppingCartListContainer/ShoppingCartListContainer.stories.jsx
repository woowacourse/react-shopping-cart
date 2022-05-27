import ShoppingCartListContainer from './ShoppingCartListContainer.component';

export default {
  title: 'Components/ShoppingCartListContainer',
  component: ShoppingCartListContainer,
};

export const FilledShoppingCartListContainer = args => <ShoppingCartListContainer {...args} />;
FilledShoppingCartListContainer.args = {
  data: [
    {
      id: 1,
      thumbnail: 'https://cdn-mart.baemin.com/sellergoods/bulk/20220502-173334/12619-main-01.jpg',
      name: '[든든] 서버산 고기',
      price: 6390,
    },
    {
      id: 2,
      thumbnail: 'https://cdn-mart.baemin.com/sellergoods/bulk/20211125-103919/12614-main-01.jpg',
      name: '[든든] 베이컨 라이트 1kg',
      price: 17210,
    },
    {
      id: 3,
      thumbnail:
        'https://cdn-mart.baemin.com/sellergoods/main/a3ce66f9-fcb1-48d4-a0e8-97ab69fc16e8.jpg',
      name: '[든든] 팜프리츠 슈스트링 7mm 2kg',
      price: 6250,
    },
    {
      id: 4,
      thumbnail: 'https://cdn-mart.baemin.com/sellergoods/bulk/20220502-173334/12620-main-01.jpg',
      name: '[든든] 전지베이컨 20mm 탑핑 1kg',
      price: 12910,
    },
    {
      id: 5,
      thumbnail:
        'https://cdn-mart.baemin.com/sellergoods/main/c7e706b8-b23a-4f87-9c1b-b4f27967ece4.jpg',
      name: '[든든] 카벤디쉬 케이준스타일 양념감자 2kg',
      price: 10490,
    },
  ],
};

export const EmptyShoppingCartListContainer = args => <ShoppingCartListContainer {...args} />;
EmptyShoppingCartListContainer.args = {
  data: [],
};
