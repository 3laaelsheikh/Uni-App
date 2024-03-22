import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const adminContext = createContext();


export function AdminContextProvider({ children }) {

    const [role, setRole] = useState('');

 async function allUser(){
    try {
        const { data } = await axios.get("https://sinai-college-project.onrender.com/api/v1/admin/users", {
            headers: { Authorization: localStorage.getItem("tkn") }
        })

        setRole(data.data.role)


    }
    catch (err) {
        console.log("error", err);
    }
 }

 async function userExprition(){
    try {
        const { data } = await axios.get("https://sinai-college-project.onrender.com/api/v1/users/getRoleAndExpiration", {
            headers: { Authorization: localStorage.getItem("tkn") }
        })

        setRole(data.role)


    }
    catch (err) {
        console.log("error", err);
    }
 }

 useEffect(() => {
    userExprition();
 }, []);



  return <adminContext.Provider value={{userExprition,allUser, setRole, role}}>
  {children}
  </adminContext.Provider>;
}
