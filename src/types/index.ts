interface ProductCardProps {
  productId: number;
  productImage: string;
  productName: string;
  productPrice: number;
}

interface ProductQuantityInputProps {
  productId: number;
  step?: number;
}

export type { ProductCardProps, ProductQuantityInputProps };
