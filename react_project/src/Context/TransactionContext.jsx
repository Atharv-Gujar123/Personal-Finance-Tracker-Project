import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const TransactionContext = createContext();
export const TransactionProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([]);
  useEffect(() => {
    console.log()
    axios
      .get("http://localhost:5000/dashboard")
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
