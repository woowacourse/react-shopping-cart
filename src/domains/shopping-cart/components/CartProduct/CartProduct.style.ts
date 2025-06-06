import { css } from "@emotion/react";

const CartProductLayout = css`
  display: flex;
  gap: 0px 24px;
  width: 100%;
  height: 112px;
`;

const ProductImg = (imageUrl: string) => {
  return css`
    width: 112px;
    border-radius: 8px;
    background-image: ${`url(${imageUrl})`},
      url("https:lh3.googleusercontent.com/proxy/3Fqjhno28S6v1khXPS44ukHF-8y2Kue7oKfnyqCR4_vX7ze7O20WFu7CzZTq_KQaLwDrpMUNFhUD345MdmKB9ZzzejPJCfHmRAf2rMIzQhkFy9n9kMPPAf4hi7wIZm0cmjLSnTkiaj3g9mAA");
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
  `;
};

const TitleLayout = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 8px;
`;

const ProductPrice = css`
  font-weight: 700;
  font-size: 16px;
`;

const ProductName = css`
  font-weight: 500;
  font-size: 12px;
`;

const deleteButton = css`
  display: flex;
  height: fit-content;
`;

export {
  CartProductLayout,
  ProductImg,
  TitleLayout,
  ProductName,
  ProductPrice,
  deleteButton,
};
