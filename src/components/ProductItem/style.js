import styled from 'styled-components';

const Styled = {
  Wrapper: styled.div`
    width: 200px;
    cursor: pointer;
  `,

  ProductImage: styled.img`
    max-width: 100%;
  `,

  ProductDetail: styled.div`
    display: flex;
    justify-content: space-between;
    padding: 5px;
    width: 100%;
  `,

  ProductInfo: styled.div`
    display: flex;
    flex-direction: column;
    font-family: ${({ theme }) => theme.FONT.SECONDARY};
  `,

  ProductName: styled.span`
    font-size: 14px;
    width: 147px;
    display: block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  `,

  ProductPrice: styled.span`
    font-size: 18px;
  `,

  CartButton: styled.button`
    background-color: transparent;
    border: none;
    cursor: pointer;
  `,

  CartSvg: styled.img`
    max-width: 100%;
  `,
};

export default Styled;
