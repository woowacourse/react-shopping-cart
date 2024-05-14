import React, { useEffect, useState } from "react";
import { css } from "@emotion/css";
import CartItem from "./CartItem";
import { Button } from "../default/Button";
import CheckIcon from "../../assets/CheckIcon.svg?react";
import Splitter from "../default/Splitter";
import { Product } from "../../types";
import { fetchCartItems } from "../../api/CartItem";

const CartItems = () => {
  const [allChecked, setAllChecked] = useState(false);
  const [cartItems, setCartItmes] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchCartItems();
        setCartItmes(data);
      } catch (error) {
        setError(error as Error);
      }
      setLoading(false);
    };
    fetchData();
  }, []);
  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const handleAllChecked = () => {
    setAllChecked(!allChecked);
  };

  return (
    <div className={cardItemCSS}>
      <div className={allCheckContainerCSS}>
        <Button variant={allChecked ? "primary" : "secondary"} onClick={handleAllChecked}>
          <CheckIcon fill={allChecked ? "#ffffff" : "#0000001A"} />
        </Button>
        <span>전체 선택</span>
      </div>
      <div>
        {cartItems.map((item) => (
          <div>
            <Splitter />
            <CartItem product={item} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CartItems;

const cardItemCSS = css`
  width: 100%;
`;

const allCheckContainerCSS = css`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 20px;
`;
