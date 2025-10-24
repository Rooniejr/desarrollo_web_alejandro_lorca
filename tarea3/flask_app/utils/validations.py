import re
import filetype
from datetime import datetime, timedelta
from database import db

def validar_sector(sector):
    return len(sector.strip()) <= 100

def validar_nombre(nombre):
    return nombre is not None and 3 <= len(nombre.strip()) <= 200 

def validar_email(email):
    return email is not None and bool(re.match(r"^[\w\.-]+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$", email)) and len(email.strip()) <= 100

def validar_celular(celular):
    if not celular:
        return True
    return bool(re.match(r"^\+569\.\d{8}$",celular))

TIPOS_CONTACTO = ["whatsapp", "telegram", "X", "instagram", "tiktok", "otra"]
def validar_tipo_contacto(tipo):
    return tipo in TIPOS_CONTACTO

def validar_Url(url):
    return 4 <= len(url.strip()) < 50

def validar_contactos(contactos):
    if not contactos:
        return True 
    if len(contactos) > 5:
        return False
    for c in contactos:
        if not validar_tipo_contacto(c.get("tipo")):
            return False
        if not validar_Url(c.get("id")):
            return False
    return True

def validar_tipo(tipo):
    return tipo in ["Gato", "Perro"]

def validar_entero_positivo(valor):
    if valor is None or valor == "":
        return False    
    if isinstance(valor, str) and not valor.isdigit():
        return False
    valor = int(valor)
    return valor >= 1 

def validar_unidad_edad(unidad):
    return unidad in ["m", "a"]

def validar_fecha(fecha_str):
    if not fecha_str:
        return False
    try:
        fecha_ingresada = datetime.strptime(fecha_str, "%Y-%m-%dT%H:%M")
        fecha_minima = datetime.now() + timedelta(hours=3)
        return fecha_ingresada >= fecha_minima
    except ValueError:
        return False


def validar_descripcion(descripcion):
    return True

def validar_fotos(fotos):
    if not fotos or len(fotos) < 1 or len(fotos) > 5:
        return False
    
    ALLOWED_EXTENSIONS = {"png", "jpg", "jpeg", "gif"}
    ALLOWED_MIMETYPES = {"image/jpeg", "image/png", "image/gif"}
    
    for f in fotos:
        tipo = filetype.guess(f)
        if not tipo:
            return False
        if tipo.extension not in ALLOWED_EXTENSIONS:
            return False
        if tipo.mime not in ALLOWED_MIMETYPES:
            return False
    return True

def validador_maximus(data):
    errores = []

    if not validar_sector(data.get("Sector")):
        errores.append("Sector inválido (máx 100 caracteres).")
    if not validar_nombre(data.get("Nombre")):
        errores.append("Nombre inválido (3-200 caracteres).")
    if not validar_email(data.get("Email")):
        errores.append("Email inválido.")
    if not validar_celular(data.get("Numero")):
        errores.append("Número de celular inválido.")
    if not validar_tipo(data.get("Tipo")):
        errores.append("Tipo de mascota inválido.")
    if not validar_entero_positivo(data.get("Cantidad")):
        errores.append("Cantidad inválida.")
    if not validar_entero_positivo(data.get("Edad")):
        errores.append("Edad inválida.")
    if not validar_unidad_edad(data.get("Unidad_medida_edad")):
        errores.append("Unidad de edad inválida.")
    if not validar_fecha(data.get("Fecha_entrega")):
        errores.append("Fecha de entrega inválida.")
    if not validar_fotos(data.get("Fotos")):
        errores.append("Fotos inválidas (1 a 5 fotos en formato png/jpg/jpeg/gif).")
    if not db.validar_comuna_region(data.get("Comuna"), data.get("Region")):
        errores.append("La comuna y la región no coinciden.")

    return errores

def validar_comentario(nombre, texto):
    errores = []
    if not nombre or len(nombre) < 3:
        errores.append("El nombre debe tener al menos 3 caracteres.")
    if not texto or len(texto) < 5:
        errores.append("El comentario debe tener al menos 5 caracteres.")
    return errores