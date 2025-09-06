const validacionsector = (sector) =>{
    if (!sector) return false;
    let Largo_valido = sector.trim().length <= 100;
    return Largo_valido;
};

const validacionnombre = (nombre) =>{
    if (!nombre) return false;
    let Largo_valido = nombre.trim().length >=3 && nombre.trim().length <= 200;
    return Largo_valido;
};

const validacionemail = (email) =>{
    if (!email) return false;
    let Largo_valido = email.trim().length <= 100;
    let re = /^[\w.]+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    let formato_Valido = re.test(email);
    return Largo_valido && formato_Valido;
};

const validacionTelefono = (Numero) =>{
    if(!Numero) return false;
    let re = /^\+569\.\d{8}$/;
    return re.test(Numero);
};

const validacionUrl = (Url) =>{
    if(!Url) return false;
    let Largo_valido = Url.trim().length >= 4 && Url.trim().length <= 50;
    return Largo_valido;
};

const validacionentero = (entero) => {
    if (!entero) return false;
    if (entero < 1) return false;
    if (entero % 1 !== 0) return false;
    return true;
};

const validacionSelect = (select) => {
  return select !== "" && select !== "--Seleccione--";
};

const inputFecha = document.getElementById("Fecha");
const fechaMin = new Date();
fechaMin.setHours(fechaMin.getHours() + 3);
const año = fechaMin.getFullYear();
const mes = String(fechaMin.getMonth() + 1).padStart(2, '0');
const dia = String(fechaMin.getDate()).padStart(2, '0');
const horas = String(fechaMin.getHours()).padStart(2, '0');
const minutos = String(fechaMin.getMinutes()).padStart(2, '0');
const fechaStr = `${año}-${mes}-${dia}T${horas}:${minutos}`;
inputFecha.value = fechaStr;


const validacionFecha = (fechaStr) => {
  if (!fechaStr) return false;
  const fechaValor = new Date(fechaStr);
  fechaValor.setSeconds(0, 0);
  fechaMin.setSeconds(0, 0);
  return fechaValor >= fechaMin;
};


const validacionFiles = (files) => {
  if (!files) return false;
  let lengthValid = 1 <= files.length && files.length <= 5;
  let typeValid = true;
  for (const file of files) {
    let fileFamily = file.type.split("/")[0];
    typeValid = typeValid && fileFamily == "image";
  }
  return lengthValid && typeValid;
};

const fotosDiv = document.getElementById("div_fotos");
const agregarFotoBtn = document.getElementById("fotos_btn");
let contadorFotos = 1;
const maximo = 5;

agregarFotoBtn.addEventListener("click", () => {
  if (contadorFotos < maximo) {
    const div = document.createElement("div");
    div.classList.add("contacto-item");
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.required = true;

    const eliminarBtn = document.createElement("button");
    eliminarBtn.type = "button";
    eliminarBtn.innerText = "-";
    
    eliminarBtn.addEventListener("click", () => {
      div.remove();
      contadorFotos--;
    });
    
    div.appendChild(input);
    div.appendChild(eliminarBtn);
    fotosDiv.appendChild(div);
    contadorFotos++;
  } 
});

const validacionForm = () =>{
  let myForm = document.forms["myForm"];
  let region = document.getElementById("Región").value;
  let comuna = document.getElementById("Comuna").value;
  let sector = document.getElementById("Sector").value;
  let nombre = document.getElementById("Nombre").value;  
  let email = document.getElementById("Email").value;
  let numero = document.getElementById("Numero").value;
  let url = document.getElementById("id_url").value;
  let tipo = document.getElementById("Tipo").value;
  let cantidad = document.getElementById("Cantidad").value;
  let edad = document.getElementById("Edad").value;
  let unidad = document.getElementById("Unidad").value;
  let fecha = document.getElementById("Fecha").value;
  let foto = document.getElementById("Foto").files;

  let invalidInputs = [];
  let isValid = true;
  const setInvalidInput = (inputName) => {
    invalidInputs.push(inputName);
    isValid &&= false;
  };
  if(!validacionSelect(region)){
    setInvalidInput("Región (selecciona una opción)");
  }
  if(!validacionSelect(comuna)){
    setInvalidInput("Comuna (selecciona una opción)");
  }
  if(!validacionsector(sector)){
    setInvalidInput("Sector (largo máximo 100)");
  }
  if(!validacionnombre(nombre)){
    setInvalidInput("Nombre (largo entre 3 y 200)");
  }
  if(!validacionemail(email)){
    setInvalidInput("Email (formato algo@algo.dominio)");
  }
  if(!validacionTelefono(numero)){
    setInvalidInput("Numero (formato +NNN.NNNNNNNN)");
  }
  if(!validacionUrl(url)){
    setInvalidInput("Url o ID (mínimo 4 y máximo 50)");
  }
  if(!validacionSelect(tipo)){
    setInvalidInput("Tipo (seleccione una opción)");
  }
  if(!validacionentero(cantidad)){
    setInvalidInput("Cantidad (entero mayor a 0)");
  }
  if(!validacionentero(edad)){
    setInvalidInput("Edad (entero mayor a 0)");
  }
  if(!validacionSelect(unidad)){
    setInvalidInput("Unidad (seleccione una opción)");
  }
  if(!validacionFecha(fecha)){
    setInvalidInput("Fecha (formato AAAA-MM-DD HH:MM, fecha actual +3hrs)");
  }
  if(!validacionFiles(foto)){
    setInvalidInput("Foto (mínimo 1 máximo 5)");
  }

  let validationBox = document.getElementById("val-box");
  let validationMessageElem = document.getElementById("val-msg");
  let validationListElem = document.getElementById("val-list");

  if (!isValid) {
    validationListElem.textContent = "";
    for (input of invalidInputs) {
      let listElement = document.createElement("li");
      listElement.innerText = input;
      validationListElem.append(listElement);
    }
    validationMessageElem.innerText = "Los siguientes campos son inválidos:";
    validationBox.style.backgroundColor = "#ffdddd";
    validationBox.style.borderLeftColor = "#f44336";
    validationBox.hidden = false;
    validationBox.scrollIntoView({ behavior: "smooth", block: "start" });
  } else {
    myForm.style.display = "none";
    validationMessageElem.innerText = " ¿Está seguro que desea agregar este aviso de adopción?";
    validationListElem.textContent = "";
    validationBox.style.backgroundColor = "#ddffdd";
    validationBox.style.borderLeftColor = "#4CAF50";
    let submitButton = document.createElement("button");
    submitButton.innerText = "Sí, estoy seguro";
    submitButton.style.marginRight = "10px";
    submitButton.addEventListener("click", () => {
      validationMessageElem.innerText = "Hemos recibido la información de adopción, muchas gracias y suerte!";
      validationListElem.textContent = ""
      let VolverButton = document.createElement("button");
      VolverButton.innerText = "Volver a la portada";
      VolverButton.addEventListener("click", () => {
        window.location.href = "../HTML/portada.html"; 
      });
      validationListElem.appendChild(VolverButton);
    });

    let backButton = document.createElement("button");
    backButton.innerText = "No, no estoy seguro, quiero volver al formulario";
    backButton.addEventListener("click", () => {
      myForm.style.display = "block";
      validationBox.hidden = true;
    });

    validationListElem.appendChild(submitButton);
    validationListElem.appendChild(backButton);
    validationBox.hidden = false;
  }
};


let submitBtn = document.getElementById("submit-btn");
submitBtn.addEventListener("click", validacionForm);

let volver = document.getElementById("Volver");

volver.addEventListener("click", () => {
  window.location.href = "../HTML/Portada.html";
});