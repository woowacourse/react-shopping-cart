import { css } from "@emotion/react";
import backButtonImage from "/assets/backButton.svg";

interface HeaderProps {
  title?: string;
  showBackButton: boolean;
}

function Header({ title = "", showBackButton }: HeaderProps) {
  return (
    <div css={HeaderContainer}>
      {showBackButton && (
        <button css={BackButton}>
          <img src={backButtonImage} />
        </button>
      )}

      <h2 css={HeaderTitle}>{title}</h2>
    </div>
  );
}

const HeaderContainer = css`
  width: 100%;
  height: 64px;
  background-color: black;
  display: flex;
  align-items: center;
  padding: 24px;
  gap: 8px;
`;

const HeaderTitle = css`
  font-size: 20px;
  font-weight: 800;
  color: white;
`;

const BackButton = css`
  width: 32px;
  height: 32px;
  background-color: transparent;
  border: none;
`;

export default Header;
