const msalInstance = new msal.PublicClientApplication({
  auth: {
    clientId: "e92a8324-40d8-4ce5-876d-99df6b07acf9",
    authority: "https://login.microsoftonline.com/common",
    redirectUri: window.location.origin
  }
});

async function getToken() {
  try {
    const r = await msalInstance.acquireTokenSilent({
      scopes: ["Mail.Read", "Files.ReadWrite"]
    });
    return r.accessToken;
  } catch {
    const r = await msalInstance.loginPopup({
      scopes: ["Mail.Read", "Files.ReadWrite"]
    });
    return r.accessToken;
  }
}
