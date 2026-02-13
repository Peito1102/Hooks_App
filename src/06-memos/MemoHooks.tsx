
export const MemoHooks = () => {
  return (
    <div className="bg-gradient flex flex-col gap-4">
        <h1 className="text-2xl font-thin text-white">MemoApp</h1>
        <h1>Mi Título</h1>
        <h6>Mi Subtítulo</h6>
        
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer">
            Cambiar título
        </button>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer">
            Cambiar subtitulo
        </button>
    </div>
  )
}
