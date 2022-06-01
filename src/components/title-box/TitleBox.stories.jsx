import TitleBox from "./TitleBox";
import TitleBoxContent from "./TitleBoxContent";
import TitleBoxHead from "./TitleBoxHead";

export default {
  title: "TitleBox/TitleBox",
  component: TitleBox,
  argTypes: {},
};

function Template(args) {
  return (
    <TitleBox {...args}>
      <TitleBoxHead>Box Title</TitleBoxHead>
      <TitleBoxContent>This Is Content</TitleBoxContent>
    </TitleBox>
  );
}

export const Primary = Template.bind({});
