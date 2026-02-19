import { type PropsWithChildren } from "react"

/* interface UserContextProp {
  children: React.ReactNode
} */

const UserContextProvider = ({ children } : PropsWithChildren) => {
  
  return (
    <>{children}</>
  )
}

export default UserContextProvider
