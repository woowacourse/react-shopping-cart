import { useState } from "react";
import { useToast } from "./ToastProvider";

export default function App() {
  const [counter, setCounter] = useState(0);
  const { showToast } = useToast();

  const handleClick = () => {
    showToast({
      message: counter.toString(),
      variant: "success",
    });
    setCounter((counter) => counter + 1);
  };
  return <button onClick={handleClick}>버튼</button>;
}
