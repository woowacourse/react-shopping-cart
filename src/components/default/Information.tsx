import { css } from "@emotion/css";
import InfoIcon from "../../assets/InfoIcon.svg?react";

interface InformationProps {
  title: string;
}

const Information = ({ title }: InformationProps) => {
  return (
    <div className={InfoContainer}>
      <InfoIcon />
      <span className={InfoTextCSS}>{title}</span>
    </div>
  );
};

export default Information;

const InfoContainer = css`
  display: flex;
  gap: 4px;
`;

const InfoTextCSS = css`
  font: var(--cart-label);
  color: var(--grey-400);
`;
