/* global Office */

Office.onReady(() => {});

/* fonction générique popup */
function openDialog(url) {

  Office.context.ui.displayDialogAsync(
    url,
    { height: 60, width: 40 },
    function (result) {
      if (result.status !== Office.AsyncResultStatus.Succeeded) {
        console.error(result.error.message);
      }
    }
  );

}

/* boutons années */

export function openArchive2021(event) {

  openDialog("https://dellasiegaexternal2.github.io/MesArchivesAddin/archive/archive.html?year=2021");
  event.completed();

}

export function openArchive2022(event) {

  openDialog("https://dellasiegaexternal2.github.io/MesArchivesAddin/archive/archive.html?year=2022");
  event.completed();

}

export function openArchive2023(event) {

  openDialog("https://dellasiegaexternal2.github.io/MesArchivesAddin/archive/archive.html?year=2023");
  event.completed();

}

export function openArchive2024(event) {

  openDialog("https://dellasiegaexternal2.github.io/MesArchivesAddin/archive/archive.html?year=2024");
  event.completed();

}

/* bouton mode opératoire */

export function openModop(event) {

  openDialog("https://dellasiegaexternal2.github.io/MesArchivesAddin/ModOp_Mes_ARCHIVES.pdf");
  event.completed();

}

/* bouton à propos */

export function openAbout(event) {

  openDialog("https://dellasiegaexternal2.github.io/MesArchivesAddin/popup/about.html");
  event.completed();

}
