"use client"

import type React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Settings, Users, Shield, Cpu, HardDrive, Network, Key, Plus, Edit, Trash2 } from "lucide-react"
import { useState } from "react"

const users = [
  {
    id: 1,
    name: "張經理",
    role: "管理員",
    email: "manager@company.com",
    lastLogin: "2024-01-15 14:30",
    status: "active",
  },
  {
    id: 2,
    name: "李工程師",
    role: "操作員",
    email: "engineer@company.com",
    lastLogin: "2024-01-15 13:45",
    status: "active",
  },
  {
    id: 3,
    name: "王技師",
    role: "維護員",
    email: "technician@company.com",
    lastLogin: "2024-01-14 16:20",
    status: "inactive",
  },
]

const networkDevices = [
  { name: "UR5e-01", ip: "192.168.1.100", status: "connected", type: "機器人" },
  { name: "PLC-01", ip: "192.168.1.101", status: "connected", type: "PLC" },
  { name: "Camera-01", ip: "192.168.1.102", status: "connected", type: "攝影機" },
  { name: "Sensor-Hub", ip: "192.168.1.103", status: "disconnected", type: "感測器" },
]

export function SystemSettings() {
  const [activeTab, setActiveTab] = useState("hardware")

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">系統設定</h1>
        <Button variant="outline">
          <Settings className="h-4 w-4 mr-2" />
          匯出設定
        </Button>
      </div>

      <Tabs defaultValue="hardware" onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-5 relative bg-muted p-1 rounded-lg">
          <div
            className="absolute inset-y-1 left-1 w-[calc(20%-0.25rem)] bg-background rounded-md shadow-sm transition-transform duration-200 ease-out transform translate-x-[var(--tab-offset)]"
            style={
              {
                "--tab-offset": `${["hardware", "users", "network", "security", "api"].indexOf(activeTab) * 100}%`,
              } as React.CSSProperties
            }
          />
          <TabsTrigger
            value="hardware"
            className="relative z-10 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
          >
            硬體設定
          </TabsTrigger>
          <TabsTrigger
            value="users"
            className="relative z-10 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
          >
            使用者管理
          </TabsTrigger>
          <TabsTrigger
            value="network"
            className="relative z-10 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
          >
            網路設定
          </TabsTrigger>
          <TabsTrigger
            value="security"
            className="relative z-10 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
          >
            安全設定
          </TabsTrigger>
          <TabsTrigger
            value="api"
            className="relative z-10 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
          >
            API 設定
          </TabsTrigger>
        </TabsList>

        <TabsContent value="hardware" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Robot Configuration */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Cpu className="h-5 w-5" />
                  機器人設定
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="robot-name">機器人名稱</Label>
                  <Input id="robot-name" value="UR5e-組裝產線01" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="robot-ip">IP 位址</Label>
                  <Input id="robot-ip" value="192.168.1.100" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="robot-port">連接埠</Label>
                  <Input id="robot-port" value="30002" />
                </div>

                <Separator />

                <div className="space-y-3">
                  <h4 className="font-medium">安全設定</h4>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">碰撞檢測</span>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">力覺限制</span>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">安全邊界</span>
                    <Switch defaultChecked />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* System Status */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HardDrive className="h-5 w-5" />
                  系統狀態
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm">CPU 使用率</span>
                    <span className="text-sm font-medium">23%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">記憶體使用率</span>
                    <span className="text-sm font-medium">45%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">儲存空間</span>
                    <span className="text-sm font-medium">67% (234GB/350GB)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">系統溫度</span>
                    <span className="text-sm font-medium">42°C</span>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <h4 className="font-medium">系統資訊</h4>
                  <div className="text-sm space-y-1">
                    <div className="flex justify-between">
                      <span>作業系統:</span>
                      <span>Ubuntu 20.04 LTS</span>
                    </div>
                    <div className="flex justify-between">
                      <span>軟體版本:</span>
                      <span>URCap v2.1.3</span>
                    </div>
                    <div className="flex justify-between">
                      <span>最後更新:</span>
                      <span>2024-01-10</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="users" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  使用者管理
                </CardTitle>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  新增使用者
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>姓名</TableHead>
                    <TableHead>角色</TableHead>
                    <TableHead>電子郵件</TableHead>
                    <TableHead>最後登入</TableHead>
                    <TableHead>狀態</TableHead>
                    <TableHead className="text-right">操作</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell>
                        <Badge variant={user.role === "管理員" ? "default" : "secondary"}>{user.role}</Badge>
                      </TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">{user.lastLogin}</TableCell>
                      <TableCell>
                        <Badge variant={user.status === "active" ? "default" : "secondary"}>
                          {user.status === "active" ? "啟用" : "停用"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex gap-2 justify-end">
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="network" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Network className="h-5 w-5" />
                  網路設定
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="ip-address">IP 位址</Label>
                  <Input id="ip-address" value="192.168.1.50" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subnet-mask">子網路遮罩</Label>
                  <Input id="subnet-mask" value="255.255.255.0" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="gateway">預設閘道</Label>
                  <Input id="gateway" value="192.168.1.1" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dns">DNS 伺服器</Label>
                  <Input id="dns" value="8.8.8.8" />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <span className="text-sm">DHCP</span>
                  <Switch />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>連接設備</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {networkDevices.map((device, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">{device.name}</p>
                        <p className="text-sm text-muted-foreground">{device.ip}</p>
                        <p className="text-xs text-muted-foreground">{device.type}</p>
                      </div>
                      <Badge variant={device.status === "connected" ? "default" : "destructive"}>
                        {device.status === "connected" ? "已連接" : "未連接"}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                安全設定
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h4 className="font-medium">登入安全</h4>
                <div className="flex items-center justify-between">
                  <span className="text-sm">啟用雙因素驗證</span>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">自動登出 (30分鐘)</span>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">密碼複雜度要求</span>
                  <Switch defaultChecked />
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-medium">系統安全</h4>
                <div className="flex items-center justify-between">
                  <span className="text-sm">防火牆</span>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">入侵檢測</span>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">操作日誌記錄</span>
                  <Switch defaultChecked />
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-medium">資料加密</h4>
                <div className="flex items-center justify-between">
                  <span className="text-sm">資料庫加密</span>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">通訊加密 (TLS)</span>
                  <Switch defaultChecked />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="api" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Key className="h-5 w-5" />
                  API 設定
                </CardTitle>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  新增 API 金鑰
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h4 className="font-medium">API 端點</h4>
                <div className="space-y-2">
                  <Label htmlFor="api-base-url">基礎 URL</Label>
                  <Input id="api-base-url" value="https://api.urcobot.local/v1" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="webhook-url">Webhook URL</Label>
                  <Input id="webhook-url" placeholder="https://your-system.com/webhook" />
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-medium">API 金鑰管理</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">MES 系統整合</p>
                      <p className="text-sm text-muted-foreground">用於 MES 系統資料同步</p>
                      <p className="text-xs font-mono text-muted-foreground">ur_***************abc123</p>
                    </div>
                    <div className="flex gap-2">
                      <Badge variant="default">啟用</Badge>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">ERP 系統整合</p>
                      <p className="text-sm text-muted-foreground">用於 ERP 系統資料交換</p>
                      <p className="text-xs font-mono text-muted-foreground">ur_***************def456</p>
                    </div>
                    <div className="flex gap-2">
                      <Badge variant="secondary">停用</Badge>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-medium">API 限制</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="rate-limit">請求頻率限制 (每分鐘)</Label>
                    <Input id="rate-limit" type="number" value="100" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="timeout">請求逾時 (秒)</Label>
                    <Input id="timeout" type="number" value="30" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
