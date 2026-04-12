import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const TransactionContext = createContext();
export const TransactionProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([]);
  useEffect(() => {
    const token = localStorage.getItem('token')
    console.log(token)
    if(!token){
      return
    }
    axios
      .get("http://localhost:5000/dashboard", {headers : {Authorization: `Bearer ${token}`}})
      .then((res) => {
        console.log(`res : ${res.data.result}`)
        setTransactions(res.data.result);
      })
      .catch((err) => console.log(err));
  },[]);
  return (
    <TransactionContext.Provider value={{ transactions, setTransactions }}>
      {children}
    </TransactionContext.Provider>
  );
};
