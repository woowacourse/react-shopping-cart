import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import IMAGES from "../../assets/images/Images";
import { COLOR, FONT_SIZE, FONT_WEIGHT } from "../../constants/styles";

type HeaderType = "logo" | "goBack";

const Header = ({ type = "logo" }: { type?: HeaderType }) => {
  const router = useNavigate();

  if (type === "logo") {
    return (
      <HeaderContainer>
        <HeaderTitle>SHOP</HeaderTitle>
      </HeaderContainer>
    );
  }

  if (type === "goBack") {
    return (
      <HeaderContainer>
        <GoBackButton onClick={() => router(-1)}>
          <Img src={IMAGES.goBack} />
        </GoBackButton>
      </HeaderContainer>
    );
  }
};

export default Header;

const HeaderContainer = styled.div`
  width: 100%;
  height: 64px;
  background: ${COLOR.black};
  align-items: center;
  display: flex;
  color: ${COLOR.white};
  padding: 24px;
  box-sizing: border-box;
`;

const HeaderTitle = styled.h2`
  font-size: ${FONT_SIZE.large};
  font-weight: ${FONT_WEIGHT.extraBold};
  line-height: 16px;
  text-align: left;
`;

const GoBackButton = styled.button`
  background: transparent;
  color: ${COLOR.white};
  padding: 0;
`;

const Img = styled.img`
  width: 21px;
  height: 21px;
`;
