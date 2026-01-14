import { useState } from "react";

export const useCounter = ( initialValue: number = 1) => {

    const [counter, setcounter] = useState(initialValue);

    const handleIncrement = () => {
        setcounter( prevCounter => prevCounter + 1);
    }

    const handleDecrement = () => {
        if (counter > 1) {
            setcounter( prevCounter => prevCounter - 1);
        }
    }

  return {
    counter,
    handleIncrement,
    handleDecrement
  }
}
