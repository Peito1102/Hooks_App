import { useCallback, useState } from "react"
import MyTitle from "./ui/MyTitle";
import MySubTitle from "./ui/MySubtTitle";

const MemoHooks = () => {

    const [title, setTitle] = useState("Hola");
    const [subtitle, setSubTitle] = useState("Mundo");

    const handleMyAPICall = useCallback(() => {
        console.log("Llamando a mi API, " + subtitle)
    }, [subtitle])

  return (
    <div className="bg-gradient flex flex-col gap-4">
        <h1 className="text-2xl font-thin text-white">MemoApp</h1>

        <MyTitle title={title} />
        <MySubTitle subTitle={subtitle} callMyAPI={handleMyAPICall} />

        <button className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer"
        onClick={() => setTitle("Hello, " + new Date().getTime())}>
            Cambiar título</button>

        <button className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer"
        onClick={() => setSubTitle("Word")}>
            Cambiar subtítulo</button>

    </div>
  )
}

export default MemoHooks
