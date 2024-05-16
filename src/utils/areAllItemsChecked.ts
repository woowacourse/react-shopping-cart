const areAllItemsChecked = (productIds: number[]) => {
  return productIds.every((id) => {
    const item = window.localStorage.getItem(JSON.stringify(id));
    return item ? JSON.parse(item) : false;
  });
};

export default areAllItemsChecked;
