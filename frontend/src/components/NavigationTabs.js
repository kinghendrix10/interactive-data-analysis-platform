// frontend/components/NavigationTabs.js
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const NavigationTabs = ({ children }) => {
  return (
    <Tabs defaultValue="overview" className="w-full">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="dashboards">Dashboards</TabsTrigger>
        <TabsTrigger value="code">Code</TabsTrigger>
        <TabsTrigger value="documents">Documents</TabsTrigger>
      </TabsList>
      {children}
    </Tabs>
  );
};

export const TabContent = ({ value, children }) => {
  return (
    <TabsContent value={value} className="mt-6">
      {children}
    </TabsContent>
  );
};

export default NavigationTabs;
