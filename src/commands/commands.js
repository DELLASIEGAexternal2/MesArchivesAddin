Office.onReady(() => {});

async function callRestore(year, event) {
    try {
        const token = await Office.auth.getAccessToken({ 
            allowSignInPrompt: true, 
            allowConsentPrompt: true 
        });
        
        const response = await fetch(`https://localhost:5002/api/restore/${year}`, {
            method: 'POST',
            headers: { 
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            const data = await response.json();
            console.log(data.message);
            // Notification native Outlook
            event.completed({ allowEvent: true });
        } else {
            console.error(`Erreur ${response.status}`);
            event.completed({ allowEvent: false });
        }
    } catch (error) {
        console.error('SSO Error:', error);
        event.completed({ allowEvent: false });
    }
}

function openArchive2021(event) { callRestore('2021', event); }
function openArchive2022(event) { callRestore('2022', event); }
function openArchive2023(event) { callRestore('2023', event); }
function openArchive2024(event) { callRestore('2024', event); }
function openModop(event) {
    window.open('https://dellasiegaexternal2.github.io/MesArchivesAddin/ModOp_Mes_ARCHIVES.pdf', '_blank');
    event.completed({ allowEvent: true });
}

// Obligatoire : Office associe les noms de fonctions
Office.actions.associate("openArchive2021", openArchive2021);
Office.actions.associate("openArchive2022", openArchive2022);
Office.actions.associate("openArchive2023", openArchive2023);
Office.actions.associate("openArchive2024", openArchive2024);
Office.actions.associate("openModop", openModop);