import ArrowBack from "@/assets/Arrow-Back.svg";
import Logo from "@/assets/Logo.svg";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";

type HeaderType = "Logo" | "ArrowBack" | "none";

interface Props {
  type?: HeaderType;
}

const Header = ({ type = "Logo" }: Props) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (type === "ArrowBack") {
      navigate(-1);
      return;
    }
    navigate("/");
  };

  return (
    <StyledHeader>
      {type !== "none" && (
        <img src={getHeaderButtonImg(type)} alt="" onClick={handleClick} />
      )}
    </StyledHeader>
  );
};
export default Header;

const getHeaderButtonImg = (type: HeaderType) => {
  switch (type) {
    case "Logo":
      return Logo;
    case "ArrowBack":
      return ArrowBack;
    default:
      return "";
  }
};

const StyledHeader = styled.header`
  width: 100%;
  height: 64px;
  background-color: black;
  box-sizing: border-box;
  padding: 24px;
`;
