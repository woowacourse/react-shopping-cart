import styled from '@emotion/styled';

const Styled = {
  Root: styled.section`
    margin: 60px 0;
  `,

  Cart: styled.div`
    display: flex;
    margin-top: 50px;
  `,

  CartListContainer: styled.div`
    flex: 1;
  `,

  CartListOption: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 26px;
    label: cart-list-option;
  `,

  DeleteButton: styled.button`
    border: 1px solid #bbbbbb;
    background: none;
    color: inherit;
    font-family: inherit;
    font-size: 16px;
    text-align: center;
    cursor: pointer;
    width: 117px;
    height: 50px;
  `,

  QuantityInputWrapper: styled.div`
    margin-bottom: 13px;
  `,

  CartListHeader: styled.div`
    font-size: 20px;
    padding-bottom: 16px;
    border-bottom: 4px solid #aaaaaa;
  `,

  CartItemList: styled.ul`
    margin: 0;
    padding: 0;
    list-style: none;
    width: 100%;
  `,

  CartItem: styled.li`
    display: flex;
    width: 100%;
    padding: 30px 0;
    border-bottom: 1.5px solid #cccccc;
  `,

  CartItemCheckbox: styled.div``,

  CartItemImage: styled.img`
    width: 144px;
    height: 144px;
    object-fit: contain;
    margin-left: 15px;
    border: 1px solid ${(props) => props.theme.borderColor.dividerGrey};
    box-sizing: border-box;
    border-radius: 2px;
  `,

  CartItemTitle: styled.div`
    flex: 1;
    margin-left: 20px;
    font-size: 20px;
    letter-spacing: 0.5px;
  `,

  CartItemOption: styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    margin-left: 20px;
  `,

  CartItemDelete: styled.button`
    background: none;
    border: none;
    color: inherit;
    cursor: pointer;
    margin-bottom: 20px;
  `,

  CartItemQuantity: styled.div``,

  CartItemPrice: styled.div`
    font-size: 16px;
  `,

  TotalPriceContainer: styled.div`
    width: 448px;
    display: flex;
    flex-direction: column;
  `,

  TotalPriceHeader: styled.div``,

  TotalPriceContent: styled.div``,

  OrderButton: styled.button`
    border: none;
    background-color: ${(props) => props.theme.bgColor.primary};
    color: ${(props) => props.theme.textColor.defaultWhite};
  `,
};

export default Styled;
