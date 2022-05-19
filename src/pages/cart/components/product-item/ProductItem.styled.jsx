import styled from "@emotion/styled";

const StyledCartContainer = styled.div`
  display: flex;
  justify-content: space-between;

  .product-item__left {
    display: flex;
    gap: 15px;
    margin-top: 10px;

    .checkbox {
      appearance: none;
      border: 1px solid #03cf5b;
      border-radius: 2px;
      width: 1.75rem;
      height: 1.75rem;
      cursor: pointer;
      align-self: start;
    }

    .checkbox:focus {
      outline: none;
    }

    .checkbox:checked {
      background-color: #03cf5b;
    }

    .checkbox:after {
      content: "✔";
      width: 100%;
      height: 100%;
      font-size: 0.75rem;
      color: white;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .checkbox-label {
      padding-left: 7px;
    }

    img {
      width: 144px;
      height: 144px;
    }

    .cart-name {
      font-size: 20px;
    }
  }

  .product-item__right {
    display: flex;
    flex-direction: column;
    align-items: end;
    justify-content: center;
    gap: 15px;

    .number-input-container {
      display: flex;
      justify-content: center;
      align-items: center;

      input::-webkit-outer-spin-button,
      input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }

      .number-input {
        width: 72px;
        height: 58px;
        border: 1px solid #dddddd;
        text-align: center;
        font-size: 24px;
      }

      div {
        display: flex;
        flex-direction: column;

        .number-input-button {
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 4px 12px;
          border: 1px solid #dddddd;
          font-size: 100%;
          cursor: pointer;
        }

        .number-input-button:focus {
          outline: none;
        }
      }

      .cart-price {
        color: #333333;
        align-self: flex-end;
      }
    }
  }
`;

export default StyledCartContainer;
