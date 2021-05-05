import styled from "styled-components";

export const Product = styled.div`
  width: 100%;
`;

export const Preview = styled.div`
  width: 100%;
  position: relative;
`;

export const Img = styled.img`
  width: 100%;
`;

export const ImgDetail = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
  background-color: rgba(0, 0, 0, 0.05);
`;

export const AddCartButton = styled.button`
  position: absolute;
  bottom: 5px;
  right: 5px;
  background-color: white;
  border: 0;
  border-radius: 100%;
  width: 2.75rem;
  height: 2.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1px 2px 0 0;
  cursor: pointer;
  transition: all 0.1s ease-in-out;

  &:hover {
    background-color: #2ac1bc;

    svg {
      fill: white;
    }
  }
`;

export const Detail = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.75rem;
  padding-bottom: 0;

  .product-name {
    height: 1.5rem;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5rem;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }

  .product-price {
    height: 2rem;
    font-size: 1.25rem;
    font-weight: 400;
    display: flex;
    align-items: center;
  }
`;
