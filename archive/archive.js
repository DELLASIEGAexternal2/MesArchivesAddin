/*
Ce script affiche les emails
dans la popup archive.html
*/

import {getMessagesByYear} from "../graph/graphService.js";

async function loadArchive(){

/*
Récupère l'année passée
dans l'URL
*/

const params=new URLSearchParams(window.location.search);

const year=params.get("year");

/*
Appel Microsoft Graph
*/

const mails=await getMessagesByYear(year);

/*
Affichage des mails
*/

const container=document.getElementById("messages");

mails.forEach(mail=>{

const div=document.createElement("div");

div.innerHTML=`<b>${mail.subject}</b><br>${mail.receivedDateTime}`;

container.appendChild(div);

});

}

/*
Initialisation Office
*/

Office.onReady(loadArchive);
