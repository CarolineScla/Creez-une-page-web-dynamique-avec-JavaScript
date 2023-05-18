/** Gère l'affichage de la page d'accueil **/
fetch("http://localhost:5678/api/works")
  .then((res) => res.json())
  .then((data) => {
    data.forEach((element) => {
      console.log(element);
      
      const figure = document.createElement("figure");
      const img = document.createElement("img");
      const figcaption = document.createElement("figcaption");

      img.src = element.imageUrl;
      img.alt = element.title;
      figcaption.textContent = element.title;

      figure.appendChild(img);
      figure.appendChild(figcaption);
      portfolio.appendChild(figure);
    });
  })
  .catch((error) => console.error(error));



