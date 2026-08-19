// Dades de prova inicials
let llibres = [
    { id: 1, titol: "El nom del vent", autor: "Patrick Rothfuss", estat: "pendent" },
    { id: 2, titol: "1984", autor: "George Orwell", estat: "completat" }
];

let filtreActual = 'tots';

// Elements del DOM
const botonsNav = document.querySelectorAll('.boto-nav');
const seccions = document.querySelectorAll('.seccio');
const llistaLlibresContainer = document.getElementById('llista-llibres');
const pestanyes = document.querySelectorAll('.pestanya');

const modal = document.getElementById('modal-llibre');
const btnObrirModal = document.getElementById('btn-obrir-modal');
const btnCancelar = document.getElementById('btn-cancelar');
const btnGuardar = document.getElementById('btn-guardar-llibre');

// Canviar de secció amb la barra inferior
botonsNav.forEach(boto => {
    boto.addEventListener('click', () => {
        const seccioId = boto.getAttribute('data-seccio');

        botonsNav.forEach(b => b.classList.remove('actiu'));
        seccions.forEach(s => s.classList.remove('activa'));

        boto.classList.add('actiu');
        document.getElementById(seccioId).classList.add('activa');
    });
});

// Filtrar Llibres
pestanyes.forEach(pestanya => {
    pestanya.addEventListener('click', () => {
        pestanyes.forEach(p => p.classList.remove('activa'));
        pestanya.classList.add('activa');
        filtreActual = pestanya.getAttribute('data-filtre');
        rendreLlibres();
    });
});

// Renderitzar la llista de llibres
function rendreLlibres() {
    llistaLlibresContainer.innerHTML = '';

    const llibresFiltrats = llibres.filter(llibre => {
        if (filtreActual === 'tots') return true;
        return llibre.estat === filtreActual;
    });

    if (llibresFiltrats.length === 0) {
        llistaLlibresContainer.innerHTML = '<p style="text-align:center; color:#8c736c; margin-top:20px;">No hi ha llibres en aquesta categoria.</p>';
        return;
    }

    llibresFiltrats.forEach(llibre => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <div class="card-info">
                <h3>${llibre.titol}</h3>
                <p class="autor">${llibre.autor}</p>
            </div>
            <div class="card-accions">
                <button onclick="esborrarLlibre(${llibre.id})" class="boto-esborrar">🗑️</button>
            </div>
        `;
        llistaLlibresContainer.appendChild(card);
    });

    actualitzarEstadistiques();
}

// Afegir Llibre
btnObrirModal.addEventListener('click', () => modal.classList.add('obert'));
btnCancelar.addEventListener('click', () => modal.classList.remove('obert'));

btnGuardar.addEventListener('click', () => {
    const titol = document.getElementById('input-titol').value;
    const autor = document.getElementById('input-autor').value;
    const estat = document.getElementById('select-estat').value;

    if (titol.trim() === '' || autor.trim() === '') return;

    const nouLlibre = {
        id: Date.now(),
        titol,
        autor,
        estat
    };

    llibres.push(nouLlibre);
    document.getElementById('input-titol').value = '';
    document.getElementById('input-autor').value = '';
    modal.classList.remove('obert');

    rendreLlibres();
});

// Esborrar Llibre
function esborrarLlibre(id) {
    llibres = llibres.filter(l => l.id !== id);
    rendreLlibres();
}

// Actualitzar xifres de perfil
function actualitzarEstadistiques() {
    const llegits = llibres.filter(l => l.estat === 'completat').length;
    const pendents = llibres.filter(l => l.estat === 'pendent').length;

    document.getElementById('estat-llegits').textContent = llegits;
    document.getElementById('estat-pendents').textContent = pendents;
}

// Inicialització
rendreLlibres();
