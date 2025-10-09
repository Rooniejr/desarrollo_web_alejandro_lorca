from flask import Flask, request, render_template, redirect, url_for, session
from utils.validations import validador_maximus
from database import db
from werkzeug.utils import secure_filename
import hashlib
import filetype
import os

UPLOAD_FOLDER = 'static/uploads'

app = Flask(__name__)

app.secret_key = "s3cr3t_k3y"
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

@app.route("/", methods = ["GET"])
def portada():
    ultimos= []
    for avisos in db.get_ultimos_avisos(n=5):
        fotos = db.get_fotos(avisos.id)
        print(fotos)
        foto = fotos[0] if fotos != [] else None
        ultimos.append({
            "fecha_publicacion": avisos.fecha_ingreso,
            "comuna": db.get_comuna(avisos.comuna_id).nombre,
            "sector": avisos.sector,
            "cantidad": avisos.cantidad,
            "tipo": avisos.tipo,
            "edad": avisos.edad,
            "foto":foto['nombre_archivo']
        })
    
    return render_template("portada.html", ultimos=ultimos)

@app.route("/post_aviso_adopcion", methods = ["GET","POST"])
def post_aviso():
    print('here')
    regiones = db.get_todas_regiones()
    if request.method == "POST":
        print("Ruta /post_aviso_adopcion cargada")
        region = request.form.get("Región")
        comuna = request.form.get("Comuna")
        sector = request.form.get("Sector")
        nombre_contacto = request.form.get("Nombre")
        email_contacto = request.form.get("Email")
        numero_contacto = request.form.get("Numero")
        tipo_mascota = request.form.get("Tipo")
        cantidad = int(request.form.get("Cantidad"))
        edad = int(request.form.get("Edad"))
        unidad_edad = request.form.get("Unidad_medida_edad")
        fecha_entrega = request.form.get("Fecha_entrega")
        descripcion = request.form.get("Descripción")
        fotos = request.files.getlist("Foto[]")
        print(fotos)

        aviso = {"Region": region,"Comuna": comuna,"Sector": sector,
        "Nombre": nombre_contacto,"Email": email_contacto,
        "Numero": numero_contacto,"Tipo": tipo_mascota,
        "Cantidad": cantidad,"Edad": edad,"Unidad_medida_edad": unidad_edad,
        "Fecha_entrega": fecha_entrega,"Descripcion": descripcion,
        "Fotos": fotos}
        print(aviso)

        contacto = {"tipo": request.form.getlist("Contacto[]"), "id": request.form.getlist("ID[]")}
        aviso["contactos"] = [contacto]
        print(contacto)

        validacion_formulario = validador_maximus(aviso)
        validar_com_reg = db.validar_comuna_region(comuna,region)
        if validacion_formulario == [] and validar_com_reg:
            id_aviso = db.crear_aviso(comuna, sector, nombre_contacto, email_contacto, numero_contacto,tipo_mascota, cantidad, edad, unidad_edad, fecha_entrega, descripcion)
            for f in aviso["Fotos"]:
                if f.filename:
                    _filename = hashlib.sha256(secure_filename(f.filename).encode("utf-8")).hexdigest()
                    _extension = filetype.guess(f).extension
                    img_filename = f"{_filename}.{_extension}"

                    f.save(os.path.join(app.config["UPLOAD_FOLDER"], img_filename))
                    
                    db.crear_foto(app.config["UPLOAD_FOLDER"], img_filename, id_aviso)
        
            contacto_tipo = request.form.getlist("Contacto[]")
            contacto_id = request.form.getlist("ID[]")
            for i in range(len(contacto_tipo)):
                c_t =contacto_tipo[i]
                c_i= contacto_id[i]
                db.crear_contacto(c_t, c_i, id_aviso)

            return redirect(url_for("portada"))
        else:
            print("Validacion comuna region: ", validar_com_reg)
            error_msg = "Algunos campos no son válidos."
            return render_template("agregar.html", error=validacion_formulario, aviso=aviso)
        
    return render_template("agregar.html", regiones=regiones)

@app.route("/listado", methods=["GET"])
def listado():
    page = request.args.get("page", 1, type=int)
    avisos, total = db.get_avisos_paginados(page=page, per_page=5)

    listado_avisos = []
    for aviso in avisos:
        foto = list(db.get_fotos(aviso.id))
        print(foto)
        print(len(foto))
        listado_avisos.append({
            "id": aviso.id,
            "fecha_publicacion": aviso.fecha_ingreso,
            "fecha_entrega": aviso.fecha_entrega,
            "comuna": aviso.comuna.nombre if aviso.comuna else "",
            "sector": aviso.sector,
            "cantidad": aviso.cantidad,
            "tipo": aviso.tipo,
            "edad": aviso.edad,
            "nombre": aviso.nombre,
            "contacto": aviso.celular,
            "cantidad_foto": len(foto)
        })

    total_pages = max(1,(total + 4) // 5)

    return render_template("listado.html", avisos=listado_avisos, page=page, total_pages=total_pages)

# Detalle de cada aviso.
@app.route('/info_listado', methods=['GET'])
def info_listado():
    id_aviso = request.args.get('ID', type=int)
    if not id_aviso:
        return redirect(url_for('listado'))

    # Datos del aviso
    aviso = db.get_aviso_by_id(id_aviso)
    if not aviso:
        return redirect(url_for('listado'))

    # Fotos
    fotos = db.get_fotos(id_aviso)
    datos_fotos = [{"url": url_for('static', filename='uploads/' + f['nombre_archivo'])} for f in fotos]

    # Contactos
    contactos = db.get_contacto_by_id(id_aviso)
    datos_contacto = [{"plataforma": c['nombre_c'], "contacto": c['url_c']} for c in contactos]

    # Datos del aviso
    datos = [{
        "fecha_publicacion": aviso.fecha_ingreso,
        "fecha_entrega": aviso.fecha_entrega,
        "comuna": db.get_comuna(aviso.comuna_id).nombre,
        "sector": aviso.sector,
        "cantidad": aviso.cantidad,
        "tipo": aviso.tipo,
        "edad": aviso.edad,
        "nombre": aviso.nombre,
        "contacto": aviso.celular,
        "descripcion": aviso.descripcion,
        "region": db.get_region(db.get_comuna(aviso.comuna_id).region_id).nombre,
        "telefono": aviso.celular,
        "correo": aviso.email
    }]

    return render_template('info_listado.html',
                           datos_fotos=datos_fotos,
                           datos_contacto=datos_contacto,
                           datos=datos)
    
@app.route("/estadisticas")
def estadisticas():
    graficos = [
        url_for('static', filename='extra/grafico_barras.png'),
        url_for('static', filename='extra/grafico_lineas.png'),
        url_for('static', filename='extra/grafico_torta.png')
    ]
    return render_template("estadisticas.html", graficos=graficos)

if __name__ == "__main__":
    app.run(debug=True)
    