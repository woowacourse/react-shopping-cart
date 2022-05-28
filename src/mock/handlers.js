import { rest } from 'msw';

const products = [
  {
    id: 1,
    imgSrc: 'https://cdn-mart.baemin.com/sellergoods/main/52afbaa7-809e-4e55-8080-3c357a94ba3a.gif',
    title: '배달이친구들 케이블타이',
    price: 4000,
  },
  {
    id: 2,
    imgSrc: 'https://cdn-mart.baemin.com/sellergoods/main/f65ec0ec-ea5f-41bb-ba43-68579fbcf34a.png',
    title: '을지로 목장갑. 위잉 뚝딱',
    price: 6000,
  },
  {
    id: 3,
    imgSrc: 'https://cdn-mart.baemin.com/sellergoods/main/526c13d0-5e85-438e-ae0b-ad91ac026eb9.gif',
    title: '배달이 친구들 팝업카드',
    price: 4000,
  },
  {
    id: 4,
    imgSrc: 'https://cdn-mart.baemin.com/sellergoods/main/835c5ad8-22b6-4556-b3bd-a4e843c1190b.png',
    title: '유해물질이 나오지 않는 지우개',
    price: 1000,
  },
  {
    id: 5,
    imgSrc: 'https://cdn-mart.baemin.com/sellergoods/main/a7e6cb1b-0929-46db-8434-208c65a6cbc5.png',
    title: '떡볶이키트. 떡볶이가 필요해',
    price: 11000,
  },
  {
    id: 6,
    imgSrc: 'https://cdn-mart.baemin.com/sellergoods/main/b77cdcf9-3410-4122-9e5e-435a9724bff7.png',
    title: '포스터. 독고배달이',
    price: 2000,
  },
  {
    id: 7,
    imgSrc: 'https://cdn-mart.baemin.com/sellergoods/main/401a94ad-fe25-4176-951b-2ea7cf4f989e.png',
    title: '배달이친구들 지금뭐해 피규어. 메이의 감미로운 오후',
    price: 3500,
  },
  {
    id: 8,
    imgSrc: 'https://cdn-mart.baemin.com/sellergoods/main/0d5029a4-f153-4b13-9b46-ab16792a573e.png',
    title: '배달이친구들 지금뭐해 피규어. 독고의 책읽는 시간',
    price: 3500,
  },
  {
    id: 9,
    imgSrc: 'https://cdn-mart.baemin.com/sellergoods/main/4c9e2976-e2c1-453a-bd3c-6f96a132ee7b.png',
    title: '배달이친구들 지금뭐해 피규어. 냥이의 등 긁는 하루',
    price: 3500,
  },
  {
    id: 10,
    imgSrc: 'https://cdn-mart.baemin.com/sellergoods/main/21cb8a0e-3aa4-464e-9354-104030c54294.png',
    title: '배달이친구들 지금뭐해 피규어. 감자의 수확하는 계절',
    price: 3500,
  },
  {
    id: 11,
    imgSrc: 'https://cdn-mart.baemin.com/sellergoods/main/52e07957-c5ab-4f0c-862b-9dc6318dfffa.png',
    title: '엽서. 복',
    price: 1000,
  },
  {
    id: 12,
    imgSrc: 'https://cdn-mart.baemin.com/sellergoods/main/3a9fd048-ffc5-49ac-8a77-5428429ea635.png',
    title: '엽서. 축',
    price: 1000,
  },
  {
    id: 13,
    imgSrc:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQO9xJnPGNcWh7xDy4Hqrfn8XmlHrRzAVsJbf4T83d9RRp7KWnN_ikhcklwLW-FUoaEcp4&usqp=CAU',
    title: '발로텔리',
    price: 30000,
  },
  {
    id: 14,
    title: '박수',
    price: 40000,
    imgSrc: 'https://i.pinimg.com/564x/f9/b2/7a/f9b27aabcc32aa1bf54c24fc0684754c.jpg',
  },
  {
    id: 15,
    title: '망고망고',
    price: 8000,
    imgSrc: 'https://i.pinimg.com/564x/b0/90/46/b090468ec7086ce9436b19d77dc2d84d.jpg',
  },
  {
    id: 16,
    title: '체리',
    price: 3000,
    imgSrc: 'https://i.pinimg.com/564x/f4/99/13/f49913dff3762b7c9ed8ab8ac24a289c.jpg',
  },
  {
    id: 17,
    title: '귤',
    price: 3000,
    imgSrc: 'https://i.pinimg.com/564x/eb/de/88/ebde88df529864dfac176e471cce59c4.jpg',
  },
  {
    id: 18,
    title: '딸기',
    price: 900,
    imgSrc: 'https://i.pinimg.com/736x/2a/dc/0c/2adc0ccdcc48c2a308a71a060e486953.jpg',
  },
  {
    id: 19,
    title: '코코넛',
    price: 14000,
    imgSrc: 'https://i.pinimg.com/564x/96/a9/56/96a95673ce630df8a78b00f0e2bebf9e.jpg',
  },
  {
    id: 20,
    title: '사과',
    price: 2000,
    imgSrc: 'https://i.pinimg.com/564x/5e/d5/40/5ed540c5f50aa0588fb2a28155846d9e.jpg',
  },
  {
    id: 21,
    title: '포도',
    price: 5000,
    imgSrc: 'https://i.pinimg.com/564x/7b/1c/27/7b1c2770a37adbd513b214fe6e9c87a4.jpg',
  },
  {
    id: 22,
    title: '바나나',
    price: 2000,
    imgSrc: 'https://i.pinimg.com/564x/35/04/a1/3504a1ef61f1edeb654a421ed5fd6203.jpg',
  },
  {
    id: 23,
    title: '블루베리',
    price: 700,
    imgSrc: 'https://i.pinimg.com/564x/9d/7a/8c/9d7a8cdfdcf015bb6516e8469241478a.jpg',
  },
  {
    id: 24,
    title: '토마토',
    price: 3000,
    imgSrc: 'https://i.pinimg.com/564x/d9/54/6b/d9546bf783d822104122aaba5227ac5c.jpg',
  },
  {
    id: 25,
    title: '양파',
    price: 800,
    imgSrc: 'https://i.pinimg.com/564x/5a/fa/d0/5afad01b38d327252f8204775cf4c57d.jpg',
  },
  {
    id: 26,
    title: '양배추',
    price: 800,
    imgSrc: 'https://i.pinimg.com/564x/b6/79/54/b67954a7113e1fb688b43eb51477fc3a.jpg',
  },
  {
    id: 27,
    title: '완두콩',
    price: 300,
    imgSrc: 'https://i.pinimg.com/564x/9c/b7/be/9cb7beb2ed288f016d6a7c1e435f5802.jpg',
  },
  {
    id: 28,
    title: '완두콩',
    price: 300,
    imgSrc: 'https://i.pinimg.com/564x/9c/b7/be/9cb7beb2ed288f016d6a7c1e435f5802.jpg',
  },
  {
    id: 29,
    title: '피망',
    price: 700,
    imgSrc: 'https://i.pinimg.com/564x/fa/be/62/fabe623f1ff43529a34efb8d54059910.jpg',
  },
  {
    id: 30,
    title: '가지',
    price: 1200,
    imgSrc: 'https://i.pinimg.com/564x/41/1c/a7/411ca783f5d5d360bc96035c9ecdc8d2.jpg',
  },
  {
    id: 31,
    title: '아스파라거스',
    price: 1200,
    imgSrc: 'https://i.pinimg.com/564x/e2/2b/38/e22b38050a7c3b7b25a1ba0852065a25.jpg',
  },
  {
    id: 32,
    title: '당근',
    price: 600,
    imgSrc: 'https://i.pinimg.com/564x/ba/a3/7b/baa37b851e4085d5f0902ad0abedb48f.jpg',
  },
  {
    id: 33,
    title: '옥수수',
    price: 1200,
    imgSrc: 'https://i.pinimg.com/564x/29/df/bb/29dfbbd67ecbc32862c58d27787400a2.jpg',
  },
  {
    id: 34,
    title: '아보카도',
    price: 1500,
    imgSrc: 'https://i.pinimg.com/564x/19/a4/77/19a4774da186bed89010e807b2d485a2.jpg',
  },
  {
    id: 35,
    title: '버섯',
    price: 600,
    imgSrc: 'https://i.pinimg.com/564x/3d/30/5b/3d305b7e47a094b5001847f86ccdd153.jpg',
  },
  {
    id: 36,
    title: '파프리카',
    price: 600,
    imgSrc: 'https://i.pinimg.com/564x/69/82/b4/6982b4d88581775389ea992abc3d70ec.jpg',
  },
  {
    id: 37,
    title: '청포도',
    price: 2400,
    imgSrc: 'https://i.pinimg.com/564x/71/ac/91/71ac91b4238e4fc66b97fc0b5c575c4c.jpg',
  },
  {
    id: 38,
    title: '파인애플',
    price: 2400,
    imgSrc: 'https://i.pinimg.com/564x/3e/3b/cf/3e3bcf67610b16b49bc6de0ff019b96a.jpg',
  },
  {
    id: 39,
    title: '복숭아',
    price: 1100,
    imgSrc: 'https://i.pinimg.com/736x/c9/bd/0e/c9bd0e8479515766dbbac8c945831d4f.jpg',
  },
  {
    id: 40,
    title: '키위',
    price: 1400,
    imgSrc: 'https://i.pinimg.com/564x/8a/86/58/8a86580bfc3ae0808b9b2d49a72ba6c2.jpg',
  },
  {
    id: 41,
    title: '레몬',
    price: 800,
    imgSrc: 'https://i.pinimg.com/564x/b0/64/76/b06476605329486faee7d68a1fd5d52c.jpg',
  },
];
let carts = [];

export default [
  rest.get('/products/:page', (req, res, ctx) => {
    const page = Number(req.params.page);
    const offset = (page - 1) * 10;
    const productsSlice = products.slice(offset, offset + 10);

    return res(ctx.status(200), ctx.json({ products: productsSlice, totalCount: products.length }));
  }),

  rest.get('/product/:productId', (req, res, ctx) => {
    const productId = Number(req.params.productId);
    const product = products.find(({ id }) => id === productId);

    return res(ctx.status(200), ctx.json(product));
  }),

  rest.get('/carts', (req, res, ctx) => {
    const result = carts.map(({ productId, quantity }) => ({
      ...products.find((product) => product.id === productId),
      quantity,
      selected: false,
    }));

    return res(ctx.status(200), ctx.json(result));
  }),

  rest.get('/cart/:productId', (req, res, ctx) => {
    const productId = Number(req.params.productId);
    const cart = carts.find((cart) => cart.productId === productId);

    return res(ctx.status(200), ctx.json(cart));
  }),

  rest.post('/addCart/:productId', (req, res, ctx) => {
    const productId = Number(req.params.productId);

    carts.push({ productId, quantity: 1 });

    return res(ctx.status(201));
  }),

  rest.put('/addMoreCart/:productId', (req, res, ctx) => {
    const productId = Number(req.params.productId);
    const cart = carts.find((cart) => cart.productId === productId);

    if (!cart) {
      return res(ctx.status(400, '장바구니에 존재하지 않는 상품입니다.'));
    }

    cart.quantity += 1;

    return res(ctx.status(200));
  }),

  rest.put('/downCart/:productId', (req, res, ctx) => {
    const productId = Number(req.params.productId);
    const cart = carts.find((cart) => cart.productId === productId);

    if (!cart) {
      return res(ctx.status(400, '장바구니에 존재하지 않는 상품입니다.'));
    }

    cart.quantity = Math.max(0, cart.quantity - 1);

    return res(ctx.status(200));
  }),

  rest.delete('/deleteCart/:productId', (req, res, ctx) => {
    const productId = Number(req.params.productId);

    carts = carts.filter((cart) => cart.productId !== productId);

    return res(ctx.status(200));
  }),

  rest.delete('/deleteCarts', (req, res, ctx) => {
    const { productIds } = req.body;

    carts = carts.filter(({ productId }) => !productIds.includes(productId));

    return res(ctx.status(200));
  }),
];
