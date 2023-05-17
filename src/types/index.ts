interface ProductCardProps {
  productId: number;
  productImage: string;
  productName: string;
  productPrice: number;
  productQuantity: number;
}

interface ProductQuantityInputProps {
  initialValue: number;
  productId: number;
  step?: number;
  notifyFunction?: (value: number) => void;
}

export type { ProductCardProps, ProductQuantityInputProps };
