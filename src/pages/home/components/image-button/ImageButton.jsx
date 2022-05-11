import { css } from "@emotion/react";

function ImageButton({ src }) {
  return (
    <button className="add-cart-btn" type="button">
      <img
        css={css`
          width: 100%;
        `}
        src={src}
        alt=""
      />
    </button>
  );
}

export default ImageButton;
