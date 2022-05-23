import { legacy_createStore as createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import reducer from "@redux/reducer";
import CartForm from "./CartForm";

export default {
  title: "Cart/CartForm",
  component: CartForm,
  argTypes: {},
};

const productList = [
  {
    id: "83kW9mUr",
    title: "Product Title",
    quantity: 10,
    price: "$120.00",
    thumbnail_image: {
      url: "https://place-hold.it/150x150",
      alt: "Product Image Alt",
    },
  },
  {
    id: "jBR5pmE5",
    title: "Product Title",
    quantity: 10,
    price: "$120.00",
    thumbnail_image: {
      url: "https://place-hold.it/150x150",
      alt: "Product Image Alt",
    },
  },
  {
    id: "mUtrhmnU",
    title: "Product Title",
    quantity: 10,
    price: "$120.00",
    thumbnail_image: {
      url: "https://place-hold.it/150x150",
      alt: "Product Image Alt",
    },
  },
];

const productObjs = productList.reduce((acc, cur) => {
  acc[cur.id] = cur;
  return acc;
}, {});

const initialState = {
  productList,
  productObjs,
  cart: {
    [productList[0].id]: { quantity: 1, selected: false },
    [productList[1].id]: { quantity: 1, selected: false },
  },
};

const store = createStore(reducer, initialState, applyMiddleware(thunk));

function Template(args) {
  return (
    <Provider store={store}>
      <div style={{ maxWidth: "600px" }}>
        <CartForm {...args} />
      </div>
    </Provider>
  );
}

export const Primary = Template.bind({});
