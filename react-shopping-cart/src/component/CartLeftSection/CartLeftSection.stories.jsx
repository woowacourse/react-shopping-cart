import CartLeftSection from "./CartLeftSection";

export default {
  title: "CartLeftSection",
  component: CartLeftSection,
  decorators: [
    (Story) => (
      <div style={{ width: "490px" }}>
        <Story />
      </div>
    ),
  ],
};

export const DefaultCartLeftSection = (args) => <CartLeftSection {...args} />;
DefaultCartLeftSection.args = {};
