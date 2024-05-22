import { css } from "@emotion/css";

interface TitleProps {
  title: string;
  description?: string;
  showDescription?: boolean;
}

const Title = ({ title, description = "", showDescription = true }: TitleProps) => {
  return (
    <div className={TitleContainerCSS}>
      <div className={TitleCSS}>{title}</div>
      {showDescription && <p className={DescriptionCSS}>{description}</p>}
    </div>
  );
};

export default Title;

const TitleContainerCSS = css`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
`;

const TitleCSS = css`
  font: var(--cart-title);
`;

const DescriptionCSS = css`
  font: var(--cart-label);
  color: var(--grey-400);
  white-space: pre-line;
  line-height: 18px;
`;
