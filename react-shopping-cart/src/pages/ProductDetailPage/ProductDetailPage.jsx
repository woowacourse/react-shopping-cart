import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ProductName from "../../component/@shared/ProductName/ProductName";
import ProductPrice from "../../component/@shared/ProductPrice/ProductPrice";
import ProductThumbnail from "../../component/@shared/ProductThumbnail/ProductThumbnail";
import { selectCurrentProducts } from "../../redux/products/products.selector";
import { ColumnFlexWrapper, RowFlexWrapper } from "../../styles/Wrapper";
import Button from "../../component/@shared/Button/Button";

function ProductDetailPage() {
  const { idx } = useParams();
  const products = useSelector(selectCurrentProducts);
  const { name, image, price } = products.find(
    (product) => product.id === Number(idx)
  );

  return (
    <ColumnFlexWrapper gap="20px" width="425px" ml="auto" mr="auto">
      <ProductThumbnail type="detail" src={image} />
      <ProductName type="detail">{name}</ProductName>
      <RowFlexWrapper
        gap="300px"
        bt="2px"
        bColor="gray_01"
        width="100%"
        padding="15px 0px"
      >
        <div>금액</div>
        <ProductPrice type="detail">{price}원</ProductPrice>
      </RowFlexWrapper>
      <Button>장바구니</Button>
    </ColumnFlexWrapper>
  );
}

export default ProductDetailPage;
