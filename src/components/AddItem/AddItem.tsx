import addToCart from '../../api/post/addToCart';

const AddItem = () => {
  const addItem = async () => {
    await addToCart(10);
  };

  return <button onClick={addItem}>추가</button>;
};

export default AddItem;
