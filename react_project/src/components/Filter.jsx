import { useState } from "react"
import './Filter.css'
export const Filter = ({sendData}) => {
    const [cat, setFilter] = useState("")
    return(
        <>
         <form>
        <select name="filter" value={cat} onChange={(e)=>{sendData(e.target.value), setFilter(e.target.value)}} className="filter" placeholder="Filter">
            <option value="">All</option>
            <option value="Type-Income">Show Only Income</option>
            <option value="Type-Expense">Show Only Expense</option>
        </select>
    </form>
        </>
    )
}