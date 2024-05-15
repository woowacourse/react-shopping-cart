/** @jsxImportSource @emotion/react */

import { API_TOKEN } from "../../store/utils";
import { AddButtonStyle } from "./AddButton.style";

const AddButton = () => {
  return (
    <div
      css={AddButtonStyle}
      onClick={() => {
        // console.log("POST");
        // const fn = async () => {
        // await fetch(import.meta.env.VITE_API_BASE_URL + "/cart-items", {
        //     method: "POST",
        //     headers: { "Content-Type": "application/json", Authorization: API_TOKEN },
        //     body: JSON.stringify({
        //       productId: 10,
        //     }),
        //   });
        // };
        const fn = async () => {
          await fetch(import.meta.env.VITE_API_BASE_URL + "/cart-items/329", {
            method: "PATCH",
            headers: { "Content-Type": "application/json", Authorization: API_TOKEN },
            body: JSON.stringify({
              quantity: 2,
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
