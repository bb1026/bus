export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const pathname = url.pathname;

    // /busarrival 接口返回 JSON 数据
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
              "AccountKey": env.LTA_API_KEY, // Worker Secret 中存储的 LTA Key
              "Accept": "application/json",
            },
          }
        );

        const text = await res.text();

        if (!text) {
          return new Response(JSON.stringify({ error: "Empty response from LTA API" }), {
            status: 502,
            headers: { "Content-Type": "application/json" },
          });
        }

        let data;
        try {
          data = JSON.parse(text);
        } catch {
          return new Response(JSON.stringify({ error: "LTA API did not return valid JSON", raw: text }), {
            status: 502,
            headers: { "Content-Type": "application/json" },
          });
        }

        return new Response(JSON.stringify(data), {
          headers: { "Content-Type": "application/json" },
        });
      } catch (err) {
        return new Response(JSON.stringify({ error: err.message }), {
          status: 502,
          headers: { "Content-Type": "application/json" },
        });
      }
    }

    // 根路径或其他路径返回简单提示
    return new Response(JSON.stringify({ message: "Bus Arrival API Worker running" }), {
      headers: { "Content-Type": "application/json" },
    });
  },
};