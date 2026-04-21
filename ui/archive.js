const archives = [
  { year: 2024, status: "INSTALLED" },
  { year: 2023, status: "AVAILABLE" },
  { year: 2022, status: "CANCELLED" },
  { year: 2021, status: "UNAVAILABLE" }
];

function getStatusClass(status) {
  switch (status) {
    case "INSTALLED": return "status-installed";
    case "AVAILABLE": return "status-available";
    case "CANCELLED": return "status-cancelled";
    case "UNAVAILABLE": return "status-unavailable";
    case "PROCESSING": return "status-processing";
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
