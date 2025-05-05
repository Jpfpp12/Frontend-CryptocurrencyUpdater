const API_URL = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false";

let coinsData = [];

function fetchWithThen() {
  fetch(API_URL)
    .then(response => response.json())
    .then(data => {
      coinsData = data;
      renderTable(coinsData);
    })
    .catch(err => console.error("Error fetching with .then:", err));
}

async function fetchWithAsyncAwait() {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    coinsData = data;
    renderTable(coinsData);
  } catch (error) {
    console.error("Error fetching with async/await:", error);
  }
}

fetchWithThen(); 

function renderTable(data) {
  const tbody = document.querySelector("#cryptoTable tbody");
  tbody.innerHTML = "";

  data.forEach(coin => {
    const row = `
      <tr>
        <td><img src="${coin.image}" alt="${coin.name}" /></td>
        <td>${coin.name}</td>
        <td>${coin.symbol.toUpperCase()}</td>
        <td>$${coin.current_price.toLocaleString()}</td>
        <td>${coin.total_volume.toLocaleString()}</td>
        <td>${coin.price_change_percentage_24h.toFixed(2)}%</td>
        <td>$${coin.market_cap.toLocaleString()}</td>
      </tr>
    `;
    tbody.innerHTML += row;
  });
}

function searchCoins() {
  const searchTerm = document.getElementById("searchInput").value.toLowerCase();
  const filteredData = coinsData.filter(coin =>
    coin.name.toLowerCase().includes(searchTerm) ||
    coin.symbol.toLowerCase().includes(searchTerm)
  );
  renderTable(filteredData);
}

function sortByMarketCap() {
  const sorted = [...coinsData].sort((a, b) => b.market_cap - a.market_cap);
  renderTable(sorted);
}

function sortByPercentageChange() {
  const sorted = [...coinsData].sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h);
  renderTable(sorted);
}
