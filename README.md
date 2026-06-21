# Singapore Bus
# 每月自动获取LTA最新数据

🚌 SG Bus Arrival API

Real-time Singapore Bus Arrival API

实时新加坡巴士到站查询接口

Base URL

https://busapi.0515364.xyz

⸻

<p align="right">
  <a href="#english">🇺🇸 English</a> |
  <a href="#中文">🇨🇳 中文</a> |
  <a href="#disclaimer">⚠️ Disclaimer</a>
</p>

⸻

English

Overview

SG Bus Arrival API provides real-time bus arrival information for Singapore bus stops.

Endpoint

GET /busarrival?BusStopCode={BusStopCode}

Example

GET https://busapi.0515364.xyz/busarrival?BusStopCode=01012

Response Example

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

Rate Limit

Recommended refresh interval:

* Every 5-10 seconds
* Avoid excessive requests
* Client-side caching is recommended

⸻

中文

简介

SG Bus Arrival API 提供新加坡巴士站实时到站信息查询服务。

接口地址

GET /busarrival?BusStopCode={BusStopCode}

请求示例

GET https://busapi.0515364.xyz/busarrival?BusStopCode=01012

返回示例

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

访问建议

建议：

* 每 5~10 秒刷新一次
* 避免高频请求
* 建议客户端缓存结果

⸻

Disclaimer

English

This API is provided on an “as is” basis without any warranties.

* Availability is not guaranteed.
* Response format may change without prior notice.
* Data accuracy depends on upstream data providers.
* The service may be suspended, modified, rate-limited, or terminated at any time.
* The API owner shall not be liable for any direct or indirect damages arising from the use of this service.

中文

本接口按“现状（As Is）”提供，不提供任何形式的保证。

* 不保证服务持续可用。
* 返回格式可能在不提前通知的情况下调整。
* 数据准确性依赖于上游数据源。
* 服务可能随时暂停、修改、限流或终止。
* 因使用本接口导致的任何直接或间接损失，接口提供者不承担责任。

⸻

Data Source / 数据来源

This project uses publicly available transport data provided by the Singapore Land Transport Authority (LTA) through DataMall and related open data services.

本项目使用新加坡陆路交通管理局（LTA）DataMall 及相关开放数据服务提供的公开交通数据。

The data remains the property of its respective providers.

数据版权及所有权归原始数据提供方所有。

⸻

Disclaimer / 免责声明

This project is an independent community project and is not affiliated with, endorsed by, or sponsored by the Land Transport Authority (LTA) of Singapore.

本项目为独立开发项目，与新加坡陆路交通管理局（LTA）不存在任何隶属、合作或官方认可关系。

Bus arrival information and related transport data are obtained from publicly available sources. Accuracy, completeness, and availability of the data are not guaranteed.

巴士到站时间及相关交通数据来源于公开数据源，不保证数据的准确性、完整性及持续可用性。

Service interruptions, delays, missing records, or inaccurate predictions may occur due to upstream data provider issues.

由于上游数据源原因，可能出现服务中断、数据延迟、缺失或预测不准确等情况。

Users should not rely on this service for safety-critical, operational, or commercial decisions.

用户不应将本服务作为安全、运营或商业决策的唯一依据。

The API may be modified, rate-limited, suspended, or discontinued without prior notice.

本接口可能在不事先通知的情况下修改、限流、暂停或终止服务。

This API acts as a community-maintained wrapper around publicly available transport datasets and is intended for educational, personal, and development purposes.

本接口是对公开交通数据的二次封装，主要用于学习、个人项目及开发测试用途。