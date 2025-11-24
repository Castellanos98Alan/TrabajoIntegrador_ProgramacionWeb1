import items from "../data/items.json" with { type: 'json' };

const ALL_ITEMS_DATA = items;

const fila = document.getElementById('carrusel-imagenes-dinamicas');
const btnAtras = document.getElementById('atras-btn');
const btnAdelante = document.getElementById('adelante-btn');
const puntos = document.getElementById('puntos');

const NUM_ITEMS_A_MOSTRAR = 5;
const INTERVALO_MS = 5000;
const DURACION_TRANSICION_MS = 600;

let datosCarruselFinales = [];
let indiceActual = 0;
let indiceVisual = 1;
let autoPlayInterval;


function seleccionarItemsAleatorios(data) {
    const itemsAleatorios = [];
    const itemsDisponibles = [...data];
    for (let i = 0; i < NUM_ITEMS_A_MOSTRAR; i++) {
        const indiceAleatorio = Math.floor(Math.random() * itemsDisponibles.length);
        itemsAleatorios.push(itemsDisponibles[indiceAleatorio]);
        itemsDisponibles.splice(indiceAleatorio, 1);
    }
    return itemsAleatorios;
}

function construirCarrusel() {
    datosCarruselFinales = seleccionarItemsAleatorios(ALL_ITEMS_DATA);

    const ultimoItemClon = datosCarruselFinales[NUM_ITEMS_A_MOSTRAR - 1];
    const imgUltimoClon = document.createElement('img');
    imgUltimoClon.src = ultimoItemClon.Portada;
    imgUltimoClon.alt = `(Clon) ${ultimoItemClon.Nombre}`;
    imgUltimoClon.classList.add('carrusel-item', 'clon');
    fila.appendChild(imgUltimoClon);

    datosCarruselFinales.forEach((item, index) => {
        const img = document.createElement('img');
        img.src = item.Portada;
        img.alt = `Portada de ${item.Nombre}`;
        img.classList.add('carrusel-item');
        img.dataset.index = index;
        fila.appendChild(img);
    });

    const primerItemClon = datosCarruselFinales[0];
    const imgPrimerClon = document.createElement('img');
    imgPrimerClon.src = primerItemClon.Portada;
    imgPrimerClon.alt = `(Clon) ${primerItemClon.Nombre}`;
    imgPrimerClon.classList.add('carrusel-item', 'clon');
    fila.appendChild(imgPrimerClon);

    fila.style.width = ((NUM_ITEMS_A_MOSTRAR + 2) * (100 / (NUM_ITEMS_A_MOSTRAR + 2))) + '%';
}

function posicionCarrusel() {
    puntos.innerHTML = "";
    for (var i = 0; i < NUM_ITEMS_A_MOSTRAR; i++) {
        const puntoClass = i === indiceActual ? 'bold' : '';
        puntos.innerHTML += `<p class="${puntoClass}">.</p>`;
    }
}

function moverCarrusel() {
    if (datosCarruselFinales.length === 0) return;

    const itemWidthPercent = 100 / (NUM_ITEMS_A_MOSTRAR + 2);
    const desplazamientoBase = -indiceVisual * itemWidthPercent;
    const COMPENSACION_CENTRO_X = itemWidthPercent / 2;
    const desplazamientoFinal = desplazamientoBase + COMPENSACION_CENTRO_X;

    fila.style.transform = `translateX(${desplazamientoFinal}%)`;

    const itemsHTML = fila.querySelectorAll('.carrusel-item:not(.clon)');
    itemsHTML.forEach((item, index) => {
        item.classList.remove('activo');
        if (index === indiceActual) {
            item.classList.add('activo');
        }
    });

    posicionCarrusel();
}

function saltarLoop(targetIndexVisual, newIndiceActual) {
    fila.style.transition = 'none';

    indiceVisual = targetIndexVisual;
    indiceActual = newIndiceActual;
    moverCarrusel();

    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            fila.style.transition = `transform ${DURACION_TRANSICION_MS / 1000}s ease-in-out`;
            btnAdelante.disabled = false;
            btnAtras.disabled = false;
        });
    });
}

function moverDerecha() {
    if (indiceVisual === NUM_ITEMS_A_MOSTRAR + 1) return;

    indiceActual = (indiceActual + 1) % NUM_ITEMS_A_MOSTRAR;
    indiceVisual++;

    moverCarrusel();

    if (indiceVisual === NUM_ITEMS_A_MOSTRAR + 1) {
        fila.addEventListener('transitionend', function handler() {
            fila.removeEventListener('transitionend', handler);
            saltarLoop(1, 0);
        });
    }
}

function moverIzquierda() {
    if (indiceVisual === 0) return;

    if (indiceVisual === 1) {

        indiceActual = NUM_ITEMS_A_MOSTRAR - 1;

        moverCarrusel();

        fila.addEventListener('transitionend', function handler() {
            fila.removeEventListener('transitionend', handler);
            saltarLoop(NUM_ITEMS_A_MOSTRAR, NUM_ITEMS_A_MOSTRAR - 1);
        });

    } else {
        indiceActual = (indiceActual - 1 + NUM_ITEMS_A_MOSTRAR) % NUM_ITEMS_A_MOSTRAR;
        indiceVisual--;
        moverCarrusel();
    }
}

function iniciarAutoPlay() {
    autoPlayInterval = setInterval(moverDerecha, INTERVALO_MS);
}

function reiniciarAutoPlay() {
    clearInterval(autoPlayInterval);
    iniciarAutoPlay();
}

if (typeof items !== 'undefined' && items.length > 0) {
    construirCarrusel();
    moverCarrusel();

    btnAtras.addEventListener('click', function () {
        moverIzquierda();
        reiniciarAutoPlay();
    });

    btnAdelante.addEventListener('click', function () {
        moverDerecha();
        reiniciarAutoPlay();
    });

    iniciarAutoPlay();
} else {
    console.error("Los datos JSON ('items') no están disponibles o están vacíos.");
}
