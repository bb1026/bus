export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const pathname = url.pathname;

    // 拦截 /busarrival 请求
    if (pathname.startsWith("/busarrival")) {
      const busStopCode = url.searchParams.get("BusStopCode");
      if (!busStopCode) {
        return new Response(JSON.stringify({ error: "BusStopCode missing" }), {
          status: 400,
          headers: { "Content-Type": "application/json" },
        });
      }

      try {
        const res = await fetch(
          `https://datamall2.mytransport.sg/ltaodataservice/v3/BusArrival?BusStopCode=${busStopCode}`,
          {
            headers: {
              "AccountKey": env.LTA_API_KEY,
              Accept: "application/json",
            },
          }
        );
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

    // 非 /busarrival 请求，直接转发到 Pages 主页
    return fetch(request);
  },
};