import styled from 'styled-components';

const Styled = {
  Wrapper: styled.div`
    width: 200px;
    cursor: pointer;
  `,

  Overlay: styled.div`
    opacity: 0;
    width: 100%;
    height: 200px;
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(255, 255, 255, 0.5);
    color: #fff;
    z-index: 2000;
    transition: opacity 0.3s ease;
    &:hover {
      opacity: 1;
    }
  `,

  ProductNamePreview: styled.span`
    font-size: 18px;
    font-weight: bold;
    font-family: ${({ theme }) => theme.FONT.PRIMARY};
    color: ${({ theme }) => theme.GREY_500};
    text-align: center;
  `,

  ProductImage: styled.img`
    max-width: 100%;
    transition: all 0.5s ease;

    &:hover {
      transform: scale(1.025);
    }
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
