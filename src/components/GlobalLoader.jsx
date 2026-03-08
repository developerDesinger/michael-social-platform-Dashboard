import React from "react";
import { Loader2 } from "lucide-react";

export default function GlobalLoader({ message = "Loading..." }) {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-8 flex flex-col items-center gap-4 max-w-sm mx-4">
        <Loader2 size={40} className="text-teal-accent animate-spin" />
        <p className="text-text-primary font-medium text-center">{message}</p>
      </div>
    </div>
  );
}
