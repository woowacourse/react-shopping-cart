const initialState = {
  products: Array.from({ length: 10 }).map((_, idx) => ({
    id: idx,
    title: `${idx}드록바`,
    imgUrl: "https://i.ibb.co/8X0KLCr/iOS.jpg",
    price: 3000000,
  })),
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    default:
      return state;
  }
}
