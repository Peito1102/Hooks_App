import { createContext, useState, type PropsWithChildren } from "react"
import type { User } from "../data/user-mock.data";

/* interface UserContextProp {
  children: React.ReactNode
} */

type AuthStatus = 'authenticated' | 'cheking' | 'not-authenticated'

interface UserContextProp {
  //sate
  authStatus: AuthStatus;
  user: User | null;

  //methods
  login: (userId: number) => boolean;
  logout: () => void;
}

export const UserContext = createContext({} as UserContextProp);

const UserContextProvider = ({ children } : PropsWithChildren) => {

  const [authStatus, setAuthStatus] = useState<AuthStatus>('cheking');
  const [user, setUser] = useState<User | null>(null);

  const handleLogin = (userId: number) => {
    console.log('Login with userId: ', userId);
    return true;
  }

  const handleLogout = () => {
    console.log('Logout');
  }

  
  return (
    <UserContext
    value={{
      authStatus: authStatus,
      user: user,
      login: handleLogin,
      logout: handleLogout
    }}>
      {children}
      </UserContext>
  )
}

export default UserContextProvider
