import { useNavigate } from "react-router-dom";
import Button from "@/components/_common/Button";
import BackArrow from "@/assets/icons/BackArrow";

const BackButton = () => {
  const navigate = useNavigate();

  const handleMoveToPreviousPage = () => {
    navigate(-1);
  };

  return (
    <Button onClick={handleMoveToPreviousPage}>
      <BackArrow />
    </Button>
  );
};

export default BackButton;
