import { UserContext } from "@/09-useContext/context/UserContext";
import { Button } from "@/components/ui/button"
import { use } from "react";
import { Link } from "react-router"

export const AboutPage = () => {

  const { user } = use(UserContext);


  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold">Página de mi para mi</h1>
      <hr />
      <div className="flex flex-col gap-2">
        { user && <Link to="/profile" className="hover:text-blue-500 underline text-2xl">
          <Button>Profile</Button>
        </Link>}
        { !user && <Link to="/login" className="hover:text-blue-500 underline text-2xl">
          <Button>Iniciar Sesión</Button>
        </Link>}
      </div>
    </div>
  )
}
