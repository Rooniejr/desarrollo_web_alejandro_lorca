const regiones = [
  {
    region: "Región de Tarapacá",
    comunas: ["Camiña", "Huara", "Pozo Almonte", "Iquique", "Pica", "Colchane", "Alto Hospicio"]
  },
  {
    region: "Región de Antofagasta",
    comunas: ["Tocopilla", "Maria Elena", "Ollague", "Calama", "San Pedro Atacama", "Sierra Gorda", "Mejillones", "Antofagasta", "Taltal"]
  },
  {
    region: "Región de Atacama",
    comunas: ["Diego de Almagro", "Chañaral", "Caldera", "Copiapo", "Tierra Amarilla", "Huasco", "Freirina", "Vallenar", "Alto del Carmen"]
  },
  {
    region: "Región de Coquimbo",
    comunas: ["La Higuera", "La Serena", "Vicuña", "Paihuano", "Coquimbo", "Andacollo", "Rio Hurtado", "Ovalle", "Monte Patria", "Punitaqui", "Combarbala", "Mincha", "Illapel", "Salamanca", "Los Vilos"]
  },
  {
    region: "Región de Valparaíso",
    comunas: ["Petorca", "Cabildo", "Papudo", "La Ligua", "Zapallar", "Putaendo", "Santa Maria", "San Felipe", "Pencahue", "Catemu", "Llay Llay", "Nogales", "La Calera", "Hijuelas", "La Cruz", "Quillota", "Olmue", "Limache", "Los Andes", "Rinconada", "Calle Larga", "San Esteban", "Puchuncavi", "Quintero", "Viña del Mar", "Villa Alemana", "Quilpue", "Valparaiso", "Juan Fernandez", "Casablanca", "Concon", "Isla de Pascua", "Algarrobo", "El Quisco", "El Tabo", "Cartagena", "San Antonio", "Santo Domingo"]
  },
  {
    region: "Región del Libertador Bernardo Ohiggins",
    comunas: ["Mostazal", "Codegua", "Graneros", "Machali", "Rancagua", "Olivar", "Doñihue", "Requinoa", "Coinco", "Coltauco", "Quinta Tilcoco", "Las Cabras", "Rengo", "Peumo", "Pichidegua", "Malloa", "San Vicente", "Navidad", "La Estrella", "Marchigue", "Pichilemu", "Litueche", "Paredones", "San Fernando", "Peralillo", "Placilla", "Chimbarongo", "Palmilla", "Nancagua", "Santa Cruz", "Pumanque", "Chepica", "Lolol"]
  },
  {
    region: "Región del Maule",
    comunas: ["Teno", "Romeral", "Rauco", "Curico", "Sagrada Familia", "Hualañe", "Vichuquen", "Molina", "Licanten", "Rio Claro", "Curepto", "Pelarco", "Talca", "Pencahue", "San Clemente", "Constitucion", "Maule", "Empedrado", "San Rafael", "San Javier", "Colbun", "Villa Alegre", "Yerbas Buenas", "Linares", "Longavi", "Retiro", "Parral", "Chanco", "Pelluhue", "Cauquenes"]
  },
  {
    region: "Región del Biobío",
    comunas: ["Tome", "Florida", "Penco", "Talcahuano", "Concepcion", "Hualqui", "Coronel", "Lota", "Santa Juana", "Chiguayante", "San Pedro de la Paz", "Hualpen", "Cabrero", "Yumbel", "Tucapel", "Antuco", "San Rosendo", "Laja", "Quilleco", "Los Angeles", "Nacimiento", "Negrete", "Santa Barbara", "Quilaco", "Mulchen", "Alto Bio Bio", "Arauco", "Curanilahue", "Los Alamos", "Lebu", "Cañete", "Contulmo", "Tirua"]
  },
  {
    region: "Región de La Araucanía",
    comunas: ["Renaico", "Angol", "Collipulli", "Los Sauces", "Puren", "Ercilla", "Lumaco", "Victoria", "Traiguen", "Curacautin", "Lonquimay", "Perquenco", "Galvarino", "Lautaro", "Vilcun", "Temuco", "Carahue", "Melipeuco", "Nueva Imperial", "Puerto Saavedra", "Cunco", "Freire", "Pitrufquen", "Teodoro Schmidt", "Gorbea", "Pucon", "Villarrica", "Tolten", "Curarrehue", "Loncoche", "Padre Las Casas", "Cholchol"]
  },
  {
    region: "Región de Los Lagos",
    comunas: ["San Pablo", "San Juan", "Osorno", "Puyehue", "Rio Negro", "Purranque", "Puerto Octay", "Frutillar", "Fresia", "Llanquihue", "Puerto Varas", "Los Muermos", "Puerto Montt", "Maullin", "Calbuco", "Cochamo", "Ancud", "Quemchi", "Dalcahue", "Curaco de Velez", "Castro", "Chonchi", "Queilen", "Quellon", "Quinchao", "Puqueldon", "Chaiten", "Futaleufu", "Palena", "Hualaihue"]
  },
  {
    region: "Región Aisén del General Carlos Ibáñez del Campo",
    comunas: ["Guaitecas", "Cisnes", "Aysen", "Coyhaique", "Lago Verde", "Rio Ibañez", "Chile Chico", "Cochrane", "Tortel", "O'Higins"]
  },
  {
    region: "Región de Magallanes y la Antártica Chilena",
    comunas: ["Torres del Paine", "Puerto Natales", "Laguna Blanca", "San Gregorio", "Rio Verde", "Punta Arenas", "Porvenir", "Primavera", "Timaukel", "Antartica"]
  },
  {
    region: "Región Metropolitana de Santiago",
    comunas: ["Tiltil", "Colina", "Lampa", "Conchali", "Quilicura", "Renca", "Las Condes", "Pudahuel", "Quinta Normal", "Providencia", "Santiago", "La Reina", "Ñuñoa", "San Miguel", "Maipu", "La Cisterna", "La Florida", "La Granja", "Independencia", "Huechuraba", "Recoleta", "Vitacura", "Lo Barrenechea", "Macul", "Peñalolen", "San Joaquin", "La Pintana", "San Ramon", "El Bosque", "Pedro Aguirre Cerda", "Lo Espejo", "Estacion Central", "Cerrillos", "Lo Prado", "Cerro Navia", "San Jose de Maipo", "Puente Alto", "Pirque", "San Bernardo", "Calera de Tango", "Buin", "Paine", "Peñaflor", "Talagante", "El Monte", "Isla de Maipo", "Curacavi", "Maria Pinto", "Melipilla", "San Pedro", "Alhue", "Padre Hurtado"]
  },
  {
    region: "Región de Los Ríos",
    comunas: ["Lanco", "Mariquina", "Panguipulli", "Mafil", "Valdivia", "Los Lagos", "Corral", "Paillaco", "Futrono", "Lago Ranco", "La Union", "Rio Bueno"]
  },
  {
    region: "Región Arica y Parinacota",
    comunas: ["Gral. Lagos", "Putre", "Arica", "Camarones"]
  },
  {
    region: "Región del Ñuble",
    comunas: ["Cobquecura", "Ñiquen", "San Fabian", "San Carlos", "Quirihue", "Ninhue", "Trehuaco", "San Nicolas", "Coihueco", "Chillan", "Portezuelo", "Pinto", "Coelemu", "Bulnes", "San Ignacio", "Ranquil", "Quillon", "El Carmen", "Pemuco", "Yungay", "Chillan Viejo"]
  }
];

const regionSelect = document.getElementById("Región");
const comunaSelect = document.getElementById("Comuna");

const rellenarRegiones = () => {  
  for (const i in regiones) {
    let option = document.createElement("option");
    option.value = regiones[i].region;
    option.text = regiones[i].region;
    regionSelect.appendChild(option);
  }
};

const actualizarComunas = () => {
  const regionSeleccionada = regionSelect.value;
  comunaSelect.innerHTML = '<option value="">--Seleccione una comuna--</option>';
  for (const i in regiones) {
    if (regiones[i].region === regionSeleccionada) {
      regiones[i].comunas.forEach(comuna => {
        let option = document.createElement("option");
        option.value = comuna;
        option.text = comuna;
        comunaSelect.appendChild(option);
      });
    }
  }
};

document.getElementById("Región").addEventListener("change", actualizarComunas);

window.onload = () => {
  rellenarRegiones();
};


function activarSelect(select, input) {
  select.addEventListener("change", () => {
    if (select.value !== "") {
      input.style.display = "inline-block";
    } else {
      input.style.display = "none";
      input.value = "";
    }
  });
}

const selectInicial = document.getElementById("Contacto");
const inputInicial = document.getElementById("id_url");
activarSelect(selectInicial, inputInicial);

const contactodiv = document.getElementById("div_contactos");
const agregar_btn = document.getElementById("contacto_btn");
let contador = 0;
agregar_btn.addEventListener("click", () =>{
    if(contador < 4){
        const div = document.createElement("div");
        div.classList.add("foto-item");
        const select = document.createElement("select");
        select.innerHTML = `
            <option value="">--Seleccione--</option>
            <option>Whatsapp</option>
            <option>X</option>
            <option>Telegram</option>
            <option>Instagram</option>
            <option>Otro</option>
        `;
        const input = document.createElement("input");
        input.type = "text";
        input.minLength = 4;
        input.maxLength = 50;
        input.style.display = "none";

        select.addEventListener("change", () =>{
            if(select.value!==""){
                input.style.display = "inline-block";
            }else{
                input.style.display = "none";
                input.value = "";
            }
        });
        
        div.appendChild(select);
        div.appendChild(input);
        contactodiv.appendChild(div);
        contador++;
    };
});