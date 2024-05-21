import TextBox from "../TextBox/TextBox";
import MoreInfoIcon from "@/assets/more-info.svg?react";

const MoreInfo = ({ text }: { text: string }) => {
  return <TextBox type="xSmall" asset={() => <MoreInfoIcon />} text={text} />;
};

export default MoreInfo;
