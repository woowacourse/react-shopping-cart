import { useState, useEffect, useCallback } from "react";
import { useSetRecoilState } from "recoil";
import cartProductsState from "../store/cartProductAtom";

interface UseQuantityUpdaterProps {
  productId: number;
}

const removeNonDigits = (value: string) => {
  return value.replace(/[^0-9]/g, "");
};

/**
 * useQuantityUpdater Hook은 장바구니 수량 관리를 관리하는 Input에 사용하여
 * 편리하게 값을 관리하기 위한 Hook입니다.
 *
 * @param productId - 값을 업데이트할 때 사용할 품목 번호
 *
 * @returns inputValue - 현재 수량 Input의 값을 제공합니다.
 * @returns isButtonMode - 컴포넌트를 버튼 형태로 표시해야 할지, 카운터 형태로 표시해야 할지를 알려드립니다.
 * @returns setIsFocused - Input이 선택 중인지를 제어할 수 있습니다.
 *                이 상태에 따라 실제로 값을 Recoil State에 전달할지, 컴포넌트의 형태를 변경할지가 결정됩니다.
 * @returns updateInputValue - Input의 값을 새로운 값으로 업데이트합니다. 이 과정에서 숫자가 아닌 값은 삭제됩니다.
 * @returns initializeInputValue - Input의 값을 1로 초기화시키면서, 컴포넌트를 카운터 형태로 표시합니다.
 * @returns incrementInputValue - Input의 값을 지정된 값만큼 변경시킵니다.
 */
const useQuantityUpdater = ({ productId }: UseQuantityUpdaterProps) => {
  const [inputValue, setInputValue] = useState("0");
  const [isFocused, setIsFocused] = useState(false);
  const [isButtonMode, setIsButtonMode] = useState(false);
  const setCartProducts = useSetRecoilState(cartProductsState);

  const updateProduct = useCallback(() => {
    if (!isFocused) {
      setCartProducts((previousCartProducts) => ({
        ...previousCartProducts,
        [productId]: Number(inputValue),
      }));
    }
  }, [isFocused, setCartProducts, productId, inputValue]);

  useEffect(() => {
    updateProduct();
  }, [updateProduct]);

  useEffect(() => {
    const newInputValue = Math.max(Number(inputValue), 0);

    setIsButtonMode(() => !isFocused && newInputValue === 0);
  }, [isFocused, inputValue]);

  const updateInputValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(() => {
      const newInputValue = removeNonDigits(event.target.value);
      setIsFocused(() => true);

      return newInputValue;
    });
  };

  const initializeInputValue = () => {
    setInputValue(() => "1");
  };

  const incrementInputValue = (incrementValue: number) => {
    setInputValue((previousInputValue) =>
      Math.max(Number(previousInputValue) + incrementValue, 0).toString()
    );
  };

  return {
    inputValue,
    isButtonMode,
    setIsFocused,
    updateInputValue,
    initializeInputValue,
    incrementInputValue,
  };
};

export default useQuantityUpdater;
