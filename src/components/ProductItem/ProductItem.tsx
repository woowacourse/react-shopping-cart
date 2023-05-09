import styles from './style.module.css';

interface ProductItemProps {
  information: {
    id: number;
    name: string;
    price: number;
    imageUrl: string;
  };
}

const ProductItem = ({ information }: ProductItemProps) => {
  return (
    <div className={styles.container}>
      <img src={information.imageUrl} alt={information.name} className={styles.image} />
      <div className={styles.informationContainer}>
        <div>
          <h4>{information.name}</h4>
          <h4>{information.price}원</h4>
        </div>
        <button>카트</button>
      </div>
    </div>
  );
};

export default ProductItem;
