import { css } from "@emotion/react";
import { useState } from "react";
import S from "../../styled";

function Thumbnail({ className = "thumbnail", src }) {
  const [isLoaded, setIsLoaded] = useState(false);
  return (
    <S.Thumbnail className={className}>
      {!isLoaded && <div css={indicator}>isLoading</div>}
      <img src={src} alt="상품 이미지" onLoad={() => setIsLoaded(true)} />
    </S.Thumbnail>
  );
}

const indicator = css`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: white;
`;

export default Thumbnail;
