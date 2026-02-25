import { createContext, useState, type PropsWithChildren } from "react"
import { type User, users } from "../data/user-mock.data";

/* interface UserContextProp {
  children: React.ReactNode
} */

type AuthStatus = 'authenticated' | 'checking' | 'not-authenticated'

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

  const [authStatus, setAuthStatus] = useState<AuthStatus>('checking');
  const [user, setUser] = useState<User | null>(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      const foundUser = users.find(u => u.id === Number(storedUserId));
      return foundUser || null;
    }
    return null;
  });

  const handleLogin = (userId: number) => {
    const user = users.find(user => user.id === userId);
    if (!user) {
      console.log('Usuario no encontrado');
      setUser(null);
      setAuthStatus('not-authenticated');
      localStorage.removeItem('userId');
      return false;
    }
    setUser(user);
    setAuthStatus('authenticated');
    localStorage.setItem('userId', user.id.toString());
    return true;
  }

  const handleLogout = () => {
    console.log('Logout');
    setAuthStatus('not-authenticated');
    setUser(null);
    localStorage.removeItem('userId');
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
