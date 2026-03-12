
export async function getAccessToken() {

return await OfficeRuntime.auth.getAccessToken({
allowSignInPrompt: true,
allowConsentPrompt: true
});

}
