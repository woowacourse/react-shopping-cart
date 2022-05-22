import styled from "@emotion/styled";

const StyledThumbnail = styled.div`
  min-height: 295px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    cursor: pointer;
    border-radius: 10px;
  }
`;

export default StyledThumbnail;
