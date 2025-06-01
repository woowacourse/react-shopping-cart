export const mockCartItems = [
  {
    id: 1,
    quantity: 2,
    product: {
      id: 24,
      name: '부리부리 원형 테이블',
      price: 10000000,
      imageUrl:
        'https://cafe24.poxo.com/ec01/dmswo9075/HOvhRhvOk+Cp2KY4JuusAqBst4wtnsfbyXcejHyxMmXKvNELh5kEAFzUfK9ehG6ogDMwTwYJTLHHXeYVBq809g==/_/web/product/big/202408/19deee5e9d060d80a4180e2b2ecb6ce8.jpg',
      category: '패션잡화',
    },
  },
  {
    id: 2,
    quantity: 1,
    product: {
      id: 25,
      name: '모던 우드 체어',
      price: 2000,
      imageUrl:
        'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcQeMsjn-bl-bsreQfbsyA2l4EFwO5tsVDTYqUJY8GEctU6S1FkPyt7SxuALsS-9LZn2zXMvubxe5e0n_bEXY_JpTT_MsTfkQ1_MZuCD_FaFFzM5gM-YSxm3u246nBAM32NdyosLnQ&usqp=CAc',
      category: '가구',
    },
  },
  {
    id: 3,
    quantity: 3,
    product: {
      id: 26,
      name: '심플 러그',
      price: 100,
      imageUrl: 'https://media.bunjang.co.kr/product/223522208_%7Bcnt%7D_1683581287_w%7Bres%7D.jpg',
      category: '홈데코',
    },
  },
  {
    id: 4,
    quantity: 1,
    product: {
      id: 27,
      name: '빈티지 스탠드 조명',
      price: 1200,
      imageUrl:
        'https://thumbnail6.coupangcdn.com/thumbnails/remote/492x492ex/image/vendor_inventory/794f/cecbea5bdc654a11ae02d28b4d1f4bd2a03a7389eb2b8cc4a45c1c9f7d9b.jpg',
      category: '조명',
    },
  },
  {
    id: 5,
    quantity: 2,
    product: {
      id: 28,
      name: '아트 포스터',
      price: 350,
      imageUrl:
        'https://velog.velcdn.com/images/minsungje/post/c27c57cb-fcbb-4641-b72d-0e2030739ae7/image.jpg',
      category: '인테리어소품',
    },
  },
];

export let fetchedData = {
  content: [...mockCartItems],
};

export const initFetchedData = () => {
  fetchedData = {
    content: [...mockCartItems],
  };
};
