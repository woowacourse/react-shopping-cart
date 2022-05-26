import styled from "@emotion/styled";

const StyledProductItem = styled.div`
  position: relative;
  transition: 0.3s ease;
  margin: 10px 0;

  :hover {
    .thumbnail {
      img {
        transform: scale(1.08, 1.08);
      }
    }
  }

  .thumbnail {
    overflow: hidden;
    height: 100%;
    img {
      transition: 0.3s ease;
    }
  }

  .content {
    position: absolute;
    margin-top: 5px;

    left: 0;
    right: 0;

    .product-detail {
      display: flex;
      padding: 10px 0px 10px 15px;
      margin-bottom: 30px;
      .l-left {
        width: 100%;
      }

      color: #000000;
      .product-title {
        font-size: 20px;
      }
      .product-price {
        font-size: 20px;
      }
    }
  }
`;

export default StyledProductItem;
