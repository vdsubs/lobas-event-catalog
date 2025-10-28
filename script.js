const catalogList = document.getElementById("catalog-list");
const drinkList = document.getElementById("drink-list");

Papa.parse("catalog.csv", {
  download: true,
  header: true,
  complete: (results) => {
    const data = results.data.filter(row => row.name && row.catalog);
    const catalogs = [...new Set(data.map(d => d.catalog))];

    // Показываем список каталогов
    catalogs.forEach(cat => {
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `<div class="card-content"><h3>${cat}</h3></div>`;
      card.addEventListener("click", () => showCatalog(cat, data));
      catalogList.appendChild(card);
    });
  }
});

function showCatalog(cat, data) {
  catalogList.classList.add("hidden");
  drinkList.classList.remove("hidden");
  drinkList.innerHTML = "";

  const backBtn = document.createElement("button");
  backBtn.textContent = "← Назад";
  backBtn.className = "back-button";
  backBtn.onclick = () => {
    drinkList.classList.add("hidden");
    catalogList.classList.remove("hidden");
  };
  drinkList.appendChild(backBtn);

  const drinks = data.filter(d => d.catalog === cat);
  drinks.forEach(d => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="${d.image}" alt="${d.name}">
      <div class="card-content">
        <h3>${d.name}</h3>
        <p>${d.about || ""}</p>
        <strong>${d.price ? d.price + " ₽" : ""}</strong>
      </div>`;
    drinkList.appendChild(card);
  });
}
