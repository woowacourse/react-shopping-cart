import addToCart from '../../api/post/addToCart';

const AddItem = () => {
  const addItem = async () => {
    // 2, 3, 10, 11, 12, 21, 34 등등
    await addToCart(2);
  };

  return <button onClick={addItem}>추가</button>;
};

export default AddItem;
