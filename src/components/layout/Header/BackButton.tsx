import { useNavigate } from "react-router";

import backButton from "../../../assets/backButton.png";
interface BackButtonProps {
  onClick?: () => void;
}

export default function BackButton({ onClick }: BackButtonProps) {
  const navigate = useNavigate();
  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      navigate("/");
    }
  };
  return (
    <button onClick={handleClick}>
      <img src={backButton} alt="뒤로가기" />
    </button>
  );
}
