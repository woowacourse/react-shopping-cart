import { css } from "@emotion/css";
import Text from "../@common/Text/Text";

interface PriceRowProps {
  title: string;
  price: number;
}

const PriceRow = ({ title, price }: PriceRowProps) => {
  return (
    <div className={PriceRowStyle}>
      <Text text={title} type="medium" />
      <Text text={price.toLocaleString() + "원"} type="large" />
    </div>
  );
};
export default PriceRow;

const PriceRowStyle = css`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
