const STORAGE_KEY = "juegosFavoritosPorCategoria";

function obtenerFavoritos() {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : {};   // { categoria: [ids...] }
}

function guardarFavoritos(favoritos) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(favoritos));
}

// 🔹 Pinta las estrellas según lo guardado en localStorage
function aplicarFavoritos() {
  const favoritos = obtenerFavoritos();
  const estrellas = document.querySelectorAll(".estrella-favorito");

  estrellas.forEach(estrella => {
    const id = estrella.dataset.id;
    const article = estrella.closest("article");
    const categoria = article?.dataset.categoria || "sin-categoria";

    const listaCat = favoritos[categoria] || [];

    if (listaCat.includes(id)) {
      estrella.classList.add("favorito", "fa-solid");
      estrella.classList.remove("fa-regular");
    } else {
      estrella.classList.remove("favorito", "fa-solid");
      estrella.classList.add("fa-regular");
    }
  });
}

// 🔹 Modo “solo favoritos”
function mostrarSoloFavoritos() {
  const favoritos = obtenerFavoritos();
  const articulos = document.querySelectorAll(".articulo-categoria");

  articulos.forEach(art => {
    const categoria = art.dataset.categoria;
    const estrella = art.querySelector(".estrella-favorito");

    if (!categoria || !estrella) {
      art.style.display = "none";
      return;
    }

    const id = estrella.dataset.id;
    const listaCat = favoritos[categoria] || [];

    if (listaCat.includes(id)) {
      art.style.display = "block";
    } else {
      art.style.display = "none";
    }
  });
}

// 🔹 Modo “ver todos”
function mostrarTodos() {
  const articulos = document.querySelectorAll(".articulo-categoria");
  articulos.forEach(art => {
    art.style.display = "block";
  });
}

// Estado del toggle
let mostrandoSoloFavoritos = false;

// 🔹 ESTA función es la clave: siempre deja todo coherente
function actualizarTodo() {
  aplicarFavoritos();

  if (mostrandoSoloFavoritos) {
    mostrarSoloFavoritos();
  } else {
    mostrarTodos();
  }
}

// La exponemos para usarla desde cargar-datos.js cuando cambie la categoría
window.actualizarFavoritos = actualizarTodo;

document.addEventListener("DOMContentLoaded", () => {
  const contenedor = document.querySelector("#seccion-categoria");
  const btnFavoritos = document.querySelector("#btn-favoritos");

  // Delegación de eventos para las estrellas ⭐
  if (contenedor) {
    contenedor.addEventListener("click", e => {
      const estrella = e.target.closest(".estrella-favorito");
      if (!estrella) return;

      const id = estrella.dataset.id;
      const article = estrella.closest("article");
      const categoria = article?.dataset.categoria || "sin-categoria";

      let favoritos = obtenerFavoritos();

      if (!favoritos[categoria]) {
        favoritos[categoria] = [];
      }

      const listaCat = favoritos[categoria];

      if (listaCat.includes(id)) {
        favoritos[categoria] = listaCat.filter(item => item !== id);
      } else {
        listaCat.push(id);
      }

      guardarFavoritos(favoritos);

      // Siempre que cambie un favorito, rearmamos todo según el modo actual
      actualizarTodo();
    });
  }

  // Botón ⭐ Mis favoritos / Ver todos
  if (btnFavoritos) {
    btnFavoritos.addEventListener("click", () => {
      if (!mostrandoSoloFavoritos) {
        mostrandoSoloFavoritos = true;
        btnFavoritos.textContent = "👀 Ver todos";
      } else {
        mostrandoSoloFavoritos = false;
        btnFavoritos.textContent = "★ Mis favoritos";
      }

      actualizarTodo();
    });
  }

  // Primera pasada al cargar
  actualizarTodo();
});
