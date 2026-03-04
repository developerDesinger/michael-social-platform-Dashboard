import React from "react";
import { TrendingUp, TrendingDown } from "lucide-react";

export default function StatCard({ icon: Icon, label, value, trend, isPositive }) {
  return (
    <div className="card flex items-center justify-between">
      <div>
        <p className="text-text-secondary mb-2" style={{ fontSize: '12px', fontWeight: 400, letterSpacing: '0.01em' }}>{label}</p>
        <h3 className="text-text-primary mb-3" style={{ fontSize: '32px', fontWeight: 700, letterSpacing: '-0.02em' }}>{value}</h3>
        <div className="flex items-center gap-1">
          {isPositive ? (
            <TrendingUp size={16} className="text-success" />
          ) : (
            <TrendingDown size={16} className="text-danger" />
          )}
          <span
            className={isPositive ? "text-success" : "text-danger"}
            style={{ fontSize: '12px', fontWeight: 500 }}
          >
            {trend} {isPositive ? "↑" : "↓"}
          </span>
        </div>
      </div>
      <div className="p-4 bg-gradient-to-br from-teal-primary/10 to-teal-accent/10 rounded-xl">
        <Icon size={32} className="text-teal-primary" />
      </div>
    </div>
  );
}
