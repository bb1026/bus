const fs = require("fs");
const fetch = require("node-fetch");

const apis = {
  busRoutes: "https://datamall2.mytransport.sg/ltaodataservice/BusRoutes",
  busServices: "https://datamall2.mytransport.sg/ltaodataservice/BusServices",
  busStops: "https://datamall2.mytransport.sg/ltaodataservice/BusStops",
};

const headers = { AccountKey: process.env.LTA_API_KEY };

async function fetchAll(url) {
  let skip = 0;
  let results = [];
  while (true) {
    const res = await fetch(url + `?$skip=${skip}`, { headers });
    if (!res.ok) throw new Error("Fetch failed: " + res.statusText);
    const data = await res.json();
    if (!data.value.length) break;
    results = results.concat(data.value);
    skip += 500;
  }
  return results;
}

(async () => {
  if (!fs.existsSync("json")) fs.mkdirSync("json");

  for (const [key, url] of Object.entries(apis)) {
    console.log(`Fetching ${key}...`);
    const data = await fetchAll(url);
    fs.writeFileSync(`json/${key}.json`, JSON.stringify(data, null, 2));
  }
  console.log("✅ All bus data updated!");
})();