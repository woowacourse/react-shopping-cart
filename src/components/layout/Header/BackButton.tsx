import { useNavigate } from "react-router";

import backButton from "../../../assets/backButton.png";

import { DEFAULT_URL } from "../../../router";

export default function BackButton() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(DEFAULT_URL);
  };
  return (
    <button onClick={handleClick}>
      <img src={backButton}></img>
    </button>
  );
}
