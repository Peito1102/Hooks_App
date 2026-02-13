import { useCounter } from "@/hooks/useCounter"
import { useMemo } from "react"

const heavyStuff = (iterationNumber: number) => {
  console.time("Heavy_stuff_started")

  for (let i = 0; i < iterationNumber; i++) {
    console.log("Iteración: " + i)
  }

  console.timeEnd("Heavy_stuff_started")

  return `${iterationNumber} iteraciones realizadas`
}

export const MemoCounter = () => {

    const { counter, handleIncrement } = useCounter(40000)
    const { counter: counter2, handleIncrement: handleIncrement2 } = useCounter(10)
    
    const myHeavyValue = useMemo(() => heavyStuff(counter), [counter]);
  return (
    <div className="bg-gradient flex flex-col gap-4">
        <h1 className="text-2xl font-bold">Memo - useMemo - {myHeavyValue}</h1>
        <hr />

        <h4>
            Counter: {counter}
        </h4>
        <h4>
            Counter2: {counter2}
        </h4>

        <button 
        className="bg-indigo-500 text-white px-2 py-1 rounded-md cursor-pointer"
        onClick={handleIncrement}>+1</button>
        <button 
        className="bg-indigo-500 text-white px-2 py-1 rounded-md cursor-pointer"
        onClick={handleIncrement2}>+1 - c2</button>
    </div>
  )
}
