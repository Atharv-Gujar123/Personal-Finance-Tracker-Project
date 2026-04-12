import axios from "axios";
import { useContext, useState} from "react";
import { TransactionCard } from "./transactionCard.jsx";
import { TransactionContext } from "../Context/TransactionContext.jsx";
import { Filter } from "./Filter.jsx";
export const Card = () => {
  const { transactions, setTransactions } = useContext(TransactionContext);
  const [filters,setFilter] = useState("")
  const handleFilter = (data) => {
    setFilter(data)
  }
  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token')
      if(!token){
        return
      }
      await axios.delete(`http://localhost:5000/delete/${id}`,{headers: {Authorization: `Bearer ${token}`}});
      setTransactions((prev) => prev.filter((t) => t._id !== id));
    } catch (err) {
      console.log(err);
    }
  };
  const key = filters.split("-")[0]
  const value = filters.split("-")[1]
  const filter = transactions.filter((item)=> item[key] === value)
  const list = key !== "All" ? filter : transactions
  const GroupByMonth = list.reduce((acc, result) => {
    const date = new Date(result.Date);
    const monthYr = date.toLocaleString("en-US", {
      month: "long",
      year: "numeric",
    });
    if (!acc[monthYr]) {
      acc[monthYr] = [];
    }
    acc[monthYr].push(result);
    return acc;
  }, {});
  if (transactions.length == 0) {
    return <h1>No Transactions Yet!</h1>;
  } else {
    const sorted = Object.keys(GroupByMonth).sort(
      (a, b) => new Date(b) - new Date(a),
    );
    return (
      <>
      <Filter sendData = {handleFilter}/>
        <div className="Super-Container">
          {sorted.map((month) => (
            <div key={month}>
              {" "}
              <h2 className="month">{month}</h2>
              <div className="Container">
                {GroupByMonth[month].map((items) => {
                  const formattedDate = new Date(items.Date).toLocaleDateString(
                    "en-US",
                    {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    },
                  );
                  const details = {
                    id: items._id,
                    Amount: items.Amount,
                    Type: items.Type,
                    Category: items.Category,
                    date: items.Date,
                  };
                  return (
                    <div key={items._id}>
                      <TransactionCard
                        id={items._id}
                        formattedDate={formattedDate}
                        Amount={items.Amount}
                        Type={items.Type}
                        Category={items.Category}
                        Details={details}
                        delFunction={() => {
                          handleDelete(items._id);
                        }}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </>
    );
  }
};
