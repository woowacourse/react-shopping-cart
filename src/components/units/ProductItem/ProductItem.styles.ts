import styled from '@emotion/styled';

const Styled = {
  Root: styled.div`
    width: 282px;
    label: product-item-root;
  `,

  ImageWrapper: styled.div`
    min-height: 282px;
  `,

  Image: styled.img`
    width: 100%;
    object-fit: contain;
  `,

  Content: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
  `,

  Detail: styled.div`
    letter-spacing: 0.5px;
    max-width: 200px;
  `,

  Title: styled.div`
    font-size: 16px;
    line-height: 22px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  `,

  Price: styled.div`
    font-size: 20px;
    line-height: 27px;

    &::after {
      content: ' 원';
    }
  `,

  CartButton: styled.button`
    padding: 0.4em;
    border: none;
    background: none;
    cursor: pointer;
  `,
};

export default Styled;
