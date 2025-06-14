import fetchCartItems from "../fetchCartItems"

const getCartItems = async () => {
  const { content } = await fetchCartItems({
    params: { page: "0", size: "20" },
  })
  return content
}

export default getCartItems
