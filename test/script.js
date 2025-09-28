// ---------- 配置与全局变量 ----------
const BUS_STOPS_URL = "https://raw.githubusercontent.com/bb1026/bus/main/json/busStops.json";
const BUS_ROUTES_URL = "https://raw.githubusercontent.com/bb1026/bus/main/json/busRoutes.json";
const BUS_SERVICES_URL = "https://raw.githubusercontent.com/bb1026/bus/main/json/busServices.json";
const BUS_ARRIVAL_API = "https://busapi.0515364.xyz/busarrival?BusStopCode=";

let busStops = [], busRoutes = [], busServices = [];
let userPosition = null;
let favoriteBuses = JSON.parse(localStorage.getItem('favoriteBuses') || '[]');
let refreshInterval = null;
let currentView = 'default'; // 'default', 'search'

// ---------- 工具函数 ----------
function saveFavorites() {
  localStorage.setItem('favoriteBuses', JSON.stringify(favoriteBuses));
}

function haversine(lat1, lon1, lat2, lon2) {
  const R = 6371000, toRad = x => x * Math.PI / 180;
  const dLat = toRad(lat2 - lat1), dLon = toRad(lon2 - lon1);
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

async function loadData() {
  [busStops, busRoutes, busServices] = await Promise.all([
    fetch(BUS_STOPS_URL).then(r => r.json()),
    fetch(BUS_ROUTES_URL).then(r => r.json()),
    fetch(BUS_SERVICES_URL).then(r => r.json())
  ]);
}

async function getBusArrivalTimes(busStopCode) {
  try {
    const response = await fetch(`${BUS_ARRIVAL_API}${busStopCode}`);
    return await response.json();
  } catch (error) {
    console.error("获取实时数据失败:", error);
    return null;
  }
}

function getNextBuses(busStopCode) {
  const matchedRoutes = busRoutes
    .filter(route => route.BusStopCode === busStopCode)
    .sort((a, b) => a.Direction - b.Direction || a.StopSequence - b.StopSequence);

  const uniqueBuses = [];
  const seen = new Set();

  matchedRoutes.forEach(route => {
    const key = `${route.ServiceNo}-${route.Direction}`;
    if (!seen.has(key)) {
      seen.add(key);
      uniqueBuses.push(route);
    }
  });

  return uniqueBuses.map(b => {
    const svc = busServices.find(s => s.ServiceNo === b.ServiceNo && s.Direction === b.Direction);
    const destStop = busStops.find(bs => bs.BusStopCode === (svc ? svc.DestinationCode : b.DestinationCode));
    const originStop = busStops.find(bs => bs.BusStopCode === (svc ? svc.OriginCode : b.BusStopCode));
    return {
      ServiceNo: b.ServiceNo,
      Operator: b.Operator,
      Direction: b.Direction,
      Origin: originStop ? `${originStop.Description} (${originStop.BusStopCode})` : `${b.BusStopCode}`,
      Destination: destStop ? `${destStop.Description} (${destStop.BusStopCode})` : `${b.DestinationCode}`,
      WD_FirstBus: b.WD_FirstBus || '--',
      WD_LastBus: b.WD_LastBus || '--',
      SAT_FirstBus: b.SAT_FirstBus || '--',
      SAT_LastBus: b.SAT_LastBus || '--',
      SUN_FirstBus: b.SUN_FirstBus || '--',
      SUN_LastBus: b.SUN_LastBus || '--'
    };
  });
}

function getNearbyBusStops(limit = 20) {
  if (!userPosition) return [];
  return busStops.map(bs => {
    const dist = haversine(userPosition.lat, userPosition.lng, bs.Latitude, bs.Longitude);
    return { ...bs, distance: dist };
  }).sort((a, b) => a.distance - b.distance)
    .filter(bs => bs.distance <= 500)
    .slice(0, limit);
}

// ---------- 收藏相关 ----------
function toggleFavorite(busStopCode, bus) {
  const idx = favoriteBuses.findIndex(f => f.BusStopCode === busStopCode && f.bus.ServiceNo === bus.ServiceNo);
  const isFavorite = idx >= 0;
  if (isFavorite) favoriteBuses.splice(idx, 1);
  else favoriteBuses.push({ BusStopCode: busStopCode, bus });
  saveFavorites();

  document.querySelectorAll(`.star[data-bus="${bus.ServiceNo}"][data-stop="${busStopCode}"]`).forEach(star => {
    if (isFavorite) star.classList.add('unfilled');
    else star.classList.remove('unfilled');
  });

  const favoriteSection = document.getElementById('favoriteSection');
  if (!isFavorite) {
    const bs = busStops.find(b => b.BusStopCode === busStopCode);
    if (!bs) return;
    const card = document.createElement('div');
    card.className = 'busstop-card';
    card.dataset.stop = busStopCode;

    const listDiv = document.createElement('div');
    listDiv.className = 'bus-list show';
    card.appendChild(listDiv);

    const busDiv = document.createElement('div');
    busDiv.className = 'bus-item';
    busDiv.innerHTML = `
      <span><i class="fas fa-bus"></i> ${bus.ServiceNo} --<br> 
      <i class="fas fa-arrow-circle-right"></i> ${bus.Destination} -- --</span>
      <span class="star" data-bus="${bus.ServiceNo}" data-stop="${busStopCode}">&#9733;</span>
    `;
    busDiv.querySelector('.star').onclick = e => {
      e.stopPropagation();
      toggleFavorite(busStopCode, bus);
    };
    listDiv.appendChild(busDiv);
    favoriteSection.appendChild(card);
  } else {
    const card = favoriteSection.querySelector(`.busstop-card[data-stop="${busStopCode}"]`);
    if (card) favoriteSection.removeChild(card);
  }
}

// ---------- 模态窗口 ----------
function showBusModal(bus) {
  const modal = document.getElementById('busModal');
  document.getElementById('modalBusNo').innerHTML = `<i class="fas fa-bus"></i> ${bus.ServiceNo}`;

  const tabs = document.getElementById('modalTabs');
  const contents = document.getElementById('modalTabContents');
  tabs.innerHTML = '';
  contents.innerHTML = '';

  // 营运时间 tab
  const tab1 = document.createElement('button');
  tab1.innerHTML = '<i class="fas fa-clock"></i> 营运时间';
  const content1 = document.createElement('div');
  content1.className = 'tab-content';
  content1.innerHTML = renderOpHours(bus);
  tabs.appendChild(tab1);
  contents.appendChild(content1);

  // 路线图 tab
  const tab2 = document.createElement('button');
  tab2.innerHTML = '<i class="fas fa-route"></i> 路线图';
  const content2 = document.createElement('div');
  content2.className = 'tab-content';
  content2.innerHTML = renderRouteMap(bus);
  tabs.appendChild(tab2);
  contents.appendChild(content2);

  [tab1, tab2].forEach((btn, idx) => {
    btn.onclick = () => {
      document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
      contents.children[idx].classList.add('active');
    };
  });

  tab1.click();
  modal.style.display = 'flex';
}

function renderOpHours(bus) {
  return `<table class="op-table">
    <tr><th>类型</th><th>首班车</th><th>末班车</th></tr>
    <tr><td>工作日</td><td>${bus.WD_FirstBus}</td><td>${bus.WD_LastBus}</td></tr>
    <tr><td>星期六</td><td>${bus.SAT_FirstBus}</td><td>${bus.SAT_LastBus}</td></tr>
    <tr><td>星期日/公共假日</td><td>${bus.SUN_FirstBus}</td><td>${bus.SUN_LastBus}</td></tr>
  </table>`;
}

function renderRouteMap(bus) {
  const matchedRoutes = busRoutes
    .filter(route => route.ServiceNo === bus.ServiceNo && route.Direction === bus.Direction)
    .sort((a, b) => a.StopSequence - b.StopSequence);

  let nearestStopCode = null;
  if (userPosition) {
    let minDist = Infinity;
    matchedRoutes.forEach(route => {
      const stop = busStops.find(bs => bs.BusStopCode === route.BusStopCode);
      if (!stop) return;
      const dist = haversine(userPosition.lat, userPosition.lng, stop.Latitude, stop.Longitude);
      if (dist < minDist && dist <= 1000) {
        minDist = dist;
        nearestStopCode = stop.BusStopCode;
      }
    });
  }

  return `<div class="route-map">${matchedRoutes.map(route => {
    const stop = busStops.find(bs => bs.BusStopCode === route.BusStopCode);
    if (!stop) return '';
    const isCurrentStop = stop.BusStopCode === nearestStopCode;
    const stopEmoji = isCurrentStop ? "🔴 " : "🔵 ";
    return `<div class="route-stop">
      <div class="route-text">
        <div class="route-info">
          ${stopEmoji}${stop.Description}(${stop.BusStopCode})
          <button class="route-refresh" data-stop="${stop.BusStopCode}" data-bus="${bus.ServiceNo}" data-direction="${bus.Direction}">
            <i class="fas fa-sync-alt"></i>
          </button>
        </div>
        <div class="route-times" id="times-${stop.BusStopCode}"></div>
      </div>
    </div>`;
  }).join('')}</div>`;
}

// ---------- 关闭模态窗口 ----------
document.getElementById('modalClose').onclick = () => {
  document.getElementById('busModal').style.display = 'none';
};

// ---------- 初始化 ----------
(async function () {
  await loadData();
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(pos => {
      userPosition = { lat: pos.coords.latitude, lng: pos.coords.longitude };
      renderAllSections();
      startAutoRefresh();
    }, () => {
      renderAllSections();
      startAutoRefresh();
    });
  } else {
    renderAllSections();
    startAutoRefresh();
  }
})();
