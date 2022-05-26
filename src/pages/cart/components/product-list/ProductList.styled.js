import styled from "@emotion/styled";

const StyledProductList = styled.section`
  width: 60%;
  margin-top: 50px;

  div {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .checkbox-container {
      display: flex;

      .checkbox {
        appearance: none;
        border: 1px solid ${(props) => props.theme.colors.green};
        border-radius: 2px;
        width: 1.75rem;
        height: 1.75rem;
        cursor: pointer;
      }

      .checkbox:focus {
        outline: none;
      }

      .checkbox:checked {
        background-color: ${(props) => props.theme.colors.green};
      }

      .checkbox:after {
        content: "✔";
        width: 100%;
        height: 100%;
        font-size: 0.75rem;
        color: ${(props) => props.theme.colors.white};
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .checkbox-label {
        padding-left: 7px;
      }
    }

    .delete-button {
      padding: 12px 22px;
      border: 1px solid ${(props) => props.theme.colors.gray2};
      cursor: pointer;
    }
  }

  .cart-title {
    display: flex;
    align-items: center;
    margin-top: 50px;
    font-size: 20px;
  }

  .cart-title-border {
    border: 2px solid ${(props) => props.theme.colors.gray1};
  }
`;

export default StyledProductList;
