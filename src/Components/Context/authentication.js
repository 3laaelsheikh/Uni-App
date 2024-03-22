import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { createContext } from "react";



export const authcontext =  createContext();

export function AuthProvider( {children} ){

    const [token, setToken] = useState(null);
    const [role, setRole] = useState("");

    useEffect(() => {
       if (localStorage.getItem( "tkn" ) !== null ) {
        setToken( localStorage.getItem( "tkn" ) );
        const res = jwtDecode(localStorage.getItem("tkn"));
        setRole(res.role);
       }

    }, []);
    
    return <authcontext.Provider  value={ { token , setToken, role, setRole } }>

        {children}  


    </authcontext.Provider>

}
