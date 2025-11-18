async function cargarAvisos() {
const res = await fetch('/avisos/all');
const avisos = await res.json();


let tabla = document.getElementById("tablaAvisos");
tabla.innerHTML = `
    <tr>
        <th>ID</th>
        <th>Fecha</th>
        <th>Sector</th>
        <th>Cantidad</th>
        <th>Tipo</th>
        <th>Edad</th>
        <th>Comuna</th>
        <th>Nota</th>
        <th>Evaluar</th>
    </tr>`;


avisos.forEach(a => {

    let promedio = a.promedioNotas;
    if (promedio === null || promedio === undefined) {
        promedio = '-';
    } else {
        promedio = Math.round(promedio);
    }

    const fechaFormateada = formatearFecha(a.fecha_ingreso);

tabla.innerHTML += `
    <tr>
        <td>${a.id}</td>
        <td>${fechaFormateada}</td>
        <td>${a.sector}</td>
        <td>${a.cantidad}</td>
        <td>${a.tipo}</td>
        <td>${a.edad}</td>
        <td>${a.comuna ? a.comuna.nombre : ''}</td>
        <td id="nota-${a.id}">${promedio}</td>
        <td><button onclick="abrirModal(${a.id})">Evaluar</button></td>
    </tr>`;
    });
}

function formatearFecha(fechaISO) {
    const f = new Date(fechaISO);
    return f.toLocaleString("es-CL", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false
    });
}

let avisoActual = null;

function abrirModal(id) {
    avisoActual = id;
    document.getElementById("modal").style.display = "flex";
}

function cerrarModal() {
    document.getElementById("modal").style.display = "none";
}

async function enviarNota(nota) {
    const id = avisoActual;

    const res = await fetch(`/notas/add?aviso_id=${id}&nota=${nota}`, {
        method: 'POST'
    });

    if (res.ok) {
        cerrarModal();
        location.reload();
    }
}

document.addEventListener("DOMContentLoaded", cargarAvisos)