const archives = [
  { year: 2024, status: "INSTALLED" },
  { year: 2023, status: "AVAILABLE" },
  { year: 2022, status: "CANCELLED" },
  { year: 2021, status: "UNAVAILABLE" }
];

function getColor(status) {
  switch (status) {
    case "INSTALLED": return "status-green";
    case "AVAILABLE": return "status-yellow";
    case "CANCELLED": return "status-red";
    case "UNAVAILABLE": return "status-gray";
    default: return "";
  }
}

function render() {
  const container = document.getElementById("archiveList");

  archives.forEach(a => {

    const row = document.createElement("div");
    row.className = "archive-row";

    row.innerHTML = `
      <svg class="icon" viewBox="0 0 64 64">
        <ellipse cx="32" cy="16" rx="18" ry="6" fill="#222"/>
        <rect x="14" y="16" width="36" height="22" fill="#222"/>
        <ellipse cx="32" cy="38" rx="18" ry="6" fill="#222"/>
        <circle cx="48" cy="48" r="8" class="${getColor(a.status)}"/>
      </svg>

      <span>${a.year} - ${a.status}</span>
    `;

    container.appendChild(row);
  });
}

document.addEventListener("DOMContentLoaded", render);
