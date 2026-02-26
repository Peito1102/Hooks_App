import { createContext, useState, useCallback, type PropsWithChildren } from "react"
import { type User, users } from "../data/user-mock.data";

type AuthStatus = 'authenticated' | 'not-authenticated' // Ya ni siquiera necesitas 'checking'

interface UserContextProp {
  authStatus: AuthStatus;
  user: User | null;
  isAuthenticated: boolean;
  login: (userId: number) => boolean;
  logout: () => void;
}

export const UserContext = createContext({} as UserContextProp);

const UserContextProvider = ({ children } : PropsWithChildren) => {

  // 1. Inicializamos el usuario leyendo directamente el storage
  const [user, setUser] = useState<User | null>(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      return users.find(u => u.id === Number(storedUserId)) || null;
    }
    return null;
  });

  // 2. Inicializamos el estado de autenticación basándonos en si encontramos al usuario
  const [authStatus, setAuthStatus] = useState<AuthStatus>(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      const foundUser = users.find(u => u.id === Number(storedUserId));
      return foundUser ? 'authenticated' : 'not-authenticated';
    }
    return 'not-authenticated';
  });

  // ¡Adiós useEffect! Ya no lo necesitamos para la carga inicial.

  const handleLogin = useCallback((userId: number) => {
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
  }, []);

  const handleLogout = useCallback(() => {
    console.log('Logout');
    setAuthStatus('not-authenticated');
    setUser(null);
    localStorage.removeItem('userId');
  }, []);
  
  return (
    <UserContext
      value={{
        authStatus,
        user,
        isAuthenticated: authStatus === 'authenticated',
        login: handleLogin,
        logout: handleLogout
      }}>
      {children}
    </UserContext>
  )
}

export default UserContextProvider