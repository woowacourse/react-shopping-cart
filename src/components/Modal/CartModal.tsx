import Modal from './Modal/Modal';
import * as styles from './CartModal.style';
import Button from '../Button/Button';
import Counter from '../Counter/Counter';
import Image from '../Image/Image';
import { RemoveFromCartButton } from '../CartButton/CartButton';
import { useErrorContext } from '../../contexts/ErrorContext';
import patchCartItem from '../../api/patchCartItem';
import { deleteCartItem } from '../../api/deleteCartItem';
import { cartItemMapper } from '../../api/model/cartItemMapper';
import useCartItems from '../../hooks/api/useCartItems';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartModal({ isOpen, onClose }: CartModalProps) {
  const { showError } = useErrorContext();
  const { data: cartItems, fetcher: refetchCart } = useCartItems();

  const items = cartItems?.content ?? [];

  const totalPrice = items.reduce((acc, item) => acc + item.quantity * item.product.price, 0);

  const handleDeleteCart = async (id: number) => {
    try {
      await deleteCartItem(id);
      await refetchCart();
    } catch (err) {
      if (err instanceof Error) showError(err);
    }
  };

  const handleQuantityChange = async (id: number, newQuantity: number) => {
    try {
      await patchCartItem(id, newQuantity);
      await refetchCart();
    } catch (err) {
      if (err instanceof Error) showError(err);
    }
  };

  return (
    <Modal data-testid="cart-modal" isOpen={isOpen} onClose={onClose} position="bottom" size="small">
      <Modal.BackDrop css={styles.backdropCss} />
      <Modal.Content css={styles.contentCss}>
        <Modal.Title css={styles.titleCss}>장바구니</Modal.Title>

        <ul css={styles.modalContent}>
          {items.map((item) => {
            const viewModel = cartItemMapper(item);

            return (
              <li key={viewModel.id} css={styles.cartItemWrapper}>
                <div css={styles.cartItem}>
                  <div css={styles.cartImageWrapper}>
                    <Image src={viewModel.imageUrl} alt={`${viewModel.title} 상품 이미지`} />
                  </div>
                  <div css={styles.cartTextBlock}>
                    <h3 css={styles.titleCss}>{viewModel.title}</h3>
                    <p>{viewModel.price}</p>
                    <Counter
                      value={viewModel.cartQuantity}
                      onDecrement={() => handleQuantityChange(viewModel.id, viewModel.cartQuantity - 1)}
                      onIncrement={() => {
                        if (viewModel.cartQuantity >= viewModel.productQuantity) {
                          showError(new Error('수량을 초과해서 담을 수 없어요.'));
                          return;
                        }
                        handleQuantityChange(viewModel.id, viewModel.cartQuantity + 1);
                      }}
                    />
                  </div>
                </div>
                <RemoveFromCartButton onClick={() => handleDeleteCart(viewModel.id)} />
              </li>
            );
          })}
        </ul>

        <Modal.Footer>
          <div css={styles.footerCss}>
            <div css={styles.totalPriceCss}>
              <p>총 결제 금액</p>
              <p>{totalPrice.toLocaleString()}원</p>
            </div>
            <Button css={styles.buttonCss} onClick={onClose}>
              닫기
            </Button>
          </div>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
}
