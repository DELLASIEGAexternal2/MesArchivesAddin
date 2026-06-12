// 1. INITIALISATION OBLIGATOIRE : dit à Office que le code est prêt
Office.onReady(() => {});

/**
 * Fonction principale appelée par les boutons Archives 2021, 2022, etc.
 * @param {number} year - L'année de l'archive à monter, ex: 2021
 * @param {Office.AddinCommands.Event} event - Objet Outlook à terminer avec event.completed()
 */
async function callLocalAgent(year, event) {
  try {
    // 2. AFFICHE UNE NOTIF IMMÉDIATE : sinon l'utilisateur croit que rien ne se passe
    Office.addin.showNotification("MesArchives", `Connexion à l'agent pour ${year}...`);

    // 3. RÉCUPÈRE L'EMAIL + TOKEN SSO : prouve à ton API que c'est bien l'utilisateur Outlook
    const upn = Office.context.mailbox.userProfile.emailAddress;
    const token = await Office.auth.getAccessToken({ allowSignInPrompt: true }); // 13003 si phase 5 pas faite

    // 4. APPELLE TON SERVICE .NET LOCAL
    const response = await fetch(`https://localhost:5002/api/restore/${year}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token // Le token SSO part ici
      },
      body: JSON.stringify({ annee: year, upn: upn })
    });

    // 5. TRAITE LA RÉPONSE DE TON API
    if (response.ok) {
      const result = await response.json();
      Office.addin.showNotification("MesArchives", `Succès : ${result.message || `Archive ${year} montée`}`);
    } else {
      const errorText = await response.text();
      Office.addin.showNotification("Erreur API", `${year} : ${response.status} - ${errorText}`);
    }

  } catch (error) {
    // 6. GESTION D'ERREUR DÉTAILLÉE
    console.error(error);
    let msg = "Erreur inconnue";
    if (error.code === 13003) {
      msg = "SSO non configuré. Vérifie WebApplicationInfo dans le manifest."; // Erreur phase 5
    } else if (error.message.includes("Failed to fetch")) {
      msg = "Agent local non démarré sur https://localhost:5002";
    } else {
      msg = error.message;
    }
    Office.addin.showNotification("Erreur MesArchives", `Échec ${year}: ${msg}`);

  } finally {
    // 7. OBLIGATOIRE : dit à Outlook "j'ai fini". Sinon le bouton reste grisé.
    event.completed();
  }
}

// 8. FONCTIONS WRAPPER : Noms EXACTS de <FunctionName> dans ton manifest.xml
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

// 9. ASSOCIATION OBLIGATOIRE : lie le nom du manifest à la fonction JS
if (typeof Office !== 'undefined') {
  Office.actions.associate("openArchive2021", openArchive2021);
  Office.actions.associate("openArchive2022", openArchive2022);
  Office.actions.associate("openArchive2023", openArchive2023);
  Office.actions.associate("openArchive2024", openArchive2024);
  Office.actions.associate("openModop", openModop);
  Office.actions.associate("openAbout", openAbout);
}

// 10. ICÔNE DYNAMIQUE : pour la phase 7, à brancher plus tard
async function getArchiveIcon(year) {
  try {
    const res = await fetch('https://localhost:5002/api/status');
    const status = await res.json();
    // status.pst2021 = "mounted" | "unmounted" | "error"
    // Tu retourneras une icône différente selon le statut
  } catch (e) {
    console.error("Status API HS");
  }
}
