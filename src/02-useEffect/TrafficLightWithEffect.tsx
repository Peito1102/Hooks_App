import { useEffect, useState } from "react";

const colors = {
    red: 'bg-red-500 animate-pulse',
    yellow: 'bg-yellow-500 animate-pulse',
    green: 'bg-green-500 animate-pulse',
    gray: 'bg-gray-500',
}

type TrafficLightColor = keyof typeof colors;

const TrafficLightWithEffect = () => {
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 flex items-center justify-center p-4">
      <div className="flex flex-col items-center space-y-8">
        <h1 className="text-white text-2xl font-thin">Semáforo con useEffect</h1>
        <h2 className="text-white text-xl">Countdown: {countdown}</h2>
        <div className="w-64 bg-gray-700 rounded-full h-2">
          <div className="bg-blue-500 h-2 rounded-full transition-all duration-1000 ease-linear"
          style={{width: `${(countdown/5) * 100}%`}}>
          </div>
        </div>
        <div className={`w-32 h-32 ${light === 'red' ? colors[light] : colors.gray } rounded-full`}></div>
        <div className={`w-32 h-32 ${light === 'yellow' ? colors[light] : colors.gray } rounded-full`}></div>
        <div className={`w-32 h-32 ${light === 'green' ? colors[light] : colors.gray } rounded-full`}></div>
      </div>
    </div>
  );
}

export default TrafficLightWithEffect;
