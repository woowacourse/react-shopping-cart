import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { CartItem } from "../type/CartItem"

const useSelectedCartIds = (cartItemsData: CartItem[]) => {
  const [selectedCartIds, setSelectedCartIds] = useState<number[]>([])
  const initialized = useRef(false)

  useEffect(() => {
    if (!initialized.current && cartItemsData.length) {
      const allIds = cartItemsData.map((item) => item.id)
      setSelectedCartIds(allIds)
      initialized.current = true
    }
  }, [cartItemsData])

  const handleSelectCartItem = useCallback(
    (id: number) => {
      if (selectedCartIds.includes(id)) {
        setSelectedCartIds((prev) => prev.filter((cartId) => cartId !== id))
      } else {
        setSelectedCartIds((prev) => [...prev, id])
      }
    },
    [selectedCartIds]
  )

  const handleSelectAllCartItems = useCallback(
    (isAllSelected: boolean) => {
      if (isAllSelected) {
        setSelectedCartIds([])
      } else {
        const allIds = cartItemsData.map((item) => item.id)
        setSelectedCartIds(allIds)
      }
    },
    [cartItemsData]
  )

  const isAllSelected = useMemo(
    () =>
      cartItemsData.length > 0 &&
      cartItemsData.every((item) => selectedCartIds.includes(item.id)),
    [cartItemsData, selectedCartIds]
  )

  return {
    selectedCartIds,
    isAllSelected,
    handleSelectCartItem,
    handleSelectAllCartItems,
  }
}

export default useSelectedCartIds
