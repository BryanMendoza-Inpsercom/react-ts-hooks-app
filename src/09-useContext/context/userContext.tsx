import { createContext, useEffect, useState, type PropsWithChildren } from "react";
import { users, type User } from "../data/user-mock.data";

type AuthStatus = 'checking' | 'authenticated' | 'not-authenticated';

interface UserContextProps {
    //state
    authStatus: AuthStatus;
    user: User | null;
    isAuthenticate: boolean;
    //acciones o metodos
    login: (userId: number) => boolean;
    logaut: () => void;
}

export const UserContext = createContext({} as UserContextProps);

//solo informacion como logica o acciones
//HOC haigt order component --> provee un tipo de estado o funcionalidad a sus hijos
export const UserContextProvider = ({ children }: PropsWithChildren) => {

    const [authStatus, setAuthStatus] = useState<AuthStatus>('checking');
    const [user, setUser] = useState<User | null>(null);

    const handleLogin = (userId: number) => {
        const user = users.find(user => user.id === userId);
        if (!user) {
            console.log('Usuario no encontrado');
            setUser(null);
            setAuthStatus('not-authenticated');
            return false
        }
        setUser(user);
        setAuthStatus('authenticated');
        localStorage.setItem('userId', userId.toString());
        return true;
    }

    const handleLogaut = () => {
        setUser(null);
        setAuthStatus('not-authenticated');
        localStorage.removeItem('userId');
    }

    useEffect(() => {
        const storeUserId = localStorage.getItem('userId');
        if (storeUserId) {
            handleLogin(+storeUserId);
        }

        handleLogaut();
    }, []);

    return (
        <UserContext
            value={{
                authStatus: authStatus,
                user: user,
                isAuthenticate: authStatus === 'authenticated',
                login: handleLogin,
                logaut: handleLogaut
            }}
        >
            {children}
        </UserContext>
    );

}