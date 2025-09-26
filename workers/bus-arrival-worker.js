export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const pathname = url.pathname;

    // /busarrival 接口返回 JSON 数据
    if (pathname === "/busarrival") {
      const busStopCode = url.searchParams.get("BusStopCode");
      if (!busStopCode) {
        return new Response(JSON.stringify({ error: "BusStopCode missing" }), {
          status: 400,
          headers: { "Content-Type": "application/json" },
        });
      }

      try {
        const res = await fetch(`https://datamall2.mytransport.sg/ltaodataservice/v3/BusArrival?BusStopCode=${busStopCode}`, {
          headers: {
            "AccountKey": env.LTA_API_KEY,  // 在 Worker Secret 里存的 LTA Key
            "Accept": "application/json",
          },
        });
        const data = await res.json();
        return new Response(JSON.stringify(data), {
          headers: { "Content-Type": "application/json" },
        });
      } catch (err) {
        return new Response(JSON.stringify({ error: err.message }), {
          status: 500,
          headers: { "Content-Type": "application/json" },
        });
      }
    }

    // 根路径或其他路径返回主页
    if (pathname === "/" || pathname === "/index.html") {
      const html = await fetch("https://raw.githubusercontent.com/bb1026/bus/main/index.html").then(r => r.text());
      return new Response(html, {
        headers: { "Content-Type": "text/html;charset=UTF-8" },
      });
    }

    // 其他路径跳转到主页
    return Response.redirect("https://bus.0515364.xyz/", 302);
  },
};