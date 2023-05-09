interface ProductItemProps {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
}

function ProductItem({ id, name, price, imageUrl }: ProductItemProps) {
  return (
    <div>
      <img src={imageUrl} />
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <div>{name}</div>
          <div>{price}</div>
        </div>
        <div>🛒</div>
      </div>
    </div>
  );
}

export default ProductItem;
