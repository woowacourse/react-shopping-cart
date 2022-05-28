import { rest } from 'msw';

const handlers = [
  rest.get('/products', (req, res, ctx) => {
    const errorCode = req.url.searchParams.get('error_code');

    if (errorCode) {
      return res(ctx.status(errorCode));
    }

    return res(
      ctx.status(200),
      ctx.json([
        {
          id: 1,
          image: 'https://i.pinimg.com/474x/4a/47/d5/4a47d5956eb090ff702e3b2cb47fdf98.jpg',
          name: '사과',
          price: 1000,
        },
        {
          id: 2,
          image: 'https://i.pinimg.com/474x/2a/1f/a3/2a1fa32019c657c797ba60fe809e5550.jpg',
          name: '포도',
          price: 3500,
        },
        {
          id: 3,
          image: 'https://i.pinimg.com/474x/49/56/60/495660773a9f824050939004f795f4b4.jpg',
          name: '바나나',
          price: 1000,
        },
        {
          id: 4,
          image: 'https://i.pinimg.com/474x/9f/c7/82/9fc782cbd4bf1cdc719c788b250eafac.jpg',
          name: '망고',
          price: 2000,
        },
        {
          id: 5,
          image: 'https://i.pinimg.com/474x/c7/9f/9f/c79f9fec3019ef6176b04f03d3e342e7.jpg',
          name: '수박',
          price: 10000,
        },
        {
          id: 6,
          image: 'https://i.pinimg.com/474x/71/6f/87/716f872cd3867abd219b46ae4b781a22.jpg',
          name: '참외',
          price: 1000,
        },
        {
          id: 7,
          image: 'https://i.pinimg.com/474x/c9/20/33/c92033b31c2911b39cf2fe54e4b71664.jpg',
          name: '자몽',
          price: 1700,
        },
        {
          id: 8,
          image: 'https://i.pinimg.com/474x/22/e5/73/22e573dcade542855507570adab91142.jpg',
          name: '파인애플',
          price: 6000,
        },
        {
          id: 9,
          image: 'https://i.pinimg.com/474x/0c/a7/af/0ca7af0abd3300aedc4584fe8892feef.jpg',
          name: '용과',
          price: 2500,
        },
        {
          id: 10,
          image: 'https://i.pinimg.com/474x/93/1f/3a/931f3a63e7834588e4e52e307930940e.jpg',
          name: '키위',
          price: 700,
        },
        {
          id: 11,
          image: 'https://i.pinimg.com/474x/27/1d/6f/271d6fbb2bd45a80c6b18ce211a7d477.jpg',
          name: '망고스틴',
          price: 1400,
        },
        {
          id: 12,
          image: 'https://i.pinimg.com/474x/80/53/c0/8053c0d42a17bc58216c4bd54855fc49.jpg',
          name: '자두',
          price: 800,
        },
        {
          id: 13,
          image: 'https://i.pinimg.com/474x/90/88/ab/9088abdbe111cf95714de814cd210d45.jpg',
          name: '배',
          price: 4000,
        },
        {
          id: 14,
          image: 'https://i.pinimg.com/474x/87/06/9f/87069f0d7c76331be17ea927d1164035.jpg',
          name: '오렌지',
          price: 1000,
        },
        {
          id: 15,
          image: 'https://i.pinimg.com/474x/74/b2/8c/74b28c62640bbf80d84bc6758fe0a89e.jpg',
          name: '레몬',
          price: 1000,
        },
        {
          id: 16,
          image: 'https://i.pinimg.com/474x/fe/90/fe/fe90fec3f05f934dd50dcace9ca9a92c.jpg',
          name: '메론',
          price: 7000,
        },
        {
          id: 17,
          image: 'https://i.pinimg.com/474x/02/1a/e0/021ae08259cd598184305389f8e95722.jpg',
          name: '거봉',
          price: 6500,
        },
        {
          id: 18,
          image: 'https://i.pinimg.com/474x/33/16/ba/3316ba907d6f360226960b062cc7ec76.jpg',
          name: '패션후르츠',
          price: 2000,
        },
        {
          id: 19,
          image: 'https://i.pinimg.com/474x/45/7d/14/457d14d7cdf09b165920fc5e0b259ed7.jpg',
          name: '복숭아',
          price: 3000,
        },
        {
          id: 20,
          image: 'https://i.pinimg.com/474x/24/59/c9/2459c9268d96ee607fc8328e2b9cc9b0.jpg',
          name: '딸기',
          price: 500,
        },
      ])
    );
  }),
];

export default handlers;
