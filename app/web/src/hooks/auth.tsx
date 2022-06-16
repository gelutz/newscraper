import React, { createContext, useCallback, useState, useContext } from 'react';

import connection from '../api/connection';

interface AuthState {
  opaque: string;
  user: object;
}

interface SignInCredentials {
  login: string;
  password: string;
}

interface AuthContextData {
  user: object;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
  refresh(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
    // state
    const [data, setData] = useState<AuthState>(() => {
        const access = localStorage.getItem('@Newscraper:access');
        const opaque = localStorage.getItem('@Newscraper:opaque');
        const user = localStorage.getItem('@Newscraper:user');

        if (opaque && user) {
            connection.defaults.headers.common.Authorization = `${access}`;
            return { opaque, user: JSON.parse(user) };
        }

        return {} as AuthState;
    });

    // Signin
    const signIn = useCallback(async ({ login, password }) => {
        const response = await connection.post('/login', {
            login,
            password,
        });

        const { opaque, user, access } = response.data;
        connection.defaults.headers.common.Authorization = `Bearer ${access}`;

        delete user.password;
        // descomentar quando for adicionado o middleware de autenticação no backend

        localStorage.setItem('@Newscraper:access', access);
        localStorage.setItem('@Newscraper:opaque', opaque);
        localStorage.setItem('@Newscraper:user', JSON.stringify(user));

        setData({ opaque, user });
    }, []);

    // Signout
    const signOut = useCallback(() => {
        localStorage.removeItem('@Newscraper:access');
        localStorage.removeItem('@Newscraper:opaque');
        localStorage.removeItem('@Newscraper:user');

        setData({} as AuthState);
    }, []);

    const refresh = useCallback(() => {
        const opaque = localStorage.getItem('@Newscraper:opaque');
    }, []);

    return (
        <AuthContext.Provider value={{ user: data.user, signIn, signOut, refresh }}>
            {children}
        </AuthContext.Provider>
    );
};

function useAuth(): AuthContextData {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('useAuth must be used within a AuthProvider');
    }

    return context;
}

export { AuthProvider, useAuth };
