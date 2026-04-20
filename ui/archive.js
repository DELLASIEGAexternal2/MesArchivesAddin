const STATUS = {
  NOT_ARCHIVED: "NOT_ARCHIVED",
  ARCHIVED_NOT_MOUNTED: "ARCHIVED_NOT_MOUNTED",
  ARCHIVED_MOUNTED: "ARCHIVED_MOUNTED"
};

Office.onReady(() => {
  loadArchives();
});

function getYears() {
  const y = new Date().getFullYear();
  return [y, y-1, y-2, y-3];
}

function getStatusColor(status) {
  switch (status) {
    case STATUS.ARCHIVED_MOUNTED: return "green";
    case STATUS.ARCHIVED_NOT_MOUNTED: return "orange";
    default: return "red";
  }
}

function loadArchives() {

  const years = getYears();

  const data = years.map(y => ({
    year: y,
    status: STATUS.NOT_ARCHIVED
  }));

  render(data);
}

function render(list) {

  const div = document.getElementById("archives");
  div.innerHTML = "";

  list.forEach(a => {

    const color = getStatusColor(a.status);

    div.innerHTML += `
      <div class="item">
        ${a.year} <span style="color:${color}">●</span>
        <button onclick="archive(${a.year})">Archiver</button>
      </div>
    `;
  });
}

async function archive(year) {

  alert("Archivage année " + year);

  // futur : appel Graph
}
