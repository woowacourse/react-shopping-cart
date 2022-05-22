import { css } from "@emotion/react";
import { useState } from "react";
import StyledThumbnail from "@/pages/home/components/thumbnail/Thumbnail.styled";

function Thumbnail({ src, name }) {
  const [isLoaded, setIsLoaded] = useState(false);
  return (
    <StyledThumbnail className="thumbnail">
      {!isLoaded && <div css={indicator}>isLoading</div>}
      <img src={src} alt={name} onLoad={() => setIsLoaded(true)} />
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
