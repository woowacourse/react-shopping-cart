const areAllItemsChecked = (isCheckedMap: Record<number, boolean>) => {
  return Object.values(isCheckedMap).every((value) => value === true);
};

export default areAllItemsChecked;
