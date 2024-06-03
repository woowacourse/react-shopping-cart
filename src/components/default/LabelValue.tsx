import { css } from "@emotion/css";

interface LabelValueProps {
  label: string;
  value: string;
}

const LabelValue = ({ label, value }: LabelValueProps) => {
  return (
    <div className={containerCSS}>
      <p className={labelCSS}>{label}</p>
      <p className={valueCSS}>{value}</p>
    </div>
  );
};

export default LabelValue;

const containerCSS = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 42px;
`;

const labelCSS = css`
  font: var(--cart-subtitle);
  color: var(--grey-400);
`;

const valueCSS = css`
  font: var(--cart-title);
`;
