import React from "react";
import Header from "@shared/header/Header";
import styles from "@/app.module";
import Home from "@home/Home";
import Cart from "@cart/Cart";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Header className={styles.header} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
