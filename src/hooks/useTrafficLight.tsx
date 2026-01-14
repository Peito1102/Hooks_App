import { useEffect, useMemo, useState } from "react";

const colors = {
    red: 'bg-red-500 animate-pulse',
    yellow: 'bg-yellow-500 animate-pulse',
    green: 'bg-green-500 animate-pulse',
    gray: 'bg-gray-500',
}

type TrafficLightColor = keyof typeof colors;

export const useTrafficLight = () => {

    const [light, setLight] = useState<TrafficLightColor>('red');
    const [countdown, setcountdown] = useState(5);

    const handleChangeLight = () => {
        setLight((prevLight) => {
        if (prevLight === 'red') return 'green';
        if (prevLight === 'green') return 'yellow';
        return 'red';
        });
    };

    useEffect(() => {
    const intervalID = setInterval(() => {
        setcountdown((prevCount) => {
            if (prevCount <= 0) {
            handleChangeLight();
            return 5;
            }
            return prevCount - 1;  
        });
        }, 1000);

        return () => clearInterval(intervalID);
    }, []);

    const arrayLights = useMemo(() => [
    light === 'red' ? colors.red : colors.gray,
    light === 'yellow' ? colors.yellow : colors.gray,
    light === 'green' ? colors.green : colors.gray,
  ], [light]);

  return { 
    light, 
    countdown, 
    porcentage: (countdown/5) * 100,
    arrayLights 
  };
}
