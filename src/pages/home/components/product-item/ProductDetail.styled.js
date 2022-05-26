import styled from "@emotion/styled";

const StyledProductDetail = styled.div`
  display: flex;
  padding: 10px 0px 10px 15px;
  margin-bottom: 30px;

  .l-left {
    width: 100%;
  }

  color: ${(props) => props.theme.colors.black1};
  .product-title {
    font-size: 20px;
  }
  .product-price {
    font-size: 20px;
  }
`;

export default StyledProductDetail;
