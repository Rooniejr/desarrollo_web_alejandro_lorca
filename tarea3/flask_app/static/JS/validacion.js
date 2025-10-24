const validacionsector = (sector) =>{
    if (!sector) return true;
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
    if(!Numero) return true;
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
    input.name = "Foto[]"; 

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

const validacionForm = e=>{
    e.preventDefault();
    const form = document.forms["myForm"];
    const invalidInputs = [];
    let isValid = true;

    const setInvalid = name=>{
        invalidInputs.push(name);
        isValid = false;
    };

    const region = document.getElementById("Región").value;
    const comuna = document.getElementById("Comuna").value;
    const sector = document.getElementById("Sector").value;
    const nombre = document.getElementById("Nombre").value;
    const email = document.getElementById("Email").value;
    const numero = document.getElementById("Numero").value;
    const url = document.getElementById("id_url").value;
    const tipo = document.getElementById("Tipo").value;
    const cantidad = document.getElementById("Cantidad").value;
    const edad = document.getElementById("Edad").value;
    const unidad = document.getElementById("Unidad").value;
    const fecha = document.getElementById("Fecha").value;
    const fotos = document.getElementById("Foto").files;

    // Validaciones
    if(!validacionSelect(region)) setInvalid("Región");
    if(!validacionSelect(comuna)) setInvalid("Comuna");
    if(!validacionsector(sector)) setInvalid("Sector");
    if(!validacionnombre(nombre)) setInvalid("Nombre");
    if(!validacionemail(email)) setInvalid("Email");
    if(!validacionTelefono(numero)) setInvalid("Número de celular");
    if(!validacionUrl(url)) setInvalid("ID/URL contacto");
    if(!validacionSelect(tipo)) setInvalid("Tipo");
    if(!validacionentero(cantidad)) setInvalid("Cantidad");
    if(!validacionentero(edad)) setInvalid("Edad");
    if(!validacionSelect(unidad)) setInvalid("Unidad de edad");
    if(!validacionFecha(fecha)) setInvalid("Fecha");
    if(!validacionFiles(fotos)) setInvalid("Fotos (1 a 5)");

    const box = document.getElementById("val-box");
    const msg = document.getElementById("val-msg");
    const list = document.getElementById("val-list");

    if(!isValid){
        msg.innerText = "Los siguientes campos son inválidos:";
        list.textContent = "";
        invalidInputs.forEach(i=>{
            const li = document.createElement("li");
            li.innerText = i;
            list.appendChild(li);
        });
        box.style.backgroundColor = "#ffdddd";
        box.style.borderLeftColor = "#f44336";
        box.hidden = false;
        box.scrollIntoView({behavior:"smooth", block:"start"});
    } else {
        // Confirmación
        msg.innerText = "¿Está seguro que desea agregar este aviso de adopción?";
        list.textContent = "";

        const submitBtn = document.createElement("button");
        submitBtn.type = "button";
        submitBtn.innerText = "Sí, estoy seguro";
        submitBtn.style.marginRight = "10px";
        submitBtn.addEventListener("click", ()=> form.submit());

        const backBtn = document.createElement("button");
        backBtn.type = "button";
        backBtn.innerText = "No, volver al formulario";
        backBtn.addEventListener("click", ()=> box.hidden = true);

        list.append(submitBtn, backBtn);
        box.style.backgroundColor = "#ddffdd";
        box.style.borderLeftColor = "#4CAF50";
        box.hidden = false;
        box.scrollIntoView({behavior:"smooth", block:"start"});
    }
};

// --- Listeners ---
document.getElementById("submit-btn").addEventListener("click", validacionForm);
document.getElementById("Volver").addEventListener("click", ()=> window.location.href="/");