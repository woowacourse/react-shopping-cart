import React from "react";
import Header from "@shared/header/Header";
import styles from "@/app.module";
import Modal from "@shared/modal/Modal";
import useModal from "@shared/modal/useModal";
import Home from "@home/Home";
import Cart from "@cart/Cart";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";

function NestedComponent() {
  const { show } = useModal();
  return (
    <button type="button" onClick={show}>
      Show Modal
    </button>
  );
}

function ModalTestApp() {
  const { isVisible, hide } = useModal();

  return (
    <>
      <Modal isVisible={isVisible}>
        <button type="button" onClick={hide}>
          Hide Modal!
        </button>
      </Modal>
      <NestedComponent />
    </>
  );
}

function Sibiling() {
  const state = useSelector((state) => state);
  console.log('re-render in Sibiling');
  return <div>Hi ~</div>;
}

function App() {
  return (
    <div>
      <Header className={styles.header} />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </BrowserRouter>
      <Sibiling />
    </div>
  );
}

export default App;
