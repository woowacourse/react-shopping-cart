import { useState, useEffect } from "react";

interface useTogglerProps {
  initialIsChecked: boolean;
  notifyFunction: (isChecked: boolean) => void;
}

const useToggler = ({ initialIsChecked, notifyFunction }: useTogglerProps) => {
  const [isChecked, setIsChecked] = useState(initialIsChecked);

  useEffect(() => {
    notifyFunction(isChecked);
  }, [isChecked, notifyFunction]);

  const toggleIsChecked = () => {
    setIsChecked((previousIsChecked) => !previousIsChecked);
  };

  return { isChecked, toggleIsChecked };
};

export default useToggler;
