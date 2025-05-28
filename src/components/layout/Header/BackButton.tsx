import { useNavigate } from "react-router";

import backButton from "/backButton.png";

export default function BackButton() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/");
  };
  return (
    <button onClick={handleClick}>
      <img src={backButton}></img>
    </button>
  );
}
