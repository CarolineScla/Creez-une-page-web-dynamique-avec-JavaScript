/** Gère l'affichage de la page d'accueil **/

fetch("http://localhost:5678/api/works")
  .then(response => {
    if (response.ok) return response.json();
  })
  .then((data) => { /* affichage des projets avec le create element sur le dom */ 
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
  });
