import styled from "@emotion/styled";

const StyledProductItem = styled.div`
  position: relative;
  transition: 0.3s ease;
  margin: 10px 0;

  :hover {
    .thumbnail {
      img {
        transform: scale(0.99);
      }
    }
  }

  .thumbnail {
    overflow: hidden;
    height: 100%;
    img {
      transition: 0.3s ease;
    }
  }

  .content {
    position: absolute;
    margin-top: 5px;

    left: 0;
    right: 0;
  }
`;

export default StyledProductItem;
