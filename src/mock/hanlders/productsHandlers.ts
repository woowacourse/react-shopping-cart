import { rest } from 'msw';
import { PRODUCTS_BASE_URL } from '../../constant';

const products = [
  {
    id: 1,
    name: '지구',
    price: 1000,
    imageUrl: 'https://cdn.pixabay.com/photo/2011/12/13/14/28/earth-11009__480.jpg',
  },
  {
    id: 2,
    name: '화성',
    price: 200000,
    imageUrl: 'https://cdn.pixabay.com/photo/2011/12/13/14/30/mars-11012__480.jpg',
  },
  {
    id: 3,
    name: '달',
    price: 300,
    imageUrl: 'https://cdn.pixabay.com/photo/2016/04/02/19/40/moon-1303512__480.png',
  },
  {
    id: 4,
    name: '해왕성',
    price: 10000,
    imageUrl: 'https://cdn.pixabay.com/photo/2020/09/06/22/11/neptune-5550216__480.jpg',
  },
  {
    id: 5,
    name: '태양',
    price: 30000000,
    imageUrl: 'https://cdn.pixabay.com/photo/2016/07/13/20/47/sun-1515503__480.jpg',
  },
  {
    id: 6,
    name: '달에 가려진 태양',
    price: 8000000,
    imageUrl: 'https://cdn.pixabay.com/photo/2016/07/02/12/21/eclipse-1492818__480.jpg',
  },
  {
    id: 7,
    name: '금성',
    price: 9990,
    imageUrl: 'https://cdn.pixabay.com/photo/2011/12/13/14/39/venus-11022__480.jpg',
  },
  {
    id: 8,
    name: '코스모스 별',
    price: 15000,
    imageUrl: 'https://cdn.pixabay.com/photo/2018/03/08/20/01/astronomy-3209688__480.jpg',
  },
  {
    id: 9,
    name: '달을 낳는 지구',
    price: 6000000,
    imageUrl: 'https://cdn.pixabay.com/photo/2015/07/15/13/32/planet-846181__480.jpg',
  },
  {
    id: 10,
    name: '웜홀',
    price: 300000000,
    imageUrl: 'https://cdn.pixabay.com/photo/2020/06/17/09/28/wormhole-5308810__480.jpg',
  },
  {
    id: 11,
    name: '천왕성',
    price: 10000,
    imageUrl: 'https://cdn.pixabay.com/photo/2012/01/09/10/56/uranus-11625__480.jpg',
  },
  {
    id: 12,
    name: '사건의 지평선',
    price: 700000000,
    imageUrl:
      'https://media.istockphoto.com/id/1299315343/ko/%EC%82%AC%EC%A7%84/%EB%B8%94%EB%9E%99%ED%99%80%EC%9D%98-%EC%A4%91%EB%A0%A5%EC%9E%A5-%EC%A4%91%EB%A0%A5%EC%9D%98-%EB%A7%A4%EB%A0%A5-%EC%9A%B4%EC%84%9D%EA%B3%BC-%EC%86%8C%ED%96%89%EC%84%B1%EC%9D%B4-%EC%82%BC%EC%BC%9C%EC%A7%88-%EB%AC%B4%EB%A0%B5.jpg?b=1&s=170667a&w=0&k=20&c=2fMcKJ-RNdzS1-v0NXjOVssmicbAH0twoCt_0AwCHOk=',
  },
] as const;

export const productsHandlers = [
  rest.get(PRODUCTS_BASE_URL, (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(products));
  }),

  rest.get(`${PRODUCTS_BASE_URL}/:id`, (req, res, ctx) => {
    const productId = Number(req.params.id);
    const findedProduct = products.find((item) => item.id === productId);

    if (findedProduct === undefined) {
      return res(ctx.status(404), ctx.json({ message: '해당 상품이 존재하지 않습니다.' }));
    }

    return res(ctx.status(200), ctx.json(findedProduct));
  }),
];
