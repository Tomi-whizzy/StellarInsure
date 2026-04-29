"use client";

import React, { useState } from "react";
import { Icon } from "@/components/icon";
import { useAppTranslation } from "@/i18n/provider";
import { useNetwork } from "@/context/network-context";
import { NETWORKS, NetworkType } from "@/config/network";

export function NetworkSwitcher() {
  const { t } = useAppTranslation();
  const { network: currentNetwork, setNetwork } = useNetwork();
  
  const [isOpen, setIsOpen] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [pendingNetwork, setPendingNetwork] = useState<NetworkType>(currentNetwork);

  const currentConfig = NETWORKS[currentNetwork];
  const networkOptions = Object.values(NETWORKS);

  function handleNetworkSelect(targetNetwork: NetworkType) {
    if (targetNetwork !== "mainnet" && currentNetwork === "mainnet") {
      setShowWarning(true);
      setPendingNetwork(targetNetwork);
    } else {
      setNetwork(targetNetwork);
      setIsOpen(false);
      setShowWarning(false);
    }
  }

  function confirmTestnetSwitch() {
    setNetwork(pendingNetwork);
    setIsOpen(false);
    setShowWarning(false);
  }

  function cancelTestnetSwitch() {
    setShowWarning(false);
  }

  return (
    <div className="network-switcher relative">
      <button
        type="button"
        className="network-switcher__button flex items-center gap-2"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-label={`Network: ${currentConfig?.label}`}
      >
        <Icon
          name={currentConfig?.isMainnet ? "globe" : "zap"}
          size="sm"
          tone={currentConfig?.isMainnet ? "accent" : "warning"}
        />
        <span className="network-switcher__label">{currentConfig?.label}</span>
      </button>

      {isOpen && !showWarning && (
        <div className="network-switcher__menu absolute mt-2 right-0 bg-white dark:bg-gray-800 shadow-lg rounded-md border py-1 w-64 z-50" role="listbox">
          {networkOptions.map((network) => (
            <button
              key={network.id}
              type="button"
              className={`network-switcher__option w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 ${currentNetwork === network.id ? "bg-gray-50 dark:bg-gray-700/50" : ""}`}
              onClick={() => handleNetworkSelect(network.id)}
              role="option"
              aria-selected={currentNetwork === network.id}
            >
              <div className="network-switcher__option-label flex justify-between items-center">
                <span className="network-switcher__option-name font-medium">{network.label}</span>
                {!network.isMainnet && (
                  <span className="network-switcher__testnet-badge text-xs bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-300 px-1.5 rounded">Test</span>
                )}
              </div>
              <span className="network-switcher__option-description text-xs text-gray-500 block mt-1">
                {network.description}
              </span>
            </button>
          ))}
        </div>
      )}

      {showWarning && (
        <div className="network-switcher__warning absolute mt-2 right-0 bg-white dark:bg-gray-800 shadow-lg rounded-md border p-4 w-72 z-50" role="alertdialog" aria-modal="true">
          <div className="network-switcher__warning-header flex items-center gap-2 mb-3">
            <Icon name="alert-triangle" size="md" tone="warning" />
            <h3 className="font-semibold">{t("network.switchWarning.title") || "Switching from Mainnet"}</h3>
          </div>

          <p className="network-switcher__warning-message text-sm text-gray-600 dark:text-gray-400 mb-3">
            {t("network.switchWarning.message") || "You are about to switch to a testing network."}
          </p>

          <div className="network-switcher__warning-actions flex justify-end gap-2 mt-4">
            <button
              type="button"
              className="px-3 py-1.5 text-sm border rounded hover:bg-gray-50 dark:hover:bg-gray-700"
              onClick={cancelTestnetSwitch}
            >
              {t("network.switchWarning.cancel") || "Cancel"}
            </button>
            <button
              type="button"
              className="px-3 py-1.5 text-sm bg-yellow-500 text-white rounded hover:bg-yellow-600"
              onClick={confirmTestnetSwitch}
            >
              {t("network.switchWarning.confirm") || "Confirm"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
