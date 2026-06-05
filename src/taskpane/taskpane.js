Office.onReady(() => {

console.log("Mes Archives chargé");

});

function openArchive(year){

alert("Ouverture archives " + year);

}

function modop(){

window.open("https://dellasiegaexternal2.github.io/MesArchivesAddin/ModOp_Mes_ARCHIVES.pdf");

}

function about(){

alert("Mes Archives v1");

}

// === AJOUT POUR AGENT LOCAL BdF ===
// Appelle cette fonction dans le onclick du bouton Archives 2023
async function restoreArchiveLocal(year) {
    try {
        // 1. UI : passe le bouton en "chargement"
        updateArchiveButtonState(year, 'loading');

        // 2. Récupère l'UPN et le token SSO
        const upn = Office.context.mailbox.userProfile.emailAddress;
        const ssoToken = await Office.auth.getAccessToken({ allowSignInPrompt: true });

        // 3. Appelle l'agent local sur le poste BdF
        const response = await fetch('https://localhost:5002/restore', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + ssoToken
            },
            body: JSON.stringify({
                annee: year,
                upn: upn
            })
        });

        if (!response.ok) {
            throw new Error('Agent local erreur: ' + response.status);
        }

        // 4. Récupère le nouveau statut depuis l'agent
        await refreshArchiveStatus();

    } catch (error) {
        console.error('Erreur restoreArchiveLocal:', error);
        updateArchiveButtonState(year, 'error'); // Icône rouge archive-cancelled.svg
        showNotification("Erreur", "L'agent local MesArchives n'a pas pu monter l'archive. Vérifiez qu'il est démarré.");
    }
}

// Met à jour tous les boutons selon le fichier XML lu par l'agent
async function refreshArchiveStatus() {
    try {
        const response = await fetch('https://localhost:5002/status');
        const statuses = await response.json(); // Ex: { "2021": "null", "2022": "null", "2023": "montee" }

        for (const year in statuses) {
            updateArchiveButtonState(year, statuses[year]);
        }
    } catch (error) {
        console.error('Impossible de joindre l agent local:', error);
    }
}

// Gère les 4 états : montee, null, annulee_*, error, loading
function updateArchiveButtonState(year, status) {
    const btn = document.getElementById('btn-archive-' + year);
    if (!btn) return;

    btn.classList.remove('montee', 'disponible', 'annulee', 'error', 'loading');

    if (status === 'montee') {
        btn.classList.add('montee'); // CSS affichera archive-installed.svg
        btn.disabled = true;
        btn.title = 'Archive ' + year + ' installée';
    } else if (status === 'loading') {
        btn.classList.add('loading');
        btn.disabled = true;
        btn.title = 'Installation en cours...';
    } else if (status.startsWith('annulee') || status === 'error') {
        btn.classList.add('annulee'); // CSS affichera archive-cancelled.svg
        btn.disabled = false;
        btn.title = 'Erreur lors de l installation';
    } else { // null ou Disponible
        btn.classList.add('disponible'); // CSS affichera archive-available.svg
        btn.disabled = false;
        btn.title = 'Cliquer pour installer l archive ' + year;
    }
}

// A appeler dans Office.onReady
function initArchives() {
    refreshArchiveStatus(); // Charge les états au démarrage
}
// === FIN AJOUT ===
