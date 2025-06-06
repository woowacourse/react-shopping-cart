import { css } from "@emotion/css";
import Text from "../@common/Text/Text";

interface SelectedItemCardProps {
  imgUrl: string;
  name: string;
  price: number;
  quantity: number;
}

const SelectedItemCard = ({
  imgUrl,
  name,
  price,
  quantity,
}: SelectedItemCardProps) => {
  return (
    <div>
      <div className={SelectedItemStyled}>
        <hr className={Divider} />

        <div className={SelectedItemContent}>
          <img
            className={SelectedItemImage}
            src={imgUrl || "./default.png"}
            alt={name}
            onError={(e) => {
              e.currentTarget.src = "./default.png";
            }}
          />
          <div className={SelectedItemDetails}>
            <Text text={name} />
            <Text text={price.toLocaleString() + "원"} type="large" />
            <div className={QuantityWrapper}>
              <Text text={quantity + "개"} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectedItemCard;

const SelectedItemStyled = css`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 20px;
`;

const Divider = css`
  border: 0.5px solid #e0e0e0;
`;

const SelectedItemContent = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 24px;
`;

const SelectedItemDetails = css`
  display: flex;
  flex-direction: column;
`;

const SelectedItemImage = css`
  width: 112px;
  height: 112px;
  border: none;
  object-fit: cover;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
`;

const QuantityWrapper = css`
  margin-top: 16px;
`;
