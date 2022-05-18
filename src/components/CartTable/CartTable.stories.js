import CartTable from 'components/CartTable';

export default {
  title: 'components/CartTable',
  component: CartTable,
};

const Template = (args) => <CartTable {...args} />;

export const Example = Template.bind({});

Example.args = {
  cartList: [
    {
      id: 2,
      name: '관절에 무리없는 캣워커/캣휠 120CM 대형사이즈',
      imgUrl:
        'https://image.ohou.se/i/bucketplace-v2-development/uploads/productions/164776373888845264.jpg?gif=1&w=1280&h=1280&c=c',
      price: '124000',
      quantity: 10,
      cartQuantity: 2,
    },
    {
      id: 5,
      name: 'NEW 컬러추가 강아지 고양이 기절 댕냥쿠션/방석',
      imgUrl:
        'https://image.ohou.se/i/bucketplace-v2-development/uploads/productions/165095245734958156.jpg?gif=1&w=1280&h=1280&c=c',
      price: '26900',
      quantity: 10,
      cartQuantity: 1,
    },
    {
      id: 6,
      name: 'PETMARVEL 펫드라이룸 강아지 고양이 드라이기',
      imgUrl:
        'https://image.ohou.se/i/bucketplace-v2-development/uploads/productions/images/162686064836045500.jpg?gif=1&w=1280&h=1280&c=c',
      price: '167900',
      quantity: 10,
      cartQuantity: 1,
    },
    {
      id: 10,
      name: '웨이브팟 반려동물 급수기',
      imgUrl:
        'https://image.ohou.se/i/bucketplace-v2-development/uploads/productions/164601050125053383.png?gif=1&w=1280&h=1280&c=c',
      price: '59000',
      quantity: 10,
      cartQuantity: 1,
    },
  ],
};
