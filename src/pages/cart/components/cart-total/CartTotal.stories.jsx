import { legacy_createStore as createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import reducer from "@redux/reducer";
import productsFromJSON from "@mock/products.json";
import CartTotal from "./CartTotal";

export default {
  title: "Cart/CartTotal",
  component: CartTotal,
  argTypes: {},
};

const productList = productsFromJSON.map((product) => {
  const newProduct = structuredClone(product);
  newProduct.thumbnail_image = {
    url: "https://place-hold.it/150x150",
    alt: "Product Image Alt",
  };
  return newProduct;
});

const productObjs = productList.reduce((acc, cur) => {
  acc[cur.sku] = cur;
  return acc;
}, {});

const initialState = {
  productList,
  productObjs,
  cart: productList
    .splice(0, Math.ceil(productList.length / 2))
    .reduce((acc, product) => {
      acc[product.sku] = { quantity: 1, selected: false };
      return acc;
    }, {}),
};

const store = createStore(reducer, initialState, applyMiddleware(thunk));

function Template(args) {
  return (
    <Provider store={store}>
      <div style={{ maxWidth: "400px" }}>
        <CartTotal {...args} />
      </div>
    </Provider>
  );
}

export const Primary = Template.bind({});
