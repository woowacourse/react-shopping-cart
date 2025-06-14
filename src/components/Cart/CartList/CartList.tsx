import * as Styled from "./CartList.style"

import { PropsWithChildren } from "react"

function CartList({ children }: PropsWithChildren) {
  return <Styled.UlContainer>{children}</Styled.UlContainer>
}

export default CartList
