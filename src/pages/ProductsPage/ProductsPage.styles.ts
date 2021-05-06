import styled from '@emotion/styled';

const Styled = {
  Root: styled.section`
    margin: 60px 0;
  `,

  ProductList: styled.ul`
    margin: 0;
    padding: 0;
    list-style: none;
    display: grid;
    grid-template-columns: repeat(4, 282px);
    column-gap: 40px;
    row-gap: 24px;
    justify-content: center;
  `,
};

export default Styled;
