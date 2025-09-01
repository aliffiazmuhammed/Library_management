
import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem("user");
        return savedUser ? JSON.parse(savedUser) : null;
    });

    const login = (email, password) => {
        if (email === "admin@lib.com") {
            const adminUser = { name: "Admin", role: "Admin", token: "dummy" };
            setUser(adminUser);
            localStorage.setItem("user", JSON.stringify(adminUser));
            return true;
        } else if (email === "librarian@lib.com") {
            const librarianUser = { name: "Librarian", role: "Librarian", token: "dummy" };
            setUser(librarianUser);
            localStorage.setItem("user", JSON.stringify(librarianUser));
            return true;
        } else {
            const memberUser = { name: "member", role: "member", token: "dummy" };
            setUser(memberUser);
            localStorage.setItem("user", JSON.stringify(memberUser));
            return true;
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("user");
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
