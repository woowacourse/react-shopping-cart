import { css } from "@emotion/css";
import { useRecoilState } from "recoil";
import { cartItemsAtom } from "../../recoil/atom";

interface LabelValueProps {
  label: string;
  value: string;
}

const LabelValue = ({ label, value }: LabelValueProps) => {
  useRecoilState(cartItemsAtom);
  return (
    <div className={containerCSS}>
      <div>
        <p className={labelCSS}>{label}</p>
      </div>
      <div>
        <p className={valueCSS}>{value}</p>
      </div>
    </div>
  );
};

export default LabelValue;

const containerCSS = css`
  display: flex;
  width: 100%;
  height: 42px;
  justify-content: space-between;
  align-items: center;
`;

const labelCSS = css`
  font-family: Noto Sans;
  font-size: 16px;
  font-weight: 700;
  line-height: 16px;
  text-align: left;
`;

const valueCSS = css`
  font-family: Noto Sans KR;
  font-size: 24px;
  font-weight: 700;
  line-height: 34.75px;
  text-align: right;
`;
