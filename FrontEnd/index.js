/** Gère l'affichage de la page d'accueil **/
function ajouterGalerie(){
fetch("http://localhost:5678/api/works")
  .then((res) => res.json())
  .then((data) => {
    const gallery = document.querySelector(".gallery");

    data.forEach((element) => {
      console.log(element);

      const figure = document.createElement("figure");
      const img = document.createElement("img");
      const figcaption = document.createElement("figcaption");

      img.src = element.imageUrl;
      img.alt = element.title;
      img.setAttribute('category', element.categoryId); // Ajouter l'attribut category

      figcaption.textContent = element.title;

      figure.appendChild(img);
      figure.appendChild(figcaption);
      gallery.appendChild(figure);
    });

    boutonsFilres(); // Fonction pour afficher les boutons de catégorie
  })
  .catch((error) => console.error(error));

}
ajouterGalerie(); // Appel de la fonction
/** Partie projets et filtres **/ 

function recupererCategories() {
  return fetch('http://localhost:5678/api/categories')
    .then(response => response.json());
}

// Effectue les catégories
function traitementCategories(categories) {
  const divPortfolio = document.getElementById('portfolio');
  const divBoutons = document.createElement('div');
  divBoutons.className = 'categories';

  const btnAll = document.createElement('button');
  btnAll.textContent = 'Tous';
  divBoutons.appendChild(btnAll);

  // Créer les boutons de catégorieslogout
  categories.forEach(categorie => {
    const button = document.createElement('button');
    button.textContent = categorie.name;
    button.id = categorie.id;
    divBoutons.appendChild(button);
  });

  // Vérifier si l'utilisateur est connecté
const token = sessionStorage.getItem('token');
const utilisateurConnecte = token !== null && token !== ''; // vérifie si présence d'un token 

// Afficher ou cacher les divBoutons en fonction de l'état de connexion de l'utilisateur
if (utilisateurConnecte) {
  divBoutons.style.display = 'none';
} else {
  divPortfolio.querySelector('h2').insertAdjacentElement('afterend', divBoutons);
}

  // Evénement au clic sur les boutons
  divBoutons.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', function () {
      const id = this.id;
      document.querySelectorAll('.gallery img').forEach(image => {
        if (image.getAttribute('category') === id) {
          // Si l'image a la catégorie correspondante, l'afficher
          image.parentElement.style.display = 'block';
        } else {
          // Sinon, masquer l'image
          image.parentElement.style.display = 'none';
        }
      });
    });
  });

  // Pour le bouton Tous - réinitialise l'affichage 
  btnAll.addEventListener('click', function () {
      // Sélectionner toutes les images de la galerie
    document.querySelectorAll('.gallery img').forEach(image => {
      // Pour pour tous les afficher selon leur mise en page initiale avec Block
      image.parentElement.style.display = 'block';
    });
  });
};

//Pour récupérer et traiter les catégories avec boutons
function boutonsFilres() {
  recupererCategories().then(categories => {
    // Après, exécuter le retour avec les catégories récupérées
  traitementCategories(categories);
  });
}


// Fonction de déconnexion
function logout() {
  // Supprimer le token du stockage de session
  sessionStorage.removeItem('token');
  // Redirection vers la page de connexion
  window.location.href = 'index.html';
}

// Gestionnaire d'événement pour le bouton de déconnexion
const logoutButton = document.getElementById('logout');
logoutButton.addEventListener('click', logout);



