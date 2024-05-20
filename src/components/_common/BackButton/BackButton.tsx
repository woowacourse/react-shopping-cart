import { useNavigate } from "react-router-dom";

import BackButtonIcon from "@/assets/back-button.svg?react";
import Button from "../Button/Button";

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <Button theme="transparent" width="fit">
      <BackButtonIcon onClick={() => navigate(-1)} />
    </Button>
  );
};

export default BackButton;
