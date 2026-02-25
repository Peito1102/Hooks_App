import { Button } from "@/components/ui/button"
import { use } from "react"
import { UserContext } from "../context/UserContext";
import { Link } from "react-router";

export const ProfilePage = () => {
  const { user, logout } = use(UserContext);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl">Perfil del usuario</h1>
      <hr />

      <pre className="my-4 w-0.8 overflow-x-auto">{JSON.stringify(user,null,3)}</pre>

      <Link to="/about">
      <Button variant="destructive" onClick={logout}>Salir</Button>
      </Link>

    </div>
  )
}
