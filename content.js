// Fonction pour exécuter le code lorsque la page est entièrement chargée
function executeOnPageLoad(callback) {
  if (document.readyState === 'complete') {
    callback();
  } else {
    window.addEventListener('load', callback);
  }
}

// Exécute le code correspondant à chaque page lorsque la page est entièrement chargée
executeOnPageLoad(function () {
  // Vérifie si vous êtes sur la première page
  if (document.querySelector('a.fo-connect__link') && /^https:\/\/www\.monbureaunumerique\.fr\//.test(window.location.href)) {
    chrome.storage.local.get('scriptEnabled', function (data) {
      const isScriptEnabled = data.scriptEnabled ?? true;

      if (isScriptEnabled) {
        // Appuie automatiquement sur le bouton "Se connecter" sur la page d'accueil
        setTimeout(() => {
          document.querySelector('a.fo-connect__link').click();
        }, 500); // Délai de 1/2 secondes
      }
    });
  }
});
// Vérifie si vous êtes sur la deuxième page
if (/^https:\/\/cas\.monbureaunumerique\.fr\//.test(window.location.href)) {
  chrome.storage.local.get('scriptEnabled', function (data) {
    const isScriptEnabled = data.scriptEnabled ?? true;

    if (isScriptEnabled) {
      // Simule le clic sur le bouton "Elève ou parent de l'Education Nationale"
      setTimeout(() => {
        document.querySelector('label[for="idp-EDU"]').click();
      }, 500); // Délai de 1/2 secondes

      // Simule le clic sur le bouton "Valider"
      setTimeout(() => {
        document.querySelector('#button-submit').click();
      }, 500); // Délai de 1/2 secondes
    }
  });
}

// Vérifie si vous êtes sur la troisième page
if (/^https:\/\/educonnect\.education\.gouv\.fr\/idp\/profile\/SAML2\/POST\/SSO\?execution=/.test(window.location.href)) {
  chrome.storage.local.get('scriptEnabled', function (data) {
    const isScriptEnabled = data.scriptEnabled ?? true;

    if (isScriptEnabled) {
      // Simule le clic sur le bouton "Élève"
      setTimeout(() => {
        document.querySelector('#bouton_eleve').click();
      }, 500); // Délai de 1/2 secondes
    }
  });
}

// Vérifie si vous êtes sur la quatrième page
if (window.location.href === 'https://www.monbureaunumerique.fr/' && !document.querySelector('a.fo-connect__link')  || /^https:\/\/www\.monbureaunumerique\.fr\/sg\.do\?PROC=PAGE_ACCUEIL&ACTION=VALIDER/.test(window.location.href)) {
  // Récupère le nom de l'établissement depuis le stockage local
  chrome.storage.local.get('scriptEnabled', function (data) {
    const isScriptEnabled = data.scriptEnabled ?? true;

    // Simule le clic sur le bouton "MBN"
    setTimeout(() => {
      document.querySelector('.btn--inverted.dropdown__toggle.js-dropdown__toggle').click();
    }, 500); // Délai de 1/2 secondes

    if (isScriptEnabled) {
      chrome.storage.local.get('nomEtablissement', function (data) {
        const nomEtablissement = data.nomEtablissement;
        console.log("Contenu de nomEtablissement dans content.js:", data.nomEtablissement);



        // Utilisation de XPath pour trouver l'élément contenant le texte spécifié
        const xpathExpression = `//a[contains(text(), '${nomEtablissement}')]`;
        const result = document.evaluate(xpathExpression, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
        const element = result.singleNodeValue;

        // Vérifie si l'élément est trouvé et effectue les actions nécessaires
        if (element) {
          element.click();
        } else {
          console.log("Élément avec le nom de l'établissement non trouvé.");
        }

      });
    }
  })
};