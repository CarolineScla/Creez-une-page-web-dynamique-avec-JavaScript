// Événement DOMContentLoaded pour exécuter le code lorsque le contenu est chargé
document.addEventListener('DOMContentLoaded', () => {
  // Vérifier si le token est présent dans le stockage de session
  if (sessionStorage.getItem("token") && sessionStorage.getItem("token") !== "undefined") {
      console.log("Token:", sessionStorage.getItem("token"));
    // Masquer l'élément login lorsque l'utilisateur est connecté
    const loginElement = document.querySelector('.login');
    loginElement.style.display = 'none';

    // Afficher les éléments liés à la connexion réussie
    const isLoggedInList = document.querySelectorAll('.modeEdition');
    isLoggedInList.forEach(inList => {
      inList.style.display = 'block';
    });
     // Appliquer display: flex à l'élément .projetsTitle
     const projetsTitleElement = document.querySelector('.projetsTitle');
     projetsTitleElement.style.display = 'flex';

  } else {
    // Cacher éléments de logout 
    const isLoggedOutList = document.querySelectorAll('.logout');
    isLoggedOutList.forEach(outList => {
      outList.style.display = 'none';
    });
  }


// Récupérer les projets
function getProjectModal() {
  // Effectuer une requête pour récupérer les projets depuis l'API
  fetch("http://localhost:5678/api/works")
    .then(function (response) {
      return response.json(); // Convertir la réponse en JSON
    })
    .then(function (projects) {
      // Une fois que les projets sont récupérés avec succès
      const modalGalerie = document.querySelector(".modalGalerie");
      modalGalerie.innerHTML = ''; // Réinitialiser le contenu de la galerie modale
      // Parcourir chaque projet récupéré
      projects.forEach(function (project) {
        modifierProjetsModal(project); // Appeler la fonction pour modifier la galerie modale avec chaque projet
      });
    });
}

// Fonction pour ouvrir et afficher la fenêtre modale 1
const openModal = function (e) {
  e.preventDefault();
  const target = document.getElementById('modal1');
  target.style.display = 'flex';
  target.setAttribute('aria-hidden', 'false');

  // Appel de la fonction pour ajouter les éléments à la fenêtre modale
  getProjectModal();
  modifierProjetsModal();
};

// Fonction pour ouvrir la fenêtre modale d'ajout de photo
const openAddModal = function (e) {
  e.preventDefault();// Empêche le rechargement -comportement par défaut du bouton 
  const addModal = document.getElementById('modal3');
  modal1.style.display = 'none';  // pour cacher modal1 
  addModal.style.display = 'flex';
  addModal.setAttribute('aria-hidden', 'false');

  // Bouton "retour"
  const retourButton = document.getElementById('retour');
  retourButton.addEventListener('click', function (e) {
    e.preventDefault();
    const modal1 = document.getElementById('modal1');
    const modal3 = document.getElementById('modal3');
    modal1.style.display = 'flex';
    modal3.style.display = 'none';
  });
  addProjectToModal();
};


function modifierProjetsModal(project) {
  const modalGalerie = document.querySelector(".modalGalerie");
  // Création des éléments pour afficher le projet
  const figure = document.createElement("figure"); // Crée un élément de type "figure" pour contenir les informations du projet
  figure.classList.add("figureModal"); // Ajoute la classe "figureModal" à la figure

  const img = document.createElement("img"); // Crée un élément "img" pour afficher l'image du projet
  if (project && project.imageUrl) {
    img.src = project.imageUrl;
    img.width = 100;
  } 

  const figcaption = document.createElement("figcaption"); // Crée un élément "figcaption" pour afficher le titre du projet
  figcaption.classList.add("figCaption"); // Ajoute la classe "figCaption" au figcaption
  figcaption.alt = project.title; // Définit le texte alternatif de l'image (utilisé pour l'accessibilité)
  figcaption.textContent = "éditer"; // Définit le texte "éditer" pour le figcaption

  const categoryId = document.createElement("p"); // Crée un élément "p" pour afficher l'ID de la catégorie du projet
  categoryId.src = project.categoryId; // Définit l'ID de la catégorie du projet (peut-être incorrect, car on utilise "src" pour un élément "p")

  const deleteWork = document.createElement("i"); // Crée un élément de type "i" (icône) pour représenter l'icône de suppression (poubelle)
  deleteWork.classList.add("deleteTrashIcon", "fa", "fa-solid", "fa-trash-can"); // Ajoute les classes nécessaires pour afficher l'icône
  deleteWork.dataset.id = project.id; // Stocke l'ID du projet en utilisant l'attribut "data-id"

  // Evénement pour la suppression
  deleteWork.addEventListener('click', function () {
    const token = sessionStorage.getItem("token"); // Récupère le token d'authentification depuis le sessionStorage
    if (!token) {
      console.error("Token non trouvé."); // Affiche une erreur si le token n'est pas trouvé
      return;
    }
    const id = deleteWork.dataset.id; // Récupère l'ID du projet à supprimer à partir de l'attribut "data-id" de l'icône
    const url = `http://localhost:5678/api/works/${id}`; // Construit l'URL pour l'API de suppression du projet

    fetch(url, {
      method: 'DELETE', // Utilise la méthode DELETE pour supprimer le projet
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`, // Inclut le token d'authentification dans les en-têtes de la requête
      },
    })
      .then(function (response) {
        if (response.ok) {
          figure.remove(); // Supprime l'élément de la galerie 
          console.log('Supprimé !'); // Affiche un message de confirmation dans la console
        } else {
          console.error('Erreur lors de la suppression'); // Affiche une erreur si la suppression échoue
        }
      })
      .catch(function (error) {
        console.error('Erreur lors de la suppression', error); // Affiche une erreur en cas d'erreur lors de la suppression
      });
  });

  // Ajoute les éléments créés à la figure
  figure.append(img, figcaption, categoryId, deleteWork);
  modalGalerie.append(figure); // Ajoute la figure à la galerie modale 1
}

function addProjectToModal() {
  const ajoutPhotoBtn = document.getElementById('ajoutPhotoBtn');
  const title = document.getElementById('titrePhoto').value;
  const selectCategorie = document.getElementById('categoryId');
  const category = selectCategorie.value;

// Événement pour mettre à jour l'image sélectionnée lorsqu'une image est choisie
ajoutPhotoBtn.addEventListener('change', function(e) {
  const file = e.target.files[0];
  const reader = new FileReader();

  reader.onload = function(event) {
    const selectedImage = document.getElementById('selectedImage');
    selectedImage.src = event.target.result;
    selectedImage.style.display = 'block';

    const ajoutPhotoIcon = document.getElementById('ajoutPhotoIcon');
    ajoutPhotoIcon.style.display = 'none';

    const ajoutPhotoLabel = document.getElementById('ajoutPhotoLabel');
    ajoutPhotoLabel.style.display = 'none';
    const type = document.getElementById('type');
    type.style.display = 'none';
    selectedImage.width = 500; // largeur de l'image affichée
  };
  if (file) {
    reader.readAsDataURL(file);
  }
});

  // Vérification des champs avant l'envoi de la requête
  const saveButton = document.querySelector('#saveButton');
  saveButton.addEventListener('click', function(e) {
    e.preventDefault(); 

    // Vérifier si tous les champs sont renseignés
    if (title.trim() === '' || category.trim() === '' || ajoutPhotoBtn.files.length === 0) {
      document.querySelector('#errorMessage').textContent = "Veuillez remplir tous les champs.";
      return;
    }
    // Créer un objet FormData pour envoyer les données du formulaire
    const formData = new FormData;
    formData.append('image', ajoutPhotoBtn.files[0]);
    formData.append('title', title);
    formData.append('category', category);

     // Envoi de la requête pour ajouter le projet
    fetch("http://localhost:5678/api/works", {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`, // Vérifie la présence du token 
      },
      body: formData, // Formulaire avec les éléments demandés par l'API 
    })
    .then(function(response) {
      if (response.ok) {  // Renvoie la réponse sous forme de JSON pour obtenir les données renvoyées par le serveur
        return response.json();
      } else { // Sinon message d'erreur 
        throw new Error("Erreur lors de l'ajout du projet");
      }
    })
    .then(function(data) { // La deuxième étape lorsque la première promesse (response.json()) est résolue avec succès
      console.log("Données du projet ajouté :", data);   
         })
         .catch(function(error) {
          console.error(error.message);
          document.querySelector('#errorMessage').textContent = error.message;
        });
  })
  // Pour changer la couleur de Valider lors de l'ajout d'une photo 
ajoutPhotoBtn.addEventListener('change', function() {
  // Vérifier si un fichier a été sélectionné
  if (ajoutPhotoBtn.files.length > 0) {
    // Appliquer la couleur de fond au bouton saveButton
    saveButton.style.backgroundColor = '#1D6154';
  } else {
    // Réinitialiser la couleur de fond du bouton saveButton
    saveButton.style.backgroundColor = '';
  }
});
}
// Événement pour sauvegarder l'ajout de la photo au clic sur le bouton "Valider"
const saveButton = document.querySelector('#saveButton');
saveButton.addEventListener('click', addProjectToModal);

// Fonction pour fermer les fenêtres avec le bouton
function closeModal() {
  const modal1 = document.getElementById('modal1');
  const modal3 = document.getElementById('modal3');

  modal1.style.display = 'none';
  modal3.style.display = 'none';
}

// Ajout du gestionnaire d'événement pour fermer la fenêtre modale
const closeModalButtons = document.querySelectorAll('.closeModal');
closeModalButtons.forEach(button => {
  button.addEventListener('click', closeModal);
});

// Fermeture de la modale au clic sur l'overlay pour la modale 1
const overlay = document.querySelector('.overlay');
overlay.addEventListener('click', closeModal);

// Événement pour ouvrir la fenêtre modale au clic sur le bouton "Modifier Projets"
const modifierProjetsElement = document.getElementById('modifierProjets');
modifierProjetsElement.addEventListener('click', openModal);

// Événement pour ouvrir la fenêtre modale d'ajout de photo au clic sur le bouton "Ajouter une photo"
const addPhotoButton = document.getElementById('ajoutImage');
addPhotoButton.addEventListener('click', openAddModal);
});