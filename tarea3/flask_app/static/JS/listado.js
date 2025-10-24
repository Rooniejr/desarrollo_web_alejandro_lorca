// --- Modal de fotos ---
const modal = document.getElementById("modal");
const modalImg = document.getElementById("modal-img");
const cerrar = document.getElementById("cerrar");
const columnas = document.querySelectorAll(".columnader img");

if (modal && modalImg && cerrar && columnas.length > 0) {
    columnas.forEach(img => {
        img.addEventListener("click", () => {
            modal.style.display = "flex";
            modalImg.src = img.src;
        });
    });

    cerrar.addEventListener("click", () => {
        modal.style.display = "none";
    });
}

// --- Comentarios ---
const contenedorComentarios = document.getElementById('comentarios-container');
const aviso_id = document.getElementById('id_aviso').value;
console.log(aviso_id)

// Inicializa los comentarios
function initComentarios() {
    cargarComentarios();
}

// Cargar comentarios desde backend
async function cargarComentarios() {
    const res = await fetch(`/lista_comentarios?ID=${aviso_id}`);
    const comentarios = await res.json();
    const cont = document.getElementById('comentarios-listado');
    cont.innerHTML = '';
    comentarios.forEach(c => {
        const div = document.createElement('div');
        div.innerHTML = `<b>${c.nombre}</b> (${c.fecha}): ${c.texto}`;
        cont.appendChild(div);
    });
}

// Manejar envío del formulario
const form = document.getElementById('form-comentario');
form.addEventListener('submit', async e => {
    e.preventDefault();
    const nombre = document.getElementById('nombre').value;
    const texto = document.getElementById('texto').value;

    const res = await fetch(`/agregar_comentarios`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre, texto, aviso_id })
    });

    if (!res.ok) {
        console.error('Error en la petición', res.status, await res.text());
        return;
    }

    const data = await res.json();
    const erroresDiv = document.getElementById('errores');
    erroresDiv.innerHTML = '';

    if (data.success) {
        form.reset();
        cargarComentarios();
    } else {
        data.errores.forEach(err => {
            const p = document.createElement('p');
            p.textContent = err;
            erroresDiv.appendChild(p);
        });
    }
});

initComentarios();