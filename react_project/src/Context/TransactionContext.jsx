import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const TransactionContext = createContext();
export const TransactionProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([]);
  useEffect(() => {
    const token = localStorage.getItem('token')
    if(!token){
      return
    }
    axios
      .get("http://localhost:5000/dashboard", {headers : {Authorization: `Bearer ${token}`}})
      .then((res) => {
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
