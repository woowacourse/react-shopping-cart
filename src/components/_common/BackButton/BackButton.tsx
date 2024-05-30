import BackButtonIcon from "@/assets/back-button.svg?react";

const BackButton = ({ onClick }: { onClick: () => void }) => {
  return <BackButtonIcon onClick={onClick} />;
};

export default BackButton;
