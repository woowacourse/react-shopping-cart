import ProductCardList from 'components/ProductCardList/ProductCardList';

const dummy = {
  id: '1',
  imageUrl:
    'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMzA0MTRfMjA2%2FMDAxNjgxNDQ0NzExNTY2.oQJxSkWybX9upYDFCq8NeV9jQT4s8ilqSDjsN3Fjiksg.OX2y8cOp_hhosojH-oo7HbO7PWtV7r3g6J8g-9rjoHsg.JPEG.diane4743%2FIMG_6127.jpg&type=sc960_832',
  name: '삼겹살',
  price: 10000,
};

const ProductListPage = () => {
  return (
    <ProductCardList products={[dummy, dummy, dummy, dummy, dummy, dummy, dummy, dummy, dummy, dummy, dummy, dummy]} />
  );
};

export default ProductListPage;
