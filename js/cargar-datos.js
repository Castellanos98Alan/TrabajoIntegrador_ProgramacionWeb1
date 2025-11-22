import items from "../data/items.json" with { type: 'json' };
import configuracion from "../config/configuracion.json" with { type: 'json' };

const tabCategoria1 = document.getElementById("tab-categoria-1");

let linksCategorias = document.querySelectorAll("a.tab-categoria");

linksCategorias.forEach((linkCategoria) => {
   linkCategoria.addEventListener("click", () => {
      items.forEach((item) => {
         const { Categoria, Id, Nombre, Autor, Portada, Descripcion, Rating } = item;

         if (linkCategoria.innerText != Categoria) return;
         const articuloContenedor = document.querySelector("article." + Id.split("-")[1]);

         articuloContenedor.getElementsByClassName("item-valor-nombre")[0].innerText = Nombre;
         articuloContenedor.getElementsByClassName("item-valor-autor")[0].innerText = Autor;
         articuloContenedor.getElementsByClassName("item-valor-portada")[0].src = Portada;
         articuloContenedor.getElementsByClassName("item-valor-portada")[0].alt = Nombre;
         articuloContenedor.getElementsByClassName("item-valor-descripcion")[0].innerText = Descripcion;
         articuloContenedor.getElementsByClassName("item-valor-rating")[0].innerText = Rating;

         const personalizados = Object.keys(item).filter(key => key.startsWith("personalizado_"));
         
         personalizados.forEach((personalizado, index) => {
            articuloContenedor.getElementsByClassName(`item-campo-personalizado_${index + 1}`)[0].innerText = personalizado.split(".")[1];
            articuloContenedor.getElementsByClassName(`item-valor-personalizado_${index + 1}`)[0].innerText = item[personalizado];
         });

         articuloContenedor.id = Id;
      });
   });
});

if (configuracion["modo-test-prod"] === "prod") {
   tabCategoria1.click();
};



//  ---- BUSCADOR ----
const buscador = document.querySelector('#encabezado-principal-buscador input[type="search"]');
const articulos = document.querySelectorAll('.articulo-categoria');

if (buscador) {
  buscador.addEventListener('input', () => {
    const texto = buscador.value.toLowerCase().trim();

    // Si hay menos de 3 caracteres, mostrar todos los ítems
    if (texto.length < 3) {
      articulos.forEach(a => a.style.display = 'block');
      return;
    }

    // Si hay 3 o más caracteres, filtrar
    articulos.forEach(a => {
      const nombre = a.querySelector('.item-valor-nombre')?.textContent.toLowerCase() || '';
      const autor = a.querySelector('.item-valor-autor')?.textContent.toLowerCase() || '';
      const descripcion = a.querySelector('.item-valor-descripcion')?.textContent.toLowerCase() || '';

      // Mostrar solo los artículos que contengan el texto
      if (nombre.includes(texto) || autor.includes(texto) || descripcion.includes(texto)) {
        a.style.display = 'block';
      } else {
        a.style.display = 'none';
      }
    });
  });
}


document.querySelectorAll('.item-valor-rating').forEach(el => {
    // Obtiene el texto completo, ej: "Rating ITEM 3"
    const texto = el.textContent.trim();

    // Busca el último número en la línea (1–5)
    const match = texto.match(/(\d)$/);
    if (!match) return;

    const rating = parseInt(match[1]);

    // Genera los mandos 🎮
    let mandos = "";
    for (let i = 0; i < rating; i++) {
        mandos += "🎮";
    }

    // Reemplaza el número por los mandos
    el.innerHTML = texto.replace(/\d$/, mandos);
});

const categoriaSurvival = document.getElementById("tab-categoria-2");
const categoriaShooter = document.getElementById("tab-categoria-3");

const categoria = document.querySelectorAll(".tab-categoria");


const tabs = document.querySelectorAll(".tab-categoria");

   tabs.forEach((tab, index) => {
      tab.addEventListener("click", e => {
         e.preventDefault();

         // Quita las clases de hover anteriores
           articulos.forEach(a => {
           a.classList.remove("categoria2", "categoria3","categoria4","categoria5");
         });

         // Según la categoría seleccionada aplica un estilo nuevo
         if (index === 1) {  // Survival
            articulos.forEach(a => a.classList.add("categoria2"));
         }
         if (index === 2) {  // Shooter
            articulos.forEach(a => a.classList.add("categoria3"));
         }
         if (index === 3) {  // Plataforma
            articulos.forEach(a => a.classList.add("categoria4"));
         }
         if (index === 4) {  // Deporte
            articulos.forEach(a => a.classList.add("categoria5"));
         }
      });
   });




