import React, { createContext, useCallback, useState, useContext } from "react";
import connection from "../api/connection";

interface AuthState {
    token: string;
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
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
    const [data, setData] = useState<AuthState>(() => {
        const token = localStorage.getItem("@Proffy:token");
        const user = localStorage.getItem("@Proffy:user");

        if (token && user) {
            return { token, user: JSON.parse(user) };
        }

        return {} as AuthState;
    });

    const signIn = useCallback(async ({ login, password }) => {
        const response = await connection.post("/auth/login", {
            login,
            password,
        });

        const { token, user } = response.data;

        localStorage.setItem("@Proffy:token", token);
        localStorage.setItem("@Proffy:user", JSON.stringify(user));

        setData({ token, user });
    }, []);

    const signOut = useCallback(() => {
        localStorage.removeItem("@Proffy:token");
        localStorage.removeItem("@Proffy:user");

        setData({} as AuthState);
    }, []);

    return (
        <AuthContext.Provider value={{ user: data.user, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    );
};

function useAuth(): AuthContextData {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth must be used within a AuthProvider");
    }

    return context;
}

export { AuthProvider, useAuth };
