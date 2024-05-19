import { useNavigate } from "react-router-dom";
import Button from "../../_common/Button";
import styled from "styled-components";

const HomeButton = () => {
  const navigate = useNavigate();

  const handleMoveToHomePage = () => {
    navigate("/");
  };

  return <StyledButton onClick={handleMoveToHomePage}>SHOP</StyledButton>;
};

export default HomeButton;

const StyledButton = styled(Button)`
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-extra-bold);
  line-height: 16px;
`;
