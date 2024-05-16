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
              productId: 10, // 2, 3, 10, 11, 12, 21, 34로 설정해서 상품을 장바구니에 추가할 수 있습니다.
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
