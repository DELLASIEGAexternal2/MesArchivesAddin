Office.onReady(() => {});

async function callLocalAgent(year, event) {
  try {
    const upn = Office.context.mailbox.userProfile.emailAddress;
    const token = await Office.auth.getAccessToken({ allowSignInPrompt: true });

    const response = await fetch('https://localhost:5002/restore', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify({ annee: year, upn: upn })
    });

    if (response.ok) {
      event.completed({ allowEventPropagation: false, message: `Archive ${year} montée` });
    } else {
      const error = await response.text();
      event.completed({ allowEventPropagation: false, message: `Erreur ${year}: ${error}` });
    }
  } catch (error) {
    console.error(error);
    event.completed({ allowEventPropagation: false, message: `Agent local non démarré sur https://localhost:5002` });
  }
}

// Noms EXACTS de ton manifest
function openArchive2021(event) { callLocalAgent(2021, event); }
function openArchive2022(event) { callLocalAgent(2022, event); }
function openArchive2023(event) { callLocalAgent(2023, event); }
function openArchive2024(event) { callLocalAgent(2024, event); }

function openModop(event) {
  window.open("https://dellasiegaexternal2.github.io/MesArchivesAddin/ModOp_Mes_ARCHIVES.pdf", "_blank");
  event.completed();
}

function openAbout(event) {
  Office.context.ui.displayDialogAsync("https://dellasiegaexternal2.github.io/MesArchivesAddin/src/taskpane/taskpane.html", 
    { height: 30, width: 20, displayInIframe: true });
  event.completed();
}

// Association obligatoire
if (typeof Office !== 'undefined') {
  Office.actions.associate("openArchive2021", openArchive2021);
  Office.actions.associate("openArchive2022", openArchive2022);
  Office.actions.associate("openArchive2023", openArchive2023);
  Office.actions.associate("openArchive2024", openArchive2024);
  Office.actions.associate("openModop", openModop);
  Office.actions.associate("openAbout", openAbout);
}
