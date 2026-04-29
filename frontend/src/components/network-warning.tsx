"use client";

import React from "react";
import { useNetwork } from "@/context/network-context";
import { getNetworkConfig } from "@/config/network";
import { Icon } from "@/components/icon";

export function NetworkWarning() {
  const { network } = useNetwork();
  const config = getNetworkConfig(network);

  if (config.isMainnet) {
    return null;
  }

  // Handle color classes for banner
  const getBannerColor = () => {
    if (config.color === "yellow") {
      return "bg-yellow-50 text-yellow-800 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-300 dark:border-yellow-800";
    }
    if (config.color === "green") {
      return "bg-green-50 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-800";
    }
    return "bg-gray-50 text-gray-800 border-gray-200";
  };

  return (
    <div className={`w-full py-2 px-4 flex items-center justify-center border-b text-sm font-medium ${getBannerColor()}`}>
      <Icon name="alert-triangle" size="sm" className="mr-2" />
      You are currently viewing data on {config.label} network. Transactions here use non-real assets.
    </div>
  );
}
