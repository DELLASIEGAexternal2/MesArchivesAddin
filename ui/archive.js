const archives = [
  { year: 2024, status: "Installé" },
  { year: 2023, status: "Disponible" },
  { year: 2022, status: "Annulé" },
  { year: 2021, status: "Indisponible" }
];

function getStatusClass(status) {
  switch (status) {
    case "Installé": return "status-installed";
    case "Disponible": return "status-available";
    case "Annulé": return "status-cancelled";
    case "Indisponible": return "status-unavailable";
    case "En cours": return "status-processing";
    default: return "";
  }
}

function createRow(item) {
  const div = document.createElement("div");
  div.className = `archive-row ${getStatusClass(item.status)}`;

  div.innerHTML = `
    <object type="image/svg+xml" data="components/archive-icon.svg" class="archive-icon"></object>
    <span class="archive-label">${item.year} - ${item.status}</span>
  `;

  return div;
}

function render() {
  const container = document.getElementById("archiveList");

  archives.forEach(a => {
    container.appendChild(createRow(a));
  });
}

document.addEventListener("DOMContentLoaded", render);
