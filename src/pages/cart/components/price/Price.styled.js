import styled from "@emotion/styled";

const StyledPrice = styled.section`
  width: 35%;
  height: 330px;
  margin-left: 5%;
  margin-top: 80px;
  border: 1px solid ${(props) => props.theme.colors.gray4};

  .cart-right-section__top {
    display: flex;
    align-items: center;
    padding: 16px 22px;
    margin: 0 10px;

    h3 {
      display: flex;
      align-items: center;
      font-size: 20px;
    }
  }

  hr {
    width: 100%;
    border: 1px solid ${(props) => props.theme.colors.gray1};
  }

  .cart-right-section__bottom {
    display: flex;
    flex-direction: column;

    .cart-right-section__bottom__price {
      display: flex;
      justify-content: space-between;
      padding: 20px;
      margin: 20px 10px 0 10px;

      .highlight-text {
        position: relative;
        font-weight: 700;
        display: inline-block;
        text-align: center;
        padding: 0 2px;
        font-size: 20px;
      }

      .highlight-text::after {
        content: "";
        display: block;
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 8px;
        background-color: ${(props) => props.theme.colors.green};
        opacity: 0.5;
        z-index: -1;
      }
    }

    .cart-right-section__bottom__button {
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 30px 30px 0 30px;

      button {
        display: flex;
        justify-content: center;
        align-items: center;
        background: ${(props) => props.theme.colors.green};
        font-size: 24px;
        color: ${(props) => props.theme.colors.white};
        width: 100%;
        padding: 20px;
        border: none;
        cursor: pointer;
      }
    }
  }
`;

export default StyledPrice;
