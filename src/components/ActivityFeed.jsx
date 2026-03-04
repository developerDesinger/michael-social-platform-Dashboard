import React from "react";
import { activityFeed } from "../data/mockData";

export default function ActivityFeed() {
  return (
    <div className="card">
      <h2 className="text-text-primary mb-6" style={{ fontSize: '15px', fontWeight: 600 }}>
        Recent User Activity
      </h2>

      <div className="space-y-4">
        {activityFeed.map((item) => (
          <div key={item.id} className="flex items-center gap-4 pb-4 border-b border-gray-100 last:border-b-0 last:pb-0">
            <div className="w-10 h-10 bg-teal-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-teal-primary" style={{ fontSize: '12px', fontWeight: 600 }}>
                {item.avatar}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-text-primary" style={{ fontSize: '14px', fontWeight: 400 }}>
                <span style={{ fontWeight: 600 }}>{item.user}</span>
                <span className="text-text-secondary ml-1">{item.action}</span>
              </p>
              <p className="text-text-secondary mt-1" style={{ fontSize: '12px', fontWeight: 400 }}>{item.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
