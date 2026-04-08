import { Link } from "react-router-dom"
export const TransactionCard = ({id,formattedDate,Amount,Type,Category,delFunction,Details}) => {
    return(
        <div className="Card" key={id}>
            <h3 className="Date">{formattedDate}</h3>
            <h1 className="Amount">₹ {Amount}</h1>
            <div className="body">
              <span className="Type">
                <h3>Type</h3>
                <h2>{Type}</h2>
              </span>
              <span className="Type">
                <h3>Category</h3>
                <h2>{Category}</h2>
              </span>
            </div>
            <div className="Buttons">
            <button id = "edit"><Link to = {`/update/${id}`} state={{Details}} className="edits">Edit</Link></button>
            <button onClick={delFunction} id = "delete">Delete</button>
            </div>
          </div>
    )
}