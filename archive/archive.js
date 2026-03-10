Office.onReady(() => {

  const params = new URLSearchParams(window.location.search);
  const year = params.get("year");

  document.getElementById("title").innerText = "Archives " + year;

  loadMessages(year);

});

async function loadMessages(year){

  const messages = await getMessagesByYear(year);

  const container = document.getElementById("messages");

  messages.forEach(m => {

    const div = document.createElement("div");

    div.className="mail";

    div.innerHTML = `
      <b>${m.subject}</b><br>
      ${m.from.emailAddress.address}<br>
      ${m.receivedDateTime}
    `;

    container.appendChild(div);

  });

}
