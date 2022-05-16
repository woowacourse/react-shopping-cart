import { css } from "@emotion/react";
import { useState } from "react";
import StyledThumbnail from "@/pages/home/components/thumbnail/Thumbnail.styled";

function Thumbnail({ className = "thumbnail", src }) {
  const [isLoaded, setIsLoaded] = useState(false);
  return (
    <StyledThumbnail className={className}>
      {!isLoaded && <div css={indicator}>isLoading</div>}
      <img src={src} alt="상품 이미지" onLoad={() => setIsLoaded(true)} />
    </StyledThumbnail>
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
