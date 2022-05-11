import ExpectedPaymentBottomContainer from "./ExpectedPaymentBottomContainer";
import ExpectedPaymentBox from "../ExpectedPaymentBox/ExpectedPaymentBox";
import OrderButton from "../OrderButton/OrderButton";

export default {
  title: "ExpectedPaymentBottomContainer",
  component: ExpectedPaymentBottomContainer,
  decorators: [
    (Story) => (
      <div style={{ width: "298px" }}>
        <Story />
      </div>
    ),
  ],
};

export const DefaultExpectedPaymentBottomContainer = (args) => (
  <ExpectedPaymentBottomContainer {...args}>
    <ExpectedPaymentBox />
    <OrderButton>주문하기(2개)</OrderButton>
  </ExpectedPaymentBottomContainer>
);
DefaultExpectedPaymentBottomContainer.args = {
  price: "23,210",
};
