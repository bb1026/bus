# 🚌 SG Bus Arrival API
![API](https://img.shields.io/badge/API-Real--Time-green)
![Singapore](https://img.shields.io/badge/Location-Singapore-blue)
![Status](https://img.shields.io/badge/Status-Active-success)<br>
Real-time Singapore Bus Arrival API<br>
实时新加坡巴士到站查询接口
---
## 🌐 Base URL

https://busapi.0515364.xyz

---
## 📡 API Usage 接口说明
Request format / 请求方式：

GET /busarrival?BusStopCode={BusStopCode}

Example / 示例：

GET https://busapi.0515364.xyz/busarrival?BusStopCode=01012

---
## 📦 Response 返回示例
```json id="e4p8ww"
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
```

---

⚡ Rate Limit 使用建议

* Recommended interval / 推荐间隔：5–10 seconds
* Avoid high frequency requests / 避免高频请求
* Use caching / 建议客户端缓存结果

---

📊 Quick Info 接口信息

Item 项目	Value 内容
Base URL	https://busapi.0515364.xyz
Format 格式	JSON
Update 更新	Real-time 实时
Source 数据来源	LTA DataMall

---

📡 Data Source 数据来源

This project uses publicly available transport data provided by the Singapore Land Transport Authority (LTA).
本项目使用新加坡陆路交通管理局（LTA）公开交通数据。

Data remains the property of its respective providers.
数据版权归原始提供方所有。

---

⚠️ Disclaimer 免责声明

This API is provided on an “as is” basis without any warranties.
本接口按“现状（As Is）”提供，不提供任何保证。

* No guarantee of uptime / 不保证持续可用
* Data may change / 数据可能随时变化
* Depends on upstream source / 依赖上游数据
* May be modified or discontinued / 可能随时调整或终止
* No liability for any losses / 不承担任何损失

---

⚠️ Final Note 最终说明

This is an independent project and is not affiliated with LTA Singapore.
本项目为独立项目，与新加坡陆路交通管理局（LTA）无任何关系。

Bus arrival data may be delayed or inaccurate and should not be used for critical decisions.
巴士数据可能存在延迟或误差，不适用于关键决策。

---