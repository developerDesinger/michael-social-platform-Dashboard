import React from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Users, Activity, UserPlus, Flag } from "lucide-react";
import StatCard from "../components/StatCard";
import ActivityFeed from "../components/ActivityFeed";
import {
  chartData,
  platformData,
} from "../data/mockData";

export default function Overview() {
  return (
    <div className="space-y-8">
      {/* Page Title */}
      <div>
        <h1 className="text-text-primary mb-1" style={{ fontSize: '28px', fontWeight: 700, letterSpacing: '-0.02em' }}>
          Dashboard Overview
        </h1>
        <p className="text-text-secondary" style={{ fontSize: '14px', fontWeight: 400 }}>
          Welcome back! Here's your platform summary.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={Users}
          label="Registered Users"
          value="12,483"
          trend="+8.2%"
          isPositive={true}
        />
        <StatCard
          icon={Activity}
          label="Daily Active Users"
          value="3,241"
          trend="+3.1%"
          isPositive={true}
        />
        <StatCard
          icon={UserPlus}
          label="New Registrations"
          value="284"
          trend="+12.4%"
          isPositive={true}
        />
        <StatCard
          icon={Flag}
          label="Pending Reports"
          value="17"
          trend="-2"
          isPositive={false}
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* User Growth Chart */}
        <div className="lg:col-span-2 card">
          <h2 className="text-text-primary mb-4" style={{ fontSize: '15px', fontWeight: 600 }}>
            User Growth (Last 6 Months)
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#999" />
              <YAxis stroke="#999" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #e0e0e0",
                  borderRadius: "8px",
                }}
              />
              <Line
                type="monotone"
                dataKey="users"
                stroke="#3D7261"
                strokeWidth={2}
                dot={{ fill: "#3D7261", r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Users by Platform Chart */}
        <div className="card">
          <h2 className="text-text-primary mb-4" style={{ fontSize: '15px', fontWeight: 600 }}>
            Users by Platform
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={platformData}
                cx="50%"
                cy="40%"
                innerRadius={50}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {platformData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 space-y-2 text-sm">
            {platformData.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  ></div>
                  <span className="text-text-secondary">{item.name}</span>
                </div>
                <span className="font-semibold text-text-primary">
                  {item.value}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <ActivityFeed />
    </div>
  );
}
