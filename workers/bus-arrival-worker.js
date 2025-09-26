// workers/bus-arrival-worker.js
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
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
            "AccountKey": env.LTA_API_KEY,  // 从 GitHub Secrets 注入
            Accept: "application/json",
          },
        }
      );

      if (!res.ok) {
        return new Response(
          JSON.stringify({ error: "Failed to fetch LTA data" }),
          { status: res.status, headers: { "Content-Type": "application/json" } }
        );
      }

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
  },
};
