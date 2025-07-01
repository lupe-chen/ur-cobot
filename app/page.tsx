"use client"

import { useState } from "react"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { GlobalStatusBar } from "@/components/global-status-bar"
import { DashboardOverview } from "@/components/dashboard-overview"
import { ProcessEditor } from "@/components/process-editor"
import { LiveMonitor } from "@/components/live-monitor"
import { DataAnalytics } from "@/components/data-analytics"
import { TaskManagement } from "@/components/task-management"
import { SystemSettings } from "@/components/system-settings"

export default function URCobotDashboard() {
  const [activeModule, setActiveModule] = useState("dashboard")

  const renderMainContent = () => {
    switch (activeModule) {
      case "dashboard":
        return <DashboardOverview />
      case "process-editor":
        return <ProcessEditor />
      case "live-monitor":
        return <LiveMonitor />
      case "analytics":
        return <DataAnalytics />
      case "task-management":
        return <TaskManagement />
      case "system":
        return <SystemSettings />
      default:
        return <DashboardOverview />
    }
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-gray-50">
        <AppSidebar activeModule={activeModule} setActiveModule={setActiveModule} />
        <div className="flex-1 flex flex-col">
          <GlobalStatusBar />
          <main className="flex-1 p-6">{renderMainContent()}</main>
        </div>
      </div>
    </SidebarProvider>
  )
}
