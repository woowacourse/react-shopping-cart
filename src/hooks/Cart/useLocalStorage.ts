import { CartItem } from "@/type/CartItem";
import { useEffect } from "react";

interface UseLocalStorageProps {
  cartItemsData: CartItem[];
  selectedCartIds: Set<string>;
  setSelectedCartIds: React.Dispatch<React.SetStateAction<Set<string>>>;
}

// 해당 부분은 수정중에 있습니다!
export default function useLocalStorage({
  cartItemsData,
  selectedCartIds,
  setSelectedCartIds,
}: UseLocalStorageProps) {
  // 1. 첫 마운트 때만 localStorage → state 동기화
  useEffect(() => {
    const stored = localStorage.getItem("selectedCartIds");
    if (!stored) return;

    try {
      const parsed: string[] = JSON.parse(stored);
      if (parsed.length) setSelectedCartIds(new Set(parsed));
    } catch {
      /* 파싱 실패 시 무시 */
    }
  }, []);

  // 2. cartItemsData 변동 시 선택된 ID 중 유효하지 않은 것만 제거
  useEffect(() => {
    if (cartItemsData.length === 0) return;

    const validIds = new Set(cartItemsData.map((i) => i.id));
    setSelectedCartIds((prev) => {
      const filtered = new Set(
        Array.from(prev).filter((id) => validIds.has(id))
      );
      return filtered;
    });
  }, [cartItemsData]);

  // 3. 선택 항목이 바뀔 때마다 state → localStorage 저장
  useEffect(() => {
    localStorage.setItem(
      "selectedCartIds",
      JSON.stringify(Array.from(selectedCartIds))
    );
  }, [selectedCartIds]);
}
