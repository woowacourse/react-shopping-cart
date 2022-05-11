import S from "../../styled";
import ProductItem from "../product-item/ProductItem";

function ProductList() {
  const productList = [
    {
      id: "1",
      name: "저글링",
      price: 50,
      stock: 4,
    },
    {
      id: "2",
      name: "질럿",
      price: 1000,
      stock: 5,
    },
    {
      id: "3",
      name: "배틀크루저",
      price: 400,
      stock: 2,
    },
    {
      id: "4",
      name: "임페스티드테란",
      price: 100,
      stock: 10,
    },
    {
      id: "5",
      name: "히드라",
      price: 75,
      stock: 50,
    },
    {
      id: "6",
      name: "다크템플러",
      price: 125,
      stock: 8,
    },
  ];
  return (
    <S.ProductList>
      {productList.map((item) => (
        <ProductItem key={item.id} {...item} />
      ))}
    </S.ProductList>
  );
}

export default ProductList;
