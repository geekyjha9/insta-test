import {  createContext, useContext, useState } from "react";

const AuthContext = createContext()

export const useAuth = () => {
    return useContext(AuthContext)
}

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("token"));

    const login = (data) => {
        localStorage.setItem("token",data.token);
        localStorage.setItem("id",data.id);
        localStorage.setItem("username",data.username);
        localStorage.setItem("fullname",data.fullname);
        localStorage.setItem("email",data.email);
        setIsAuthenticated(true)
    }

    const logout = () => {
        localStorage.removeItem("token");
        setIsAuthenticated(false)
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}

        </AuthContext.Provider>
    )
}