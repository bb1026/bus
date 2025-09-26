export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // /busarrival 路径 → 返回 JSON 数据
    if (url.pathname === "/busarrival") {
      const busStopCode = url.searchParams.get("BusStopCode");
      if (!busStopCode) {
        return new Response(JSON.stringify({ error: "BusStopCode missing" }), {
          status: 400,
          headers: { "Content-Type": "application/json" }
        });
      }

      try {
        const res = await fetch(`https://datamall2.mytransport.sg/ltaodataservice/v3/BusArrival?BusStopCode=${busStopCode}`, {
          headers: {
            "AccountKey": env.LTA_API_KEY_BUS,
            "Accept": "application/json"
          }
        });

        const data = await res.json();
        return new Response(JSON.stringify(data), {
          headers: { "Content-Type": "application/json" }
        });

      } catch (err) {
        return new Response(JSON.stringify({ error: err.message }), {
          status: 500,
          headers: { "Content-Type": "application/json" }
        });
      }
    }

    // 根路径或其他 → 返回主页 HTML
    if (url.pathname === "/" || url.pathname === "/index.html") {
      const html = `
        <!DOCTYPE html>
        <html lang="zh-CN">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>巴士主页</title>
        </head>
        <body>
          <h1>欢迎来到巴士主页</h1>
          <p>你可以访问 <code>/busarrival?BusStopCode=XXXXX</code> 查询公交到站信息。</p>
        </body>
        </html>
      `;
      return new Response(html, { headers: { "Content-Type": "text/html" } });
    }

    // 其他路径 → 404
    return new Response("Not Found", { status: 404 });
  }
}