let filas = document.querySelectorAll(".fila");
let volver = document.getElementById("Volver");
let atras = document.getElementById("atras");

if (filas.length){
    filas.forEach(fila => {
        fila.addEventListener("click", () =>{
            window.location.href = "../HTML/informacion_listado.html";
        });    
    });
};

if(volver){
    volver.addEventListener("click", () => {
        window.location.href = "../HTML/Portada.html";
    });
}

if(atras){
    atras.addEventListener("click", () => {
            window.location.href = "../HTML/Listado_aviso.html";  
    });
}

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
