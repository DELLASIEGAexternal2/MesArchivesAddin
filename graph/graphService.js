export async function getMessagesByYear(year){

  const token = await OfficeRuntime.auth.getAccessToken();

  const start = `${year}-01-01T00:00:00Z`;
  const end = `${year}-12-31T23:59:59Z`;

  const url =
  "https://graph.microsoft.com/v1.0/me/messages?$filter=receivedDateTime ge " +
  start +
  " and receivedDateTime le " +
  end +
  "&$top=20";

  const response = await fetch(url,{
    headers:{
      Authorization:"Bearer " + token
    }
  });

  const data = await response.json();

  return data.value;

}
