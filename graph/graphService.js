/*
Service qui interroge Microsoft Graph
pour récupérer les emails Outlook
*/

export async function getMessagesByYear(year){

/*
Obtention d'un token OAuth
via le mécanisme SSO Outlook
*/

const token = await OfficeRuntime.auth.getAccessToken({
allowSignInPrompt:true,
allowConsentPrompt:true
});

/*
Construction des dates de filtre
*/

const start=`${year}-01-01T00:00:00Z`;
const end=`${year}-12-31T23:59:59Z`;

/*
Requête Graph filtrée par date
*/

const url=`https://graph.microsoft.com/v1.0/me/messages?$filter=receivedDateTime ge ${start} and receivedDateTime le ${end}&$top=20`;

const response = await fetch(url,{
headers:{
Authorization:`Bearer ${token}`
}
});

const data = await response.json();

/*
Retourne la liste des mails
*/

return data.value;

}
