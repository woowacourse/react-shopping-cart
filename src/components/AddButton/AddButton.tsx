/** @jsxImportSource @emotion/react */

import { API_TOKEN } from "../../store/utils";
import { AddButtonStyle } from "./AddButton.style";

const AddButton = () => {
  return (
    <div
      css={AddButtonStyle}
      onClick={() => {
        const fn = async () => {
          await fetch(process.env.VITE_API_BASE_URL + "/cart-items", {
            method: "POST",
            headers: { "Content-Type": "application/json", Authorization: API_TOKEN },
            body: JSON.stringify({
              productId: 10,
            }),
          });
        };
        fn();
      }}
    >
      ADD
    </div>
  );
};

export default AddButton;
