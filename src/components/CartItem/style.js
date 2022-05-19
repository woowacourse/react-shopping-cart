import styled from 'styled-components';

const Styled = {
  Wrapper: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 500px;
    height: 200px;

    border-top: 1px solid ${({ theme }) => theme.COLOR.GREY_200};
  `,

  CheckBox: styled.input``,

  ProductPreview: styled.div`
    width: 70%;
    display: flex;
  `,

  Image: styled.img`
    width: 120px;
    height: 120px;
    margin: 0 15px;
  `,

  Name: styled.span`
    font-size: 15px;
  `,

  ProductInfo: styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  `,

  QuantityInput: styled.input`
    width: 50px;
    height: 30px;
    margin: 10px 0 15px 0;
  `,

  Quantity: styled.div`
    width: 60px;
    height: 25px;
    padding: 15px 5px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    border: 1px solid ${({ theme }) => theme.COLOR.GREY_200};
    margin: 10px 0;
  `,

  QuantityControlButton: styled.button`
    background-color: transparent;
    border: none;
    color: ${({ theme }) => theme.COLOR.RED_300};
    cursor: pointer;
    font-size: 20px;
  `,

  Price: styled.span`
    font-size: 13px;
  `,

  DeleteButton: styled.button`
    background-color: transparent;
    border: none;
    cursor: pointer;
  `,

  TrashBinSvg: styled.img`
    width: 18px;
    height: 18px;
  `,
};

export default Styled;
