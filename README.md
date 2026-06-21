好，这三个我给你直接做成一套可用方案（README + 美化 + 真切换 + Swagger），你可以直接部署或放 GitHub。

我分 3 部分给你👇（全部可复制）

⸻

🚀 ① GitHub README 美化版（徽章 + API卡片）

👉 这个是你 GitHub 首页用的 README.md

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
## 📡 API Endpoint
### GET Bus Arrival

GET /busarrival?BusStopCode={BusStopCode}

### Example

GET https://busapi.0515364.xyz/busarrival?BusStopCode=01012

---
## 📦 Response
```json id="z2tq9m"
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

⸻

⚡ Quick Info Card

Item	Value
Base URL	https://busapi.0515364.xyz
Format	JSON
Update	Real-time
Source	LTA DataMall

⸻

⏱ Rate Limit

* Recommended: 5–10 seconds interval
* Use caching on client side
* Avoid high-frequency polling

⸻

⚠️ Disclaimer

This API is provided as-is without warranty.
Use at your own risk.

---
# 🌍 ② 真·中英文切换按钮（GitHub Pages / Web版）
👉 ⚠️ 这个必须放在 HTML，不是纯 Markdown 才能用 JS
### 📄 index.html（直接复制）
```html id="c3xv2p"
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>SG Bus API Docs</title>
<style>
body {
  font-family: system-ui;
  margin: 40px;
  line-height: 1.6;
}
.lang-btn {
  position: fixed;
  top: 20px;
  right: 20px;
  padding: 10px 14px;
  background: #111;
  color: #fff;
  border-radius: 8px;
  cursor: pointer;
}
.cn { display: none; }
.en { display: block; }
</style>
</head>
<body>
<div class="lang-btn" onclick="toggleLang()">中 / EN</div>
<!-- ENGLISH -->
<div class="en">
<h1>🚌 SG Bus Arrival API</h1>
<p>Real-time Singapore Bus Arrival API</p>
<h2>Endpoint</h2>
<code>/busarrival?BusStopCode=01012</code>
<h2>Example</h2>
<code>https://busapi.0515364.xyz/busarrival?BusStopCode=01012</code>
<h2>Rate Limit</h2>
<ul>
<li>5–10 seconds interval</li>
<li>Use caching</li>
</ul>
</div>
<!-- CHINESE -->
<div class="cn">
<h1>🚌 新加坡巴士 API</h1>
<p>实时巴士到站查询接口</p>
<h2>接口</h2>
<code>/busarrival?BusStopCode=01012</code>
<h2>示例</h2>
<code>https://busapi.0515364.xyz/busarrival?BusStopCode=01012</code>
<h2>访问建议</h2>
<ul>
<li>5–10 秒刷新</li>
<li>建议缓存</li>
</ul>
</div>
<script>
function toggleLang() {
  document.querySelector('.en').style.display =
    document.querySelector('.en').style.display === 'none' ? 'block' : 'none';
  document.querySelector('.cn').style.display =
    document.querySelector('.cn').style.display === 'none' ? 'block' : 'none';
}
</script>
</body>
</html>

⸻

📊 ③ Swagger UI 文档版（专业API页面）

👉 这个是“开发者级文档页面”，直接可部署

⸻

📄 swagger.html

<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>SG Bus API Docs</title>
<link rel="stylesheet" href="https://unpkg.com/swagger-ui-dist/swagger-ui.css">
</head>
<body>
<div id="swagger-ui"></div>
<script src="https://unpkg.com/swagger-ui-dist/swagger-ui-bundle.js"></script>
<script>
const ui = SwaggerUIBundle({
  url: "openapi.json",
  dom_id: '#swagger-ui'
});
</script>
</body>
</html>

⸻

📄 openapi.json（核心）

{
  "openapi": "3.0.0",
  "info": {
    "title": "SG Bus Arrival API",
    "version": "1.0.0",
    "description": "Real-time Singapore Bus Arrival API"
  },
  "servers": [
    {
      "url": "https://busapi.0515364.xyz"
    }
  ],
  "paths": {
    "/busarrival": {
      "get": {
        "summary": "Get bus arrival info",
        "parameters": [
          {
            "name": "BusStopCode",
            "in": "query",
            "required": true,
            "schema": {
              "type": "string"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Success response"
          }
        }
      }
    }
  }
}