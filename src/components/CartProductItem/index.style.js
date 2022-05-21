import styled from 'styled-components';

const Styled = {
  ProductItem: styled.div`
    width: 660px;
    height: 203px;
    border-top: 2px solid #cccccc;
    border-bottom: 2px solid #cccccc;
    display: flex;
    padding: 30px;
    justify-content: space-between;
  `,

  ProductController: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: end;
  `,

  ProductDetailController: styled.div`
    display: flex;
    gap: 15px;
  `,

  ProductName: styled.p`
    font-weight: 400;
    font-size: 20px;
    line-height: 24px;
    letter-spacing: 0.5px;
  `,
};

export default Styled;
