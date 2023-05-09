import styles from './style.module.css';

const ProductItem = () => {
  return (
    <div className={styles.container}>
      <img
        src="https://sitem.ssgcdn.com/04/30/92/item/1000047923004_i1_1100.jpg"
        alt="food"
        className={styles.image}
      />
      <div className={styles.informationContainer}>
        <div>
          <h6>삽겹살</h6>
          <h4>40,000원</h4>
        </div>
        <button>카트</button>
      </div>
    </div>
  );
};

export default ProductItem;
