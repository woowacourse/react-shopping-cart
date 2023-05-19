import { rest, RestRequest } from 'msw';
import { Cart } from '../types/product';

interface PatchRequest extends RestRequest {
  quantity: number;
}

export const handlers = [
  rest.get('/products', async (_req, res, ctx) => {
    return res(ctx.json(products));
  }),

  rest.get('/cart-items', async (_req, res, ctx) => {
    const data = JSON.parse(localStorage.getItem('cart-items') || '[]');

    return res(ctx.json(data));
  }),
  rest.get('/cart-items/:id', async (req, res, ctx) => {
    const { id } = req.params;
    const carts = JSON.parse(localStorage.getItem('cart-items') || '[]');

    const product = Object.assign(
      carts.find((cart: Cart) => cart.id === Number(id))
    );
    return res(ctx.json(product));
  }),
  rest.post<{ id: number }>('/cart-items', async (req, res, ctx) => {
    const { id } = req.body;
    const data = JSON.parse(localStorage.getItem('cart-items') || '[]');
    const product = products.find((product) => product.id === Number(id));
    const newData = [...data, { id: Number(id), quantity: 1, product }];

    localStorage.setItem('cart-items', JSON.stringify(newData));

    return res(ctx.json(newData));
  }),
  rest.patch<PatchRequest, { id: string }>(
    '/cart-items/:id',
    async (req, res, ctx) => {
      const { id } = req.params;
      const { quantity } = req.body;
      const data = JSON.parse(localStorage.getItem('cart-items') || '[]');
      const filteredData = data.filter((item: Cart) => item.id !== Number(id));
      const product = products.find((product) => product.id === Number(id));
      const newData = [
        ...filteredData,
        { id: Number(id), quantity: quantity + 1, product },
      ];

      localStorage.setItem('cart-items', JSON.stringify(newData));

      return res(ctx.json(newData));
    }
  ),
  rest.delete('/cart-items/:id', async (req, res, ctx) => {
    const { id } = req.params;
    const data = JSON.parse(localStorage.getItem('cart-items') || '[]');
    const filteredData = data.filter((item: Cart) => item.id !== Number(id));
    const newData = [...filteredData];

    localStorage.setItem('cart-items', JSON.stringify(newData));

    return res(ctx.json(newData));
  }),
];

const products = [
  {
    id: 1,
    name: 'PET보틀-정사각(420ml)',
    price: 10000,
    imageUrl:
      'https://s3-alpha-sig.figma.com/img/05ef/e578/d81445480aff1872344a6b1b35323488?Expires=1684713600&Signature=gvkVAezZeNJ6-pOzrsQBqsdfN9PGcEmV7HraRhfgfmXTZD0rCy-OEhFh-uP4y7AxUs5FC6ILRG-RNHslTX8x8q9HHcLyVrFq6I1uzwKaZyyWOCwAYgglD99UQlYPlVCU3E-8eIUfX~TRBM~dSPsojsKv-cNJU1gGPOE7G9C3Z1CKoDjIFZ8G2J4TG16VvSzil0RHsGGPi~06jOwn3Dtq~oBZQ1yhoRgfYDrGLlsexYockI38hGjBcBx1gJWg41~kBGNhueXs-tmuLfqRoPc0ReK~jWKLiGZi2JVPaIP-tPOfSAUEt99Po0KzVG-agBflDRhhpybhrR1bmozDvb~9eg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
  },
  {
    id: 2,
    name: 'PET보틀-정사각(500ml)',
    price: 12000,
    imageUrl:
      'https://s3-alpha-sig.figma.com/img/c91b/8c58/919fc1af3ddd4c1bba09101cf51013cb?Expires=1684713600&Signature=gJXoDh3Kff5YuZh~dwngjm~n7o37JjnnftCnctPE5Y-QYKTWJAa6~laE1rxwy1s1FhgaJmU1IKg9OAHq0iwUob-hH9TEy3RUYgz-HyXqetKOgEw8Wp4937mBA~2cWyMJjp56bjQgLLbBqM8up2ddQQJLPsyfVdDHr-~jZFL-JEDT72NnlNfyO2qG~W6clycdMfrtkB~YxPPiwHSai1bTEKx6b7vaR79k7OtXO3F3kq9TzQH9vNXM6X9GQtRsw9zjc35JDS2CDoFsAh5u~xThB1udtnHfmTQMdm-lqB0NpwewqYB0GF8qov4mbSCPh20HtPIpLkM5-V1QPEXvyiUbiA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
  },
  {
    id: 3,
    name: 'PET보틀-원형(350ml)',
    price: 8000,
    imageUrl:
      'https://s3-alpha-sig.figma.com/img/c7b8/6249/bb062378afa996a8fe0e2f25e099aa55?Expires=1684713600&Signature=TaTYvPZbnPGVzHZeahNvJJ328E5C2mjEgvfLw4spgQ8a~k9tHslk8qx44x8dr6t4-rJnQDOC6H6OJErrhhHIPodgNLapqFaBMQCYWeeoq9Jhka-A6jxgBeQa0l99W33-WCDutoV~d9UHbpBscd2-ZzOD2DTIKp6JuHdj4CityiwOnPgJ4jpx6lwEqU5593P7jkveAGDh7yEcqrmtmmVDLlgaU-~4YO2wmD3cHX4mmTMCN4wu4woBshXCkQXwy4iGUCCdb3nNg0hrSGXRlCfe2SNdFz8IzpOlRpgNLuUwSByJ6TPiajuQ7vS-mD2KqC402ewrZMm7tnRbI1h62e08bA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
  },
  {
    id: 4,
    name: 'PET보틀-원형(500ml)',
    price: 10000,
    imageUrl:
      'https://s3-alpha-sig.figma.com/img/2410/7f6a/cd0400dbcf6d4dd8f586002d7afcd499?Expires=1684713600&Signature=N99STQ8Tf8-XXI-V9v3UJq4bpcsDWlpOn5ZNjCTHE8rc6SMR4Z5DxRR9zwspzQ-Q6F-h5JXwg0OVC-WwjSJMUcAJjWSLoBJ7lQC32UALwNBtHLjcWkNWgZ6DBWNClF~dfHCHEMFrcmj0Bdb3zFPjrtDlNSRdqksqVVZBiAeSmbhKWOkoHnKt23335HJyrHy6xoYJ6hygjpkZnwgAJFTBS8FHAJtwH26gALPGNqI-mDvdPGV2IklIv7VO-hp9kZ6gwqXuRJfhcPFke9g836-Aop9EzYSWxk03fDZezWBv8cx5A7R5NLGSm0fF4HSp~Q5sfL2t-nXxoQ7HR6yhHSh11Q__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
  },
  {
    id: 5,
    name: '유리병-프랑스산(500ml)',
    price: 20000,
    imageUrl:
      'https://s3-alpha-sig.figma.com/img/4c00/d3d5/bc0865e11d604709bb0369910ab0a961?Expires=1684713600&Signature=SGUp~eIZh2ekd61K1vxNPcr1khVeasz7mDhGb0O0vZ5tjz9nQUx9lfy3iGJgteyIO1VTFIKJbb6Ka3lUnPDK6d6tF6Exzf~AFxvCi73BBjMm45cT3rH4cN4YjPNbnhGELK2o1unlnD7BlCYPjkmJADEjnrpmK8p37UJ9kmdAZakpyk8f95~d~ERD~y-tD572F6f-rx93HZRA3znLibXV749usZPbCNMMs8WLdkyuKJi0ZonhpDST7tHUVnQniRYYFJCMU5gvkJz-v82bvAmKNEyS5DJlOSBtpFauf5Wy0jmWMVjanw7M35F52NHKKofser0C3QUEWX2dHkx7mjX7qA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
  },
  {
    id: 6,
    name: '유리병-프랑스산(750ml)',
    price: 25000,
    imageUrl:
      'https://s3-alpha-sig.figma.com/img/33d6/e526/45207e8000c3bd7f731f561a4b2cf8f4?Expires=1684713600&Signature=YPMEjbMIB3Q0vYA3FVGHAp4xZPz~jsySqhChdrBiIibYgqP3z4kgMc~qXPRV4Sd1JEwJQKV0Ti6VevRAUDfGBZeLwkqEhKWYfui77SWRFFWCZieOLi~22uEKK8Dd~xRpRMSX~nEYyjvz0GF6spvpkaUBOubetjY6Bnclpqzv04-hCuJXmihd0o2DrzwW~SPVrXzab1C87U-4n885oEsgTYM8Pq0aDd5gELQtDomW6jBawC4deA1B8p3PQVkj-i0VnedtxyPbTYNCqnpo1Ii1JGR~CC4QCi4LaG-2tv5MlV8C5DTOusy5cULMtx5XgvpRhdcM2s0gu7VrrOf3v1GwSQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
  },
  {
    id: 7,
    name: '알루미늄병-순도100%(500ml)',
    price: 15000,
    imageUrl:
      'https://s3-alpha-sig.figma.com/img/1389/e15f/2846ef65e20433b5f756e170bdb3b8d3?Expires=1684713600&Signature=G~3sHx~Xf4g5ND38fMnGUVwF4c024gHyzNMY~DPSU7CVPin-ZRY5eC1Z5x5BCwAZ0R9vplWrnG~jaDSJANqueEqiGjGkbo1qUcPWAjT3fH2xJsW1N2FuT4v83EU5SR6ygrhFf8~NyC0pp8Kapqj0VQXZIcOPhp1jxLlfBDSEW~nqIE5zMentTuqma7sr1vSiqfiN2bO2F31hJRgslQFX4eXsByZ0Any4hieu73tA8-ekloj~w8Y5z~3jecfFg6ekc4Dupu4OvP7PFeIM5OXj~lbOjPAdfk3gq0sdfvo~6rlN4pcqG9Nw-n8RjJ9MWpHxrvg0pnwhgXUkw0Z7tUJJwA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
  },
  {
    id: 8,
    name: '알루미늄병-순도100%(750ml)',
    price: 18000,
    imageUrl:
      'https://s3-alpha-sig.figma.com/img/7327/60a4/509ecdc810638f6ee5664b30ee4db2c4?Expires=1684713600&Signature=FB1OZ-jbx8XN7Q-UrkuE28no9DmHhZyT8A4TG7lrP1ccwhSEMXTKikQhTWruro3rPPvh9hbNY7s3SCxuNcQNWEV4GEpo8PVIy~zAPBkzdOAUNbGeTFAMxa7WEZJN7vAw-Hg7biRAgDw02e2OVkcgOAqevcqaEzZOblsLzkr7DsI8Ex7KErP-EgjLEcGzGuX0O-fgzz3Kjgd1ojfj5d3Q4Yy5AVP-Cosh4zJq8XgipBCPzo5pKxHc5TsdOmMicvA3Z-x-TjW5DPOEkcJLSHu9Hx9ZZYVHWdFHV6ImlhAHT4gNSi8xTmQVoSJL5OxiXiygjb0IjAIxlIrhhS8w6ndhRQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
  },
  {
    id: 9,
    name: '스테인리스병-한국제작(500ml)',
    price: 18000,
    imageUrl:
      'https://s3-alpha-sig.figma.com/img/05ef/e578/d81445480aff1872344a6b1b35323488?Expires=1684713600&Signature=gvkVAezZeNJ6-pOzrsQBqsdfN9PGcEmV7HraRhfgfmXTZD0rCy-OEhFh-uP4y7AxUs5FC6ILRG-RNHslTX8x8q9HHcLyVrFq6I1uzwKaZyyWOCwAYgglD99UQlYPlVCU3E-8eIUfX~TRBM~dSPsojsKv-cNJU1gGPOE7G9C3Z1CKoDjIFZ8G2J4TG16VvSzil0RHsGGPi~06jOwn3Dtq~oBZQ1yhoRgfYDrGLlsexYockI38hGjBcBx1gJWg41~kBGNhueXs-tmuLfqRoPc0ReK~jWKLiGZi2JVPaIP-tPOfSAUEt99Po0KzVG-agBflDRhhpybhrR1bmozDvb~9eg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
  },
  {
    id: 10,
    name: '스테인리스병-한국제작(750ml)',
    price: 22000,
    imageUrl:
      'https://s3-alpha-sig.figma.com/img/c91b/8c58/919fc1af3ddd4c1bba09101cf51013cb?Expires=1684713600&Signature=gJXoDh3Kff5YuZh~dwngjm~n7o37JjnnftCnctPE5Y-QYKTWJAa6~laE1rxwy1s1FhgaJmU1IKg9OAHq0iwUob-hH9TEy3RUYgz-HyXqetKOgEw8Wp4937mBA~2cWyMJjp56bjQgLLbBqM8up2ddQQJLPsyfVdDHr-~jZFL-JEDT72NnlNfyO2qG~W6clycdMfrtkB~YxPPiwHSai1bTEKx6b7vaR79k7OtXO3F3kq9TzQH9vNXM6X9GQtRsw9zjc35JDS2CDoFsAh5u~xThB1udtnHfmTQMdm-lqB0NpwewqYB0GF8qov4mbSCPh20HtPIpLkM5-V1QPEXvyiUbiA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
  },
  {
    id: 11,
    name: '지퍼백-스몰사이즈(300ml)',
    price: 5000,
    imageUrl:
      'https://s3-alpha-sig.figma.com/img/c7b8/6249/bb062378afa996a8fe0e2f25e099aa55?Expires=1684713600&Signature=TaTYvPZbnPGVzHZeahNvJJ328E5C2mjEgvfLw4spgQ8a~k9tHslk8qx44x8dr6t4-rJnQDOC6H6OJErrhhHIPodgNLapqFaBMQCYWeeoq9Jhka-A6jxgBeQa0l99W33-WCDutoV~d9UHbpBscd2-ZzOD2DTIKp6JuHdj4CityiwOnPgJ4jpx6lwEqU5593P7jkveAGDh7yEcqrmtmmVDLlgaU-~4YO2wmD3cHX4mmTMCN4wu4woBshXCkQXwy4iGUCCdb3nNg0hrSGXRlCfe2SNdFz8IzpOlRpgNLuUwSByJ6TPiajuQ7vS-mD2KqC402ewrZMm7tnRbI1h62e08bA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
  },
  {
    id: 12,
    name: '지퍼백-라지사이즈(1000ml)',
    price: 10000,
    imageUrl:
      'https://s3-alpha-sig.figma.com/img/2410/7f6a/cd0400dbcf6d4dd8f586002d7afcd499?Expires=1684713600&Signature=N99STQ8Tf8-XXI-V9v3UJq4bpcsDWlpOn5ZNjCTHE8rc6SMR4Z5DxRR9zwspzQ-Q6F-h5JXwg0OVC-WwjSJMUcAJjWSLoBJ7lQC32UALwNBtHLjcWkNWgZ6DBWNClF~dfHCHEMFrcmj0Bdb3zFPjrtDlNSRdqksqVVZBiAeSmbhKWOkoHnKt23335HJyrHy6xoYJ6hygjpkZnwgAJFTBS8FHAJtwH26gALPGNqI-mDvdPGV2IklIv7VO-hp9kZ6gwqXuRJfhcPFke9g836-Aop9EzYSWxk03fDZezWBv8cx5A7R5NLGSm0fF4HSp~Q5sfL2t-nXxoQ7HR6yhHSh11Q__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
  },
];
