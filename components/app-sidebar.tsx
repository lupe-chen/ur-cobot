"use client"

import { BarChart3, Bot, Calendar, Eye, Home, PenTool, Settings } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const menuItems = [
  {
    title: "總覽",
    icon: Home,
    id: "dashboard",
  },
  {
    title: "流程編輯器",
    icon: PenTool,
    id: "process-editor",
  },
  {
    title: "任務管理",
    icon: Calendar,
    id: "task-management",
  },
  {
    title: "即時監控",
    icon: Eye,
    id: "live-monitor",
  },
  {
    title: "數據分析",
    icon: BarChart3,
    id: "analytics",
  },
  {
    title: "系統設定",
    icon: Settings,
    id: "system",
  },
]

interface AppSidebarProps {
  activeModule: string
  setActiveModule: (module: string) => void
}

export function AppSidebar({ activeModule, setActiveModule }: AppSidebarProps) {
  return (
    <Sidebar className="border-r">
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
            <Bot className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-semibold">UR Cobot</h2>
            <p className="text-sm text-muted-foreground">智能協作儀表板</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>主要功能</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton onClick={() => setActiveModule(item.id)} isActive={activeModule === item.id}>
                    <item.icon className="h-4 w-4" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4">
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src="/placeholder-user.jpg" />
            <AvatarFallback>管理</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <p className="text-sm font-medium">生產經理</p>
            <p className="text-xs text-muted-foreground">繁中 | 登出</p>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
