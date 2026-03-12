/* global Office */

/*
Ce fichier contient les actions
associées aux boutons du ruban Outlook
*/

Office.onReady(() => {});

/*
Fonction générique qui ouvre une popup
dans Outlook.
La popup affiche l'interface HTML
hébergée sur GitHub Pages.
*/

function openDialog(url){

Office.context.ui.displayDialogAsync(
url,
{height:60,width:40},
function(result){

if(result.status !== Office.AsyncResultStatus.Succeeded){

console.error(result.error.message);

}

});

}

/*
Ouverture des archives 2021
*/

function openArchive2021(event){

openDialog("https://dellasiegaexternal2.github.io/MesArchivesAddin/archive/archive.html?year=2021");

event.completed();

}

/*
Ouverture des archives 2022
*/

function openArchive2022(event){

openDialog("https://dellasiegaexternal2.github.io/MesArchivesAddin/archive/archive.html?year=2022");

event.completed();

}

/*
Ouverture des archives 2023
*/

function openArchive2023(event){

openDialog("https://dellasiegaexternal2.github.io/MesArchivesAddin/archive/archive.html?year=2023");

event.completed();

}

/*
Ouverture des archives 2024
*/

function openArchive2024(event){

openDialog("https://dellasiegaexternal2.github.io/MesArchivesAddin/archive/archive.html?year=2024");

event.completed();

}

/*
Ouverture du mode opératoire
*/

function openModop(event){

openDialog("https://dellasiegaexternal2.github.io/MesArchivesAddin/ModOp_Mes_ARCHIVES.pdf");

event.completed();

}

/*
Fenêtre d'information sur l'add-in
*/

function openAbout(event){

openDialog("https://dellasiegaexternal2.github.io/MesArchivesAddin/popup/about.html");

event.completed();

}

/*
Expose les fonctions au manifest
*/

window.openArchive2021=openArchive2021;
window.openArchive2022=openArchive2022;
window.openArchive2023=openArchive2023;
window.openArchive2024=openArchive2024;
window.openModop=openModop;
window.openAbout=openAbout;
