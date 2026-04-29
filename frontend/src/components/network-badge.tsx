"use client";

import React from "react";
import { useNetwork } from "@/context/network-context";
import { getNetworkConfig } from "@/config/network";

export function NetworkBadge() {
  const { network } = useNetwork();
  const config = getNetworkConfig(network);

  const getBadgeColor = () => {
    switch (config.color) {
      case "red":
        return "bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800";
      case "yellow":
        return "bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-400 dark:border-yellow-800";
      case "green":
        return "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getBadgeColor()}`}
      title={config.description}
    >
      <span className="w-1.5 h-1.5 mr-1.5 rounded-full bg-current opacity-75" />
      {config.label}
    </div>
  );
}
