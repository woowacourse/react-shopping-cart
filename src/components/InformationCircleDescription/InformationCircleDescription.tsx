import { PropsWithChildren } from "react";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { informationContainerStyle, informationStyle } from "./InformationCircleDescription.style";

const InformationCircleDescription = ({ children }: PropsWithChildren) => {
  return (
    <div css={informationContainerStyle}>
      <IoIosInformationCircleOutline size={15} />
      <div css={informationStyle}>{children}</div>
    </div>
  );
};

export default InformationCircleDescription;
