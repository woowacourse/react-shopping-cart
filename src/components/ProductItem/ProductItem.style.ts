import styled from 'styled-components';

export const ProductItemStyle = styled.div`
  padding: 12px 0 20px 0;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
`;

export const ProductItemTop = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
`;

export const Img = styled.img`
  width: 112px;
  height: 112px;
  border-radius: 8px;
  object-fit: cover;
`;

export const ProductItemBundle = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;

  .product-item_content {
    display: flex;
    flex-direction: column;
  }

  .product-item_content_name {
    margin-bottom: 4px;
    color: rgba(10, 13, 19, 1);
    font-weight: 500;
    font-size: 12px;
  }

  .product-item_content_price {
    font-weight: 700;
    font-size: 24px;
  }

  .product-item_content_amount-bundle {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-top: 19px;
  }

  .product-item_content_amount {
    font-weight: 500;
    font-size: 12px;
    line-height: 15px;
  }
`;
