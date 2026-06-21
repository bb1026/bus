⸻

# 🚌 SG Bus Arrival API
![API](https://img.shields.io/badge/API-Real--Time-green)
![Singapore](https://img.shields.io/badge/Location-Singapore-blue)
![Status](https://img.shields.io/badge/Status-Active-success)
Real-time Singapore Bus Arrival API  
实时新加坡巴士到站查询接口
---
## 🌐 Base URL

https://busapi.0515364.xyz

---
<p align="right">
  <a href="#english">🇺🇸 English</a> |
  <a href="#chinese">🇨🇳 中文</a> |
  <a href="#disclaimer">⚠️ Disclaimer</a>
</p>
---
## 🇺🇸 English
<h2 id="english"></h2>
### 📡 Endpoint

GET /busarrival?BusStopCode={BusStopCode}

### 📍 Example Request

GET https://busapi.0515364.xyz/busarrival?BusStopCode=01012

### 📦 Response
```json id="z8p3qq"
{
  "Services": [
    {
      "ServiceNo": "2",
      "Operator": "GAS",
      "NextBus": {
        "EstimatedArrival": "2026-06-21T12:34:56+08:00"
      }
    }
  ]
}

⚡ Rate Limit

* Recommended: 5–10 seconds per request
* Avoid high-frequency polling
* Use client-side caching

⸻

🇨🇳 中文

<h2 id="chinese"></h2>

📡 接口

GET /busarrival?BusStopCode={BusStopCode}
``` id="c1m9zz"
### 📍 请求示例

GET https://busapi.0515364.xyz/busarrival?BusStopCode=01012

### 📦 返回示例
```json id="w2k9jj"
{
  "Services": [
    {
      "ServiceNo": "2",
      "Operator": "GAS",
      "NextBus": {
        "EstimatedArrival": "2026-06-21T12:34:56+08:00"
      }
    }
  ]
}

⚡ 访问建议

* 每 5~10 秒刷新一次
* 避免高频请求
* 建议本地缓存结果

⸻

⚠️ Disclaimer

<h2 id="disclaimer"></h2>

English

This API is provided on an “as is” basis without any warranty.

* No guarantee of uptime
* Response format may change without notice
* Data depends on upstream providers
* Service may be modified or discontinued anytime
* No liability for any losses

⸻

中文

本接口按“现状（As Is）”提供，不提供任何保证。

* 不保证持续可用
* 返回格式可能变化
* 数据依赖上游来源
* 服务可能随时暂停或终止
* 不承担任何使用风险

⸻

📊 Quick Info

Item	Value
Base URL	https://busapi.0515364.xyz
Format	JSON
Update	Real-time
Source	LTA DataMall

⸻

📡 Data Source

This project uses publicly available transport data from Singapore Land Transport Authority (LTA).

本项目使用新加坡陆路交通管理局（LTA）公开数据。

⸻

⚠️ Final Note

This is an independent project and is not affiliated with LTA Singapore.

本项目为独立项目，与 LTA 无官方关系。

---