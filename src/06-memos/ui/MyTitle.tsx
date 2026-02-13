import { memo } from "react";

interface Props {
    title: string;
}

const MyTitle = memo(({title}: Props) => {
    console.log("My title re-render")
  return <h1 className="text-3xl">{title}</h1>
})

export default MyTitle
