import BackButtonIcon from "@/assets/back-button.svg?react";
import { useNavigate } from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate();

  return <BackButtonIcon onClick={() => navigate(-1)} />;
};

export default BackButton;
