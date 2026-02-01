"use client";

import { useState } from "react";
import Sidebar from "./Sidebar";
import Overview from "./Overview";
import Modules from "./Modules";
import SystemLogs from "./SystemLogs";
import Education from "./Education";
import Community from "./Community";

const SystemInfo = () => {
  const [activeSection, setActiveSection] = useState("overview");

  const renderContent = () => {
    switch (activeSection) {
      case "overview":
        return <Overview />;
      case "modules":
        return <Modules />;
      case "logs":
        return <SystemLogs />;
      case "education":
        return <Education />;
      case "community":
        return <Community />;
      default:
        return <Overview />;
    }
  };

  return (
    <div className="pt-24 px-4 pb-12 max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row min-h-[600px] border border-border bg-card shadow-sm">
        {/* Sidebar Navigation */}
        <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />

        {/* Main Content Panel */}
        <div className="flex-1 p-6 md:p-8 bg-background/50 overflow-y-auto max-h-[800px]">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default SystemInfo;
