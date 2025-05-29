import React from 'react';

interface TabNavigationProps {
  tabs: string[];
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const TabNavigation: React.FC<TabNavigationProps> = ({ 
  tabs, 
  activeTab, 
  onTabChange 
}) => {
  return (
    <div className="flex border-b border-gray-200 mb-4 overflow-x-auto">
      {tabs.map((tab) => (
        <button
          key={tab}
          className={`px-4 py-2 text-sm font-medium ${
            activeTab === tab
              ? 'text-blue-600 border-b-2 border-blue-500'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => onTabChange(tab)}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default TabNavigation;