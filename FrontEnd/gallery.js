// Récupération des pièces depuis le fichier JS
async function loadGallery() {
    const response = await fetch('gallery.js');
    const gallery = await response.json();
    return gallery;
  }
  
  // Utilisation de la fonction loadGallery:
  loadGallery().then((gallery) => {
    const sectionProjets = document.querySelector(".portfolio");
  
    function displayProjects(projects) {
        const gallery = document.querySelector(".portfolio");
        gallery.innerHTML = "";
      
        projects.forEach((project) => {
          const figure = document.createElement("figure");
          const img = document.createElement("img");
          const figcaption = document.createElement("figcaption");
      
          img.src = `./assets/images/${project.imageUrl}`;
          img.alt = project.title;
          figcaption.textContent = project.title;
      
          figure.appendChild(img);
          figure.appendChild(figcaption);
      
          gallery.appendChild(figure);
        });
      }
      
  })
  .catch((error) => {
    console.log("Une erreur est survenue!", error);
  });
  