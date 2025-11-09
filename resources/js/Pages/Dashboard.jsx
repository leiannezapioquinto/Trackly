import { useEffect, useState } from "react";
import {
  PieChart, Pie, Cell, Tooltip,
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, LineChart, Line, CartesianGrid,
} from "recharts";
import Sidebar from "@/components/Sidebar";
import NavBar from "@/components/NavBar";

export default function Dashboard() {
  const [breakdown, setBreakdown] = useState([]);
  const [trend, setTrend] = useState([]);
  const [topCategories, setTopCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  const fetchData = async () => {
    try {
      const [trendRes, topCatRes, breakdownRes] = await Promise.all([
        fetch("/api/expenses/trends"),
        fetch("/api/expenses/top-categories"),
        fetch("/api/expenses/breakdown"),
      ]);

      const [trendData, topCatData, breakdownData] = await Promise.all([
        trendRes.json(),
        topCatRes.json(),
        breakdownRes.json(),
      ]);

      setTrend(Array.isArray(trendData) ? trendData : []);
      setTopCategories(Array.isArray(topCatData) ? topCatData : []);

      // PieChart color palette
      const pieColors = ["#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6", "#F472B6", "#06B6D4"];
      const formattedBreakdown = breakdownData.map((expense, i) => ({
        name: expense.title,
        value: parseFloat(expense.amount),
        color: pieColors[i % pieColors.length],
      }));
      setBreakdown(formattedBreakdown);

    } catch (error) {
      console.error("Error loading data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return <p className="p-8 text-gray-500">Loading...</p>;

  // Colors based on theme
  const axisColor = theme === "dark" ? "#D1D5DB" : "#374151";
  const gridColor = theme === "dark" ? "#374151" : "#E5E7EB";
  const tooltipBg = theme === "dark" ? "#1f2937" : "#ffffff";
  const tooltipColor = theme === "dark" ? "#f9fafb" : "#111827";

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="flex-1 flex flex-col overflow-auto">
        <NavBar setSidebarOpen={setSidebarOpen} />
        <main className="p-6 md:p-10 space-y-8">
          <div>
            <h2 className="text-3xl font-bold mb-1">Dashboard</h2>
            <p className="text-gray-500 dark:text-gray-400">
              Insights into your expenses and trends
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

            <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow">
              <h3 className="text-lg font-semibold mb-4">Top Category per Month</h3>
                <div className="w-full" style={{ height: '30vh', minHeight: 200, maxHeight: 400 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={topCategories}>
                      <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
                      <XAxis dataKey="category" stroke={axisColor} />
                      <YAxis
                        stroke={axisColor}
                        domain={['dataMin - 500', 'dataMax + 500']}
                      />
                        <Tooltip
                        formatter={(value, name, props) => {
                            const month = props?.payload?.month || "";
                            return [`₱${parseFloat(value).toLocaleString()}`, `Amount (${month})`];
                          }}
                          labelFormatter={(label, props) => {
                            if (props && props.payload && props.payload.length > 0) {
                              return `Month: ${props.payload[0].month}`;
                            }
                            return "";
                          }}
                          contentStyle={{
                            backgroundColor: tooltipBg,
                            color: tooltipColor,
                            borderRadius: "12px",
                            border: "1px solid rgba(0,0,0,0.1)",
                            padding: "10px 14px",
                          }}
                        />
                      <Bar dataKey="amount" fill="#10B981" />
                    </BarChart>
              </ResponsiveContainer>
              </div>
            </div>

            <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow">
              <h3 className="text-lg font-semibold mb-4">Expense Breakdown</h3>

              <div className="w-full" style={{ height: '30vh', minHeight: 200 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={breakdown}
                      dataKey="value"
                      nameKey="name"
                      innerRadius={70} // donut
                      outerRadius={100}
                      paddingAngle={3}
                      label={({ name, percent }) => `${name} (${(percent * 100).toFixed(1)}%)`}
                    >
                      {breakdown.map((entry, index) => (
                        <Cell key={index} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value, name, props) => {
                        const month = props?.payload?.month || "";
                        return [`₱${parseFloat(value).toLocaleString()}`, `Amount (${month})`];
                      }}
                      contentStyle={{
                        backgroundColor: tooltipBg,
                        color: tooltipColor,
                        borderRadius: "12px",
                        border: "1px solid rgba(0,0,0,0.1)",
                        padding: "10px 14px",
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>


            <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow lg:col-span-2">
              <h3 className="text-lg font-semibold mb-4">Monthly Expense Trend</h3>
                <div className="w-full" style={{ height: '30vh', minHeight: 200, maxHeight: 400 }}>
                  <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trend}>
                  <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
                  <XAxis dataKey="month" stroke={axisColor} />
                  <YAxis
                    stroke={axisColor}
                    tickFormatter={(value) => value.toLocaleString()}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: tooltipBg,
                      color: tooltipColor,
                      borderRadius: "12px",
                      border: "1px solid rgba(0,0,0,0.1)",
                      padding: "10px 14px",
                    }}
                  />
                  <Line type="monotone" dataKey="total" stroke="#3B82F6" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
              </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}
