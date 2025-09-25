const fs = require("fs");
const path = require("path");
const fetch = require("node-fetch"); // Node 18+ 可用内置 fetch

const apis = {
  busRoutes: "https://datamall2.mytransport.sg/ltaodataservice/BusRoutes",
  busServices: "https://datamall2.mytransport.sg/ltaodataservice/BusServices",
  busStops: "https://datamall2.mytransport.sg/ltaodataservice/BusStops",
};

const headers = { AccountKey: process.env.LTA_API_KEY, Accept: "application/json" };

const OUT_DIR = path.join(__dirname, "json");

async function fetchAll(url) {
  let skip = 0;
  let results = [];
  const step = 500;
  while (true) {
    try {
      const res = await fetch(url + `?$skip=${skip}`, { headers });
      if (!res.ok) throw new Error(`HTTP ${res.status} ${res.statusText}`);
      const data = await res.json();
      if (!data.value || !data.value.length) break;
      results.push(...data.value);
      skip += step;
    } catch (err) {
      console.error(`❌ Fetch failed (skip=${skip}):`, err);
      skip += step; // 避免卡死
    }
  }
  return results;
}

(async () => {
  try {
    if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR);

    for (const [key, url] of Object.entries(apis)) {
      console.log(`⏳ Fetching ${key}...`);
      const data = await fetchAll(url);
      fs.writeFileSync(path.join(OUT_DIR, `${key}.json`), JSON.stringify(data, null, 2));
      console.log(`✅ ${key} updated, total records: ${data.length}`);
    }
    console.log("🎉 All bus data updated!");
  } catch (err) {
    console.error("🔥 Script failed:", err);
    process.exit(1);
  }
})();