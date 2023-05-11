/** Gère l'affichage de la page d'accueil **/

"use strict"; // pour limiter les erreurs dans le code 

/**
fetch("http://localhost:5678/api/works")
  .then(response => {
    if (response.ok) return response.json();
  })
  .then((data) => { /* affichage des projets avec le create element sur le dom
    listProjet = data;
    displayProjects(listProjet);
    displayEdit();

    data.forEach((work) => {
      const figure = document.createElement("figure");
      const img = document.createElement("img");
      const figcaption = document.createElement("figcaption");

      img.src = work.imageUrl;
      img.alt = work.title;
      figcaption.textContent = work.title;

      figure.appendChild(img);
      figure.appendChild(figcaption);

      gallery.appendChild(figure);
    });
  })
  .catch((error) => {
    alert("Une erreur est survenue! Veuillez contacter l'administrateur!");
  }); */ 

  fetch("http://localhost:5678/api-docs/#/")
  .then( data => data.json())
  .then( jsonListProjets => {
    for(le jsonProjets orof jsonListProjets){
      let projets = new 
    )
  });

