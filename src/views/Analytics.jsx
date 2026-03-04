import React from "react";
import {
  BarChart,
  Bar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { MessageSquare, User, Clock, TrendingDown } from "lucide-react";
import StatCard from "../components/StatCard";
import { postsPerDay, sessionDuration, topUsers } from "../data/mockData";

export default function Analytics() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-text-primary mb-1" style={{ fontSize: '28px', fontWeight: 700, letterSpacing: '-0.02em' }}>
          Analytics
        </h1>
        <p className="text-text-secondary" style={{ fontSize: '14px', fontWeight: 400 }}>
          Platform performance and user engagement metrics
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={MessageSquare}
          label="Total Posts"
          value="28,433"
          trend="+15.2%"
          isPositive={true}
        />
        <StatCard
          icon={MessageSquare}
          label="Total Comments"
          value="41,205"
          trend="+8.6%"
          isPositive={true}
        />
        <StatCard
          icon={Clock}
          label="Avg Session Time"
          value="8m 24s"
          trend="+2.3%"
          isPositive={true}
        />
        <StatCard
          icon={TrendingDown}
          label="Bounce Rate"
          value="24.5%"
          trend="-4.2%"
          isPositive={true}
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Posts Per Day */}
        <div className="card">
          <h2 className="text-text-primary mb-4" style={{ fontSize: '15px', fontWeight: 600 }}>
            Posts per Day (Last 2 Weeks)
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={postsPerDay}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="day" stroke="#999" />
              <YAxis stroke="#999" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #e0e0e0",
                  borderRadius: "8px",
                }}
              />
              <Bar
                dataKey="posts"
                fill="#5BA68A"
                radius={[8, 8, 0, 0]}
                animationDuration={800}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Session Duration Trend */}
        <div className="card">
          <h2 className="text-text-primary mb-4" style={{ fontSize: '15px', fontWeight: 600 }}>
            Session Duration Trend
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={sessionDuration}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="time" stroke="#999" />
              <YAxis stroke="#999" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #e0e0e0",
                  borderRadius: "8px",
                }}
              />
              <Area
                type="monotone"
                dataKey="duration"
                fill="#3D7261"
                stroke="#3D7261"
                fillOpacity={0.3}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top Users Table */}
      <div className="card">
        <h2 className="text-text-primary mb-6" style={{ fontSize: '15px', fontWeight: 600 }}>
          Top 5 Most Active Users
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="px-6 py-3 text-left text-text-primary" style={{ fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Name
                </th>
                <th className="px-6 py-3 text-left text-text-primary" style={{ fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Posts
                </th>
                <th className="px-6 py-3 text-left text-text-primary" style={{ fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Connections
                </th>
                <th className="px-6 py-3 text-left text-text-primary" style={{ fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Last Active
                </th>
              </tr>
            </thead>
            <tbody>
              {topUsers.map((user, idx) => (
                <tr
                  key={idx}
                  className={`border-b border-gray-200 hover:bg-gray-50 transition ${
                    idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                  }`}
                >
                  <td className="px-6 py-4 text-sm">
                    <span className="font-medium text-text-primary">
                      {user.name}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-text-secondary">
                    {user.posts}
                  </td>
                  <td className="px-6 py-4 text-sm text-text-secondary">
                    {user.connections}
                  </td>
                  <td className="px-6 py-4 text-sm text-text-secondary">
                    {user.lastActive}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
