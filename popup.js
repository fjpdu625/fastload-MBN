document.addEventListener('DOMContentLoaded', function () {
  const enregistrerButton = document.getElementById('enregistrerButton');
  const nomEtablissementInput = document.getElementById('NEI_rectangle');

  // Écoute les clics sur le bouton "Enregistrer"
  enregistrerButton.addEventListener('click', function () {
    const nomEtablissement = nomEtablissementInput.value;

    // Sauvegarde le nom de l'établissement dans le stockage local
    chrome.storage.local.set({ nomEtablissement: nomEtablissement }, function () {
      if (!nomEtablissement.trim() || chrome.runtime.lastError) {
        // Affiche le message d'erreur
        enregistrerButton.textContent = 'Enregistrement échoué !';
        enregistrerButton.classList.add('active');
        setTimeout(function () {
          enregistrerButton.classList.remove('active');
        }, 300);
        return; // Arrête l'exécution de la fonction
      }

      // Affiche le message de réussite
      enregistrerButton.textContent = 'Enregistrement réussi !';
      enregistrerButton.classList.add('active');
      console.log(nomEtablissement); // Affiche le nom de l'établissement dans la console
      setTimeout(function () {
        enregistrerButton.classList.remove('active');
      }, 300);
    });
  });
});

// Définit une fonction nommée "saved" qui récupère et affiche le dernier nom enregistré
chrome.storage.local.get('nomEtablissement', function(data) {
  console.log("Contenu de nomEtablissement dans popup.js:", data.nomEtablissement);
});
function saved() {
  chrome.storage.local.get('nomEtablissement', function(data) {
    console.log(data.nomEtablissement);
  });
}

// Associe la fonction "saved" à l'objet "window" pour la rendre accessible dans la console
window.saved = saved;





// Récupère l'état actuel du script dans le stockage local
chrome.storage.local.get('scriptEnabled', function(data) {
    const isScriptEnabled = data.scriptEnabled ?? true;
    const toggleScriptButton = document.getElementById('toggleScript');
  
    // Applique la classe CSS appropriée en fonction de l'état du script
    if (isScriptEnabled) {
      toggleScriptButton.classList.remove('disabled');
      toggleScriptButton.classList.add('enabled');
      toggleScriptButton.textContent = 'Script activé';
    } else {
      toggleScriptButton.classList.remove('enabled');
      toggleScriptButton.classList.add('disabled');
      toggleScriptButton.textContent = 'Script désactivé';
    }
  });
  
  // Ajoute un écouteur d'événements au bouton de basculement
  document.getElementById('toggleScript').addEventListener('click', function() {
    // Inverse l'état du script dans le stockage local
    chrome.storage.local.get('scriptEnabled', function(data) {
      const isScriptEnabled = !data.scriptEnabled;
      chrome.storage.local.set({ scriptEnabled: isScriptEnabled }, function() {
        const toggleScriptButton = document.getElementById('toggleScript');
  
        // Applique la classe CSS appropriée et met à jour le texte du bouton
        if (isScriptEnabled) {
          toggleScriptButton.classList.remove('disabled');
          toggleScriptButton.classList.add('enabled');
          toggleScriptButton.textContent = 'Script activé';
        } else {
          toggleScriptButton.classList.remove('enabled');
          toggleScriptButton.classList.add('disabled');
          toggleScriptButton.textContent = 'Script désactivé';
        }
      });
    });
  });
  