
const botonRecargar = document.getElementById('btn-recargar');

botonRecargar.addEventListener('click', function () {
    location.reload();
});

const paginasPredeterminadas = [
    { nombre: 'YouTube', url: 'https://youtube.com', favicon: 'https://www.google.com/s2/favicons?domain=youtube.com&sz=128' },
    { nombre: 'Gmail', url: 'https://gmail.com', favicon: 'https://www.google.com/s2/favicons?domain=gmail.com&sz=128' },
    { nombre: 'Facebook', url: 'https://facebook.com', favicon: 'https://www.google.com/s2/favicons?domain=facebook.com&sz=128' },
    { nombre: 'Twitter', url: 'https://twitter.com', favicon: 'https://www.google.com/s2/favicons?domain=twitter.com&sz=128' },
    { nombre: 'Instagram', url: 'https://instagram.com', favicon: 'https://www.google.com/s2/favicons?domain=instagram.com&sz=128' },
    { nombre: 'Amazon', url: 'https://amazon.com', favicon: 'https://www.google.com/s2/favicons?domain=amazon.com&sz=128' }
];

let paginas = [...paginasPredeterminadas];

function renderizarPaginas() {
    const grid = document.getElementById('gridRecientes');
    if (!grid) return;

    grid.innerHTML = '';

    paginas.forEach((pagina, index) => {
        const item = crearItemPagina(pagina, index);
        grid.appendChild(item);
    });

    if (paginas.length < 10) {
        const itemAgregar = document.createElement('div');
        itemAgregar.className = 'pagina-item pagina-agregar';
        itemAgregar.onclick = abrirModal;
        itemAgregar.innerHTML = `
            <div class="pagina-icono">
                <span class="pagina-icono-letra">+</span>
            </div>
            <div class="pagina-nombre">Agregar acceso</div>
        `;
        grid.appendChild(itemAgregar);
    }
}

function crearItemPagina(pagina, index) {
    const item = document.createElement('div');
    item.className = 'pagina-item';

    const primeraLetra = pagina.nombre.charAt(0).toUpperCase();

    item.innerHTML = `
        <div class="pagina-icono">
            ${pagina.favicon ?
            `<img src="${pagina.favicon}" alt="${pagina.nombre}" onerror="this.style.display='none'; this.nextElementSibling.style.display='block';">
                 <span class="pagina-icono-letra" style="display:none">${primeraLetra}</span>`
            :
            `<span class="pagina-icono-letra">${primeraLetra}</span>`
        }
            <button class="btn-eliminar" onclick="eliminarPagina(${index}); event.stopPropagation();">×</button>
        </div>
        <div class="pagina-nombre">${pagina.nombre}</div>
    `;

    item.onclick = () => window.open(pagina.url, '_blank');

    return item;
}

function abrirModal() {
    document.getElementById('modalAgregar').style.display = 'flex';
    document.getElementById('inputNombre').value = '';
    document.getElementById('inputUrl').value = '';
}

function cerrarModal() {
    document.getElementById('modalAgregar').style.display = 'none';
}

function guardarPagina() {
    const nombre = document.getElementById('inputNombre').value.trim();
    const url = document.getElementById('inputUrl').value.trim();

    if (!nombre || !url) {
        alert('Por favor completa todos los campos');
        return;
    }

    if (!url.startsWith('http://') && !url.startsWith('https://')) {
        alert('La URL debe comenzar con http:// o https://');
        return;
    }

    const nuevaPagina = {
        nombre: nombre,
        url: url,
        favicon: `https://www.google.com/s2/favicons?domain=${url}&sz=128`
    };

    paginas.push(nuevaPagina);
    renderizarPaginas();
    cerrarModal();
}

function eliminarPagina(index) {
    if (confirm('¿Eliminar este acceso directo?')) {
        paginas.splice(index, 1);
        renderizarPaginas();
    }
}

function toggleEditMode() {
    alert('Modo de edición activado. Pasa el cursor sobre las páginas para eliminarlas con la X');
}

document.addEventListener('DOMContentLoaded', function () {
    const modal = document.getElementById('modalAgregar');
    if (modal) {
        modal.onclick = function (e) {
            if (e.target === modal) {
                cerrarModal();
            }
        };
    }

    renderizarPaginas();
});
