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

// Icône dynamique : jaune = dispo, vert = montée, rouge = erreur
async function getArchiveIcon(year) {
  try {
    const res = await fetch('https://localhost:5002/status');
    const status = await res.json();
    const state = status[year]; // "null" | "montee" | "erreur"

    const baseUrl = "https://dellasiegaexternal2.github.io/MesArchivesAddin/assets/archive-icons-svg/";
    if (state === "montee") return baseUrl + "archive--installed.svg"; // vert
    if (state === "erreur") return baseUrl + "archive--cancelled.svg"; // rouge
    return baseUrl + "archive--available.svg"; // jaune par défaut
  } catch (e) {
    return "https://dellasiegaexternal2.github.io/MesArchivesAddin/assets/icon-32.png"; // gris si agent down
  }
}

// Outlook appelle ça pour chaque bouton
function getIcon2021() { return getArchiveIcon(2021); }
function getIcon2022() { return getArchiveIcon(2022); }
function getIcon2023() { return getArchiveIcon(2023); }
function getIcon2024() { return getArchiveIcon(2024); }

// Déclare à Office
if (typeof Office!== 'undefined') {
  Office.actions.associate("getIcon2021", getIcon2021);
  Office.actions.associate("getIcon2022", getIcon2022);
  Office.actions.associate("getIcon2023", getIcon2023);
  Office.actions.associate("getIcon2024", getIcon2024);
}

function restoreArchive2021(event){
  restoreArchiveLocal("2021", event);
}
async function restoreArchiveLocal(year, event){
  try{
    Office.addin.showNotification("MesArchives",`Lancement restauration ${year}... `);
//Récupère le token SSO de l'utilisateur Outlook
    const accessToken = await Office.auth.getAccessToken({allowSignInPrompt: true});
    //2. Appel le service.NET Local avec le Token
    const response = await fetch(`https://localhost:5002/api/restore/${year}`,{
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type':'application/json'
      }
    });

    if(!response.ok) throw new error(`HTTP ${response.status}`);

    const result = await response.json();
    Office.addinshowNotification("MesArchives", `${year} restauré : ${result.message}`);

  }catch (error){
    Office.addin.showNotification("Erreur", `Echec ${year} : ${result.message}`);
  }finally{
    event.completed();//Obligatoire sinon Outlook Freeze en Glitch
  }
}
//Attention toujours mapper les fonct° pour chaque bouton
Office.actions.associate("restoreArchive2021", restoreArchive2021);
Office.actions.associate("restoreArchive2022", (e) => restoreArchiveLocal("2022", e));
Office.actions.associate("restoreArchive2023", (e) => restoreArchiveLocal("2023", e));
Office.actions.associate("restoreArchive2024", (e) => restoreArchivelocal("2024", e));
    














    
    
