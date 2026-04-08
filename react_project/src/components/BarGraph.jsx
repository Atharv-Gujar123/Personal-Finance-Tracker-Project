import {
  BarChart,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
  Bar,
  Legend,
  ResponsiveContainer,
} from "recharts";
export const BarGraph = ({ result }) => {
  return (
    <>
      <div style={{ width: "100%", height: "300px", fontWeight: 600 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={result}>
            <XAxis dataKey="monthYr" stroke="#9ca3af" />
            <YAxis stroke="#9ca3af" />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1e293b",
                border: "1px solid #334155",
                borderRadius: "6px",
                color: "#e5e7eb",
              }}
            />
            <CartesianGrid stroke="#334155" strokeDasharray="3 3" />
            <Bar dataKey="Total_Income" fill="#22c55e" radius={[5, 5, 0, 0]} />
            <Bar
              dataKey="Total_Expense"
              fill="#ef4444"
              radius={[5, 5, 0, 0]}
            ></Bar>
            <Legend />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};
