
async function getUser(){

const token = await OfficeRuntime.auth.getAccessToken();

const response = await fetch(

"https://graph.microsoft.com/v1.0/me",

{

headers:{

"Authorization":"Bearer " + token

}

});

return await response.json();

}
