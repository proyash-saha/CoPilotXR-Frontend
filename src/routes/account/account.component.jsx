import { useState } from "react";

import AccountInformation from "../../components/account-information/account-information.component";
import Subscription from "../../components/subscription/subscription.component";
import Downloads from "../../components/downloads/downloads.component";

import "./account.styles.scss";

const ACC_INFO_HEADER = "Account Information";
const SUBS_HEADER = "Subscription";
const DOWNLOAD_HEADER = "Downloads";

const Account = () => {
  const tabs = [ACC_INFO_HEADER, SUBS_HEADER, DOWNLOAD_HEADER];
  const [activeTab, setActiveTab] = useState("Account Information");

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="tabs-container">
      <div className="tab-header">
        {tabs.map((tab) => (
          <div
            key={tab}
            className={`tab ${activeTab === tab ? "active" : ""}`}
            onClick={() => handleTabChange(tab)}
          >
            {tab}
          </div>
        ))}
      </div>
      <div className="tab-content">
        {activeTab === ACC_INFO_HEADER && <AccountInformation />}
        {activeTab === SUBS_HEADER && <Subscription />}
        {activeTab === DOWNLOAD_HEADER && <Downloads />}
      </div>
    </div>
  );
};

export default Account;
