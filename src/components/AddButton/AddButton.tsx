/** @jsxImportSource @emotion/react */

import { useNavigate } from "react-router-dom";
import { AddButtonStyle } from "./AddButton.style";
import { request } from "../../store/api";

const AddButton = () => {
  const navigate = useNavigate();

  return (
    <div
      css={AddButtonStyle}
      onClick={async () => {
        // productId로 2, 3, 10, 11, 12, 21, 34를 설정해서 상품을 장바구니에 추가할 수 있습니다.
        await request({ endpoint: "/cart-items", method: "POST", body: { productId: 3 } });
        navigate(0);
      }}
    >
      ADD
    </div>
  );
};

export default AddButton;
