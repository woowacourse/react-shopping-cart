import { useNavigate } from "react-router";

import backButton from "../../../assets/backButton.png";

export default function BackButton() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/react-shopping-cart");
  };
  return (
    <button onClick={handleClick}>
      <img src={backButton}></img>
    </button>
  );
}
