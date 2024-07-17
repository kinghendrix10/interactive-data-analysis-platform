// /frontend/components/NavigationTabs.js
import React, { useState } from 'react';

const NavigationTabs = ({ children }) => {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'dashboards', label: 'Dashboards' },
    { id: 'code', label: 'Code' },
    { id: 'documents', label: 'Documents' },
  ];

  return (
    <div className="navigation-tabs">
      <div className="tab-buttons">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={activeTab === tab.id ? 'active' : ''}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="tab-content">
        {React.Children.map(children, (child) => {
          return React.cloneElement(child, { activeTab });
        })}
      </div>
    </div>
  );
};

export default NavigationTabs;
