import React, { useState, useEffect } from "react";
const AuthContext = React.createContext({
    id: "",
    email: "",
    fullName: "",
    token: "",
    isAdmin: false,
    isLoggedIn: false,
    onLogout: () => {},
    onLogin: (id, email, fullName, isAdmin, token) => {},
});

export const AuthContextProvider = (props) => {
    const storedUserLoggedInInfo = localStorage.getItem("isLoggedIn");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user_id, setId] = useState("");
    const [email, setEmail] = useState("");
    const [fullName, setFullName] = useState("");
    const [token, setToken] = useState("");
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        if (storedUserLoggedInInfo === "1") {
            setIsLoggedIn(true);
            loginHandler(localStorage.getItem("id"), localStorage.getItem("email"), localStorage.getItem("fullname"), localStorage.getItem("isAdmin")==="1", localStorage.getItem("token") );
        }
    }, [storedUserLoggedInInfo]);

    const loginHandler = (id, email, fullName, isAdmin=false, token) => {
        localStorage.setItem("isLoggedIn", "1");
        localStorage.setItem("id", id);
        localStorage.setItem("email", email);
        localStorage.setItem("fullname", fullName);
        localStorage.setItem("token", token);
        console.log(isAdmin);
        if(isAdmin){
            localStorage.setItem("isAdmin", "1");
            setIsAdmin(true);
        }
        setId(id);
        setEmail(email);
        setFullName(fullName);
        setToken(token);
        setIsLoggedIn(true);
    };

    const logoutHandler = () => {
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("id");
        localStorage.removeItem("fullname");
        localStorage.removeItem("token");
        localStorage.removeItem("email");
        localStorage.removeItem("isAdmin");
        setId("");
        setEmail("");
        setFullName("");
        setIsLoggedIn(false);
        setToken("");
        setIsAdmin(false);
    };

    return (
        <AuthContext.Provider
            value={{
                id: user_id,
                email: email,
                fullName: fullName,
                isLoggedIn: isLoggedIn,
                token: token,
                isAdmin: isAdmin,
                onLogout: logoutHandler,
                onLogin: loginHandler,
            }}
        >
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
