function getSelectedProductIds(cart) {
  return Object.keys(cart).reduce((acc, id) => {
    cart[id].selected && acc.push(id);
    return acc;
  }, []);
}

export default getSelectedProductIds;
