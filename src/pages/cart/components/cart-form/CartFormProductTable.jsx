import CartItem from "../cart-item/CartItem";

function CartFormProductTable({
  cart,
  productObjs,
  productIdsInCart,
  selectedProductIds,
  onCheck,
  onQuantityChange,
  onDeleteProduct,
  className,
}) {
  return (
    <table className={className}>
      <tbody>
        {productIdsInCart.map((id) => {
          const isSelected = selectedProductIds.indexOf(id) > -1;
          return (
            <tr key={id}>
              <td>
                <CartItem
                  {...productObjs[id]}
                  id={id}
                  name={productObjs[id].name}
                  thumbnail_image={productObjs[id].thumbnail_image}
                  price={productObjs[id].price}
                  checked={isSelected}
                  onChecked={onCheck(id)}
                  onQuantityChange={onQuantityChange(id)}
                  onDelete={onDeleteProduct(id)}
                  quantity={cart[id].quantity}
                />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default CartFormProductTable;
