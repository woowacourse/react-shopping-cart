import { StoryFn, Meta } from "@storybook/react";
import { rest } from "msw";
import products from "mocks/mockData.json";
import ItemList from "components/ItemList";

export default {
  title: "ItemList",
  component: ItemList,
} as Meta;

const Template: StoryFn = () => <ItemList />;

export const ListSample = Template.bind({});

ListSample.parameters = {
  msw: {
    handlers: [
      rest.get("/products", (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(products));
      }),
    ],
  },
};
