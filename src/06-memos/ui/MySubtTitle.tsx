import { memo } from "react";

interface Props {
    subTitle: string;
}

const MySubTitle = memo(({subTitle}: Props) => {
    console.log("My subTitle re-render")
  return (
    <>
        <h6 className="text-2xl font-bold">{subTitle}</h6>

        <button className="bg-indigo-500 text-white px-2 py-1 rounded-md cursor-pointer">
          Llamar a función
        </button>
    </>
  )
})

export default MySubTitle
