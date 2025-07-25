# UR Cobot 智能協作儀表板 (Intelligent Collaboration Dashboard)

本儀表板為 Universal Robots 協作型機器人（Cobot）打造一個直觀、高效的管理與研發平台，適用於非專業的管理者與具技術背景的研發人員，實現易用性、安全性與彈性生產。

---

## 📐 設計理念與佈局

- **核心理念：** 化繁為簡，強調直覺與效率。
- **三欄式現代化佈局：**
  - **左側：** 主導航欄（Main Navigation）
  - **頂部：** 全局狀態欄（Global Status Bar）
  - **中央：** 主工作區（Main Workspace）

---

## 🔧 介面組成總覽

### ① 機器人選擇 (Cobot Selector)
- 可快速切換監控對象（例：UR5e-組裝產線01）

### ② 機器人狀態 (Cobot Status)
- **運行中 (綠色)：** 任務執行中
- **閒置 (藍色)：** 已開機但未執行任務
- **已暫停 (黃色)：** 任務暫停中
- **錯誤 (紅色)：** 顯示錯誤碼與詳細訊息

### ③ 緊急停止按鈕 (Emergency Stop)
- 全局紅色按鈕，可立即停止所有機器人動作

### ④ 通知中心 (Notifications)
- 顯示警報、維護提醒與任務通知

### ⑤ 用戶與設定 (User & Settings)
- 登入狀態顯示、語言切換（繁中/EN）、登出選項

---

## 📚 主導航欄功能模組

### 1. 總覽 (Dashboard)
- 關鍵績效指標（OEE、產量、稼動率等）
- 即時機器人狀態與 3D 視覺化
- 任務進度與事件日誌

### 2. 流程編輯器 (Process Editor)
- 拖拉式無代碼流程設計
- 指令分類清晰（移動、夾爪、邏輯等）
- 即時模擬與一鍵部署

### 3. 任務管理 (Task Management)
- 儲存、排程、修改與刪除工作流程

### 4. 即時監控 (Live Monitor)
- 攝影機即時畫面與 3D 軌跡追蹤
- I/O 狀態顯示與手動觸發
- 全局速度微調（研發模式）

### 5. 數據分析 (Analytics)
- 生產趨勢圖與停機原因分析
- CSV/PDF 報表導出，支援整合 MES/ERP

### 6. 系統設定 (System)
- 網路、使用者、API 與硬體連接管理

---

## 📊 模組詳解

### 🧭 總覽 Dashboard
- **OEE：** 85%
- **今日產量：** 1250 / 1500 件
- **平均循環時間：** 35.2 秒
- **稼動率：** 92%
- **即時 3D 模型、關節角度、TCP 座標、速度與負載資訊**
- **任務進度條與事件日誌**

---

### 🧱 流程編輯器 Process Editor

#### 📁 指令庫 (Command Library)
- 分類：移動、夾爪、邏輯、等待、感測
- 拖拉操作設計，降低學習門檻

#### 🖼️ 流程畫布 (Process Canvas)
- 視覺化流程邏輯，支援模板載入

#### ⚙️ 參數設定 (Parameter Settings)
- 點擊指令即可編輯速度、軌跡、點位等細節

#### 🎞️ 模擬與部署
- 即時模擬動作與安全區域
- 一鍵部署至實體機器人

---

### 🛰️ 即時監控 Live Monitor

#### 📷 攝影機視圖 (Camera Feed)
- 顯示即時影像，用於工作區域監控

#### 🧭 3D 軌跡追蹤 (3D Path Tracing)
- 顯示已執行與即將執行的路徑軌跡

#### 🔌 I/O 狀態面板 (I/O Panel)
- 即時顯示與手動測試輸出入訊號

#### 🎛️ 參數微調 (Parameter Override)
- 研發測試下的速度百分比微調功能

---

### 📈 數據分析 Analytics

- **產能趨勢圖：** 按日/週/月顯示產量、良率、循環時間
- **停機原因分析：** 柏拉圖呈現最常停機原因（例：待料、碰撞等）
- **數據導出：** 支援 CSV 與 PDF，便於與 MES/ERP 整合

---

## ✅ 滿足的關鍵需求

- **易用性與低門檻：**
  - 圖形化、無代碼流程設計
- **生產彈性：**
  - 任務儲存與快速換線
- **安全性：**
  - 緊急停止、警示提示、安全模擬設計
- **系統整合：**
  - 開放 API、標準化資料格式與匯出功能
- **維護性與性能監控：**
  - 即時狀態、遠端診斷、停機分析

---

## 📎 附註

- 所有設計皆以「使用者體驗優先」、「實際應用導向」為原則
- 儀表板可根據需求擴充，支援更多機型與第三方整合
