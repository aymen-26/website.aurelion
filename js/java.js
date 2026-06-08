fetch("./js/data.json")
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById("rejilla-destacados");

    container.innerHTML = "";

    data.secciones.forEach(item => {
      const card = document.createElement("div");
      card.className = "tarjeta-destacado";

      card.innerHTML = `
        <img class="tarjeta-destacado-imagen" src="${item.imagen}" alt="${item.titulo}">

        <div class="tarjeta-destacado-contenido">
          <div class="tarjeta-destacado-titulo">${item.titulo}</div>

          <div class="tarjeta-destacado-descripcion">
            ${item.descripcion}
          </div>

          <a href="#" class="tarjeta-destacado-boton">
            ${item.cta}
          </a>
        </div>
      `;

      container.appendChild(card);
    });
  })
  .catch(err => {
    console.error("Error al cargar JSON:", err);
  });












  
const video = document.querySelector(".mel");

const section = document.querySelector(".section3");

window.addEventListener("scroll", () => {
  const rect = section.getBoundingClientRect();
  const windowHeight = window.innerHeight;


  let progress = 1 - rect.top / windowHeight;

  progress = Math.max(0, Math.min(progress, 1));


  const width = 85 + progress * 15;

  video.style.width = `${width}vw`;
});




function scrollImage(sectionSelector, imageSelector) {
  const section = document.querySelector(sectionSelector);
  const image = document.querySelector(imageSelector);

  if (!section || !image) return;

  window.addEventListener("scroll", () => {
    const rect = section.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    let progress = 1 - rect.top / windowHeight;

    progress = Math.max(0, Math.min(progress, 1));

    image.style.width = `${85 + progress * 15}vw`;
  });
}
scrollImage("#section8", ".mel-1");
scrollImage("#section7", ".mel-2");
scrollImage("#section10", ".mel-3");






const circle = document.querySelector(".circle");
const container = document.querySelector(".felS");

circle.addEventListener("click", () => {
  container.classList.toggle("active");
});




function goToPart2() {
  document.getElementById("part1").style.display = "none";
  document.getElementById("part2").style.display = "flex";

  document.querySelector(".bolor").scrollTop = 0;
}

























































