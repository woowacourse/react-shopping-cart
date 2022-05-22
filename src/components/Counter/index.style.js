import styled from 'styled-components';

const Styled = {
  Container: styled.div`
    width: 113px;
    height: 60px;
    border: 1px solid #cccccc;
    display: grid;
    box-sizing: border-box;
    grid-template-areas:
      'count increase'
      'count decrease';
  `,

  Count: styled.div`
    grid-row: 1 / 3;
    display: flex;
    align-items: center;
    justify-content: center;
  `,

  CountButton: styled.div`
    grid-column: 3;
    display: flex;
    align-items: center;
    justify-content: center;
    outline: 1px solid #cccccc;
    cursor: pointer;
  `,
};

export default Styled;
