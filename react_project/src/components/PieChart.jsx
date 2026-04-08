import { PieChart,Legend,Pie, ResponsiveContainer} from "recharts"
export const PieDiagram = ({data}) => {
    const charData = Object.entries(data).map(([Category,Expense]) => ({
        Category,Expense
    }))
    const colors = ["#0088fe","#ff6f91","#ffbb28","#ff8042","#00ca9f"]
    const CompleteData = charData.map((item,idx) => ({
        ...item,fill: colors[idx % colors.length]
    }))
    if(charData.length === 0){
        return(
            <h2>No Expense Recorded!</h2>
        )
    } else {
    return(
    <>
    <div style={{height: "300px", width: "100%", fontWeight: 600}}>
        <ResponsiveContainer height="100%" width="100%">
    <PieChart>
        <Pie data = {CompleteData} dataKey ="Expense" nameKey = "Category" cx="50%" cy="50%" innerRadius={60} outerRadius={100} fill ="#8884d8" label>
        </Pie>
        <Legend/>
    </PieChart>
    </ResponsiveContainer>
    </div>
    </>
    )}
}