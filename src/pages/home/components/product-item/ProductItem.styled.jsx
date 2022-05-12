import styled from "@emotion/styled";
import { noneStyles } from "../../../../styled";
import Lefttop from "../../../../assets/images/lefttop.png";
import Righttop from "../../../../assets/images/righttop.png";
import LeftBottom from "../../../../assets/images/leftbottom.png";
import Rightbottom from "../../../../assets/images/bottomright.png";

const StyledProductItem = styled.div`
  position: relative;
  border: 1px solid #80ff6650;
  border-radius: 5px;
  transition: 0.3s ease;

  :hover {
    border: 1px solid #80ff66;
    .thumbnail {
      img {
        transform: scale(1.08, 1.08);
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

  &::after {
    content: "";
    position: absolute;
    top: -3px;
    right: -3px;
    bottom: -3px;
    left: -3px;
    background: url(${Lefttop}) top left no-repeat,
      url(${Righttop}) top right no-repeat,
      url(${LeftBottom}) bottom left no-repeat,
      url(${Rightbottom}) bottom right no-repeat;
  }
  .overlay {
    position: absolute;
    background-color: rgba(0, 0, 0, 0.5);
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;

    background: linear-gradient(0deg, rgba(0, 0, 0, 0.5) 50%, transparent 50%),
      linear-gradient(0deg, #000 0%, transparent 100%) center bottom no-repeat;
    background-size: 1px 2px, 100% 66px;
  }
  .content {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 2;
    .product-detail {
      display: flex;
      padding: 10px 0px 10px 15px;
      .l-left {
        width: 100%;
      }

      color: #80ff66;
      .product-title {
      }
      .product-price {
      }
    }
    .add-cart-btn {
      ${noneStyles.button}
      width: 50px;
      padding-right: 12px;
    }
  }
`;

export default StyledProductItem;
