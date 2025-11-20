from sqlalchemy import create_engine, Column, Integer, BigInteger, String, ForeignKey, DateTime, Enum, Text
from sqlalchemy.orm import sessionmaker, declarative_base, relationship
from datetime import datetime
import enum
from sqlalchemy import func


DB_NAME = "tarea2"
DB_USERNAME = "cc5002"
DB_PASSWORD = "programacionweb"
DB_HOST = "localhost"
DB_PORT = 3306

DATABASE_URL = f"mysql+pymysql://{DB_USERNAME}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}"

engine = create_engine(DATABASE_URL, echo=False, future=True)
SessionLocal = sessionmaker(bind=engine)

Base = declarative_base()

# --- Models ---

class UnidadEnum(enum.Enum):
    a = 'a'
    m = 'm'

class AvisoAdopcion(Base):
    __tablename__ = 'aviso_adopcion'

    id = Column(BigInteger, primary_key=True, autoincrement=True)
    fecha_ingreso = Column(DateTime, default=datetime.now, nullable=False)
    comuna_id = Column(BigInteger, ForeignKey('comuna.id'))
    sector = Column(String(100), nullable=True)
    nombre = Column(String(200), nullable=False)
    email = Column(String(100), nullable=False)
    celular = Column(String(15), nullable=True)
    tipo = Column(Enum('perro', 'gato'), nullable=False)
    cantidad = Column(Integer, nullable=False)
    edad = Column(Integer, nullable=False)
    unidad_medida = Column(Enum(UnidadEnum), nullable=False)
    fecha_entrega = Column(DateTime, default=datetime.now, nullable=False)
    descripcion = Column(Text(500), nullable=True)

    # Un aviso puede tener muchas fotos y muchas formas de contacto
    fotos = relationship("Foto", back_populates="aviso", cascade="all, delete")
    contactos = relationship("ContactarPor", back_populates="aviso", cascade="all, delete")

    # Cada aviso pertenece a una comuna
    comuna = relationship("Comuna", back_populates="avisos")


class Comuna(Base):
    __tablename__ = 'comuna'

    id = Column(BigInteger, primary_key=True, autoincrement=True)
    nombre = Column(String(200), nullable=False)
    region_id = Column(BigInteger, ForeignKey('region.id'), nullable=False)

    # Una comuna pertenece a una región
    region = relationship("Region", back_populates="comunas")

    # Una comuna puede tener varios avisos
    avisos = relationship("AvisoAdopcion", back_populates="comuna", cascade="all, delete")


class ContactarPor(Base):
    __tablename__ = 'contactar_por'

    id = Column(BigInteger, primary_key=True, autoincrement=True)
    nombre = Column(Enum('instagram','whatsapp','telegram','X','tiktok'), nullable=False)
    identificador = Column(String(150), nullable=False)
    actividad_id = Column(BigInteger, ForeignKey('aviso_adopcion.id'), nullable=False)

    # Cada forma de contacto pertenece a un aviso
    aviso = relationship("AvisoAdopcion", back_populates="contactos")


class Foto(Base):
    __tablename__ = 'foto'

    id = Column(BigInteger, primary_key=True, autoincrement=True)
    ruta_archivo = Column(String(300), nullable=False)
    nombre_archivo = Column(String(300), nullable=False)
    actividad_id = Column(BigInteger, ForeignKey('aviso_adopcion.id'), nullable=False)

    # Cada foto pertenece a un aviso
    aviso = relationship("AvisoAdopcion", back_populates="fotos")


class Region(Base):
    __tablename__ = 'region'

    id = Column(BigInteger, primary_key=True, autoincrement=True)
    nombre = Column(String(200), nullable=False)

    # Una región tiene muchas comunas
    comunas = relationship("Comuna", back_populates="region", cascade="all, delete")

class Comentario(Base):
    __tablename__ = 'comentario'

    id = Column(BigInteger, primary_key=True, autoincrement=True)
    nombre = Column(String(80), nullable=False)
    texto = Column(String(300), nullable=False)
    fecha = Column(DateTime, nullable=False)
    aviso_id = Column(BigInteger, ForeignKey('aviso_adopcion.id'), nullable=False)

# --- Database Functions ---

def crear_aviso(comuna_id , sector, nombre, email, celular,tipo, cantidad, edad, unidad_medida, fecha_entrega, descripcion):
    session = SessionLocal()
    fecha_ingreso = datetime.now()
    nuevo_aviso = AvisoAdopcion(fecha_ingreso=fecha_ingreso, comuna_id=comuna_id, sector=sector, nombre=nombre,
                                email=email, celular=celular, tipo=tipo, cantidad=cantidad, edad=edad, unidad_medida=unidad_medida,
                                fecha_entrega=fecha_entrega, descripcion=descripcion)
    session.add(nuevo_aviso)
    session.commit()
    id = int(nuevo_aviso.id)
    session.close()
    return id

def crear_foto(ruta_archivo, nombre_archivo, actividad_id):
    session = SessionLocal()
    nueva_foto = Foto(ruta_archivo=ruta_archivo, nombre_archivo=nombre_archivo, actividad_id=actividad_id)
    session.add(nueva_foto)
    session.commit()
    session.close()

def crear_contacto(nombre, identificador, actividad_id):
    session = SessionLocal()
    nuevo_contacto = ContactarPor(nombre=nombre, identificador=identificador, actividad_id=actividad_id)
    session.add(nuevo_contacto)
    session.commit()
    session.close()

def get_comuna(id):
    session = SessionLocal()
    comuna_id = session.query(Comuna).filter_by(id=id).first()
    session.close()
    return comuna_id

def get_region(id):
    session = SessionLocal()
    region_id = session.query(Region).filter_by(id=id).first()
    session.close()
    return region_id

def validar_comuna_region(id_comuna, id_region):
    if get_comuna(id_comuna) is None:
        return False
    if get_region(id_region) is None:
        return False
    return True

def get_ultimos_avisos(n):
    session = SessionLocal()
    ultimos_avisos = session.query(AvisoAdopcion).order_by(AvisoAdopcion.fecha_ingreso.desc()).limit(n).all()
    session.close()
    return ultimos_avisos

def get_fotos(actividad_id):
    session = SessionLocal()
    fotos = session.query(Foto).filter_by(actividad_id=actividad_id).all()
    ftos = []
    for f in fotos:
        ftos.append({
            'nombre_archivo': f.nombre_archivo
        })
    session.close()
    return ftos

def get_todas_regiones():
    session = SessionLocal()
    regiones = session.query(Region).all()
    session.close()
    return regiones

def get_comunas_por_region(region_id):
    session = SessionLocal()
    comunas = session.query(Comuna).filter_by(region_id=region_id).all()
    session.close()
    return comunas

def get_avisos_paginados(page=1, per_page=5):
    session = SessionLocal()
    query = session.query(AvisoAdopcion).order_by(AvisoAdopcion.fecha_ingreso.desc())
    total = query.count()
    avisos = query.offset((page-1)*per_page).limit(per_page).all()
    for aviso in avisos:
        aviso.fotos
        aviso.comuna
    session.close()
    return avisos, total 

# Obtiene los contactos asociados a cierto aviso por una id.
def get_contacto_by_id(actividad_id):
    session = SessionLocal()
    contactos = session.query(ContactarPor).filter_by(actividad_id=actividad_id)
    ctos = []
    for c in contactos:
        ctos.append({
            'nombre_c': c.nombre,
            'url_c': c.identificador
        })
    session.close()
    return ctos

# Obtiene el aviso asociado a cierto id.
def get_aviso_by_id(id_aviso):
    session = SessionLocal()
    aviso = session.query(AvisoAdopcion).filter_by(id=id_aviso).first()
    session.close()
    return aviso

def get_estadisticas():
    session = SessionLocal() 
    try:
        avisos_por_dia = (
            session.query(
                func.date(AvisoAdopcion.fecha_ingreso).label('fecha'),
                func.count(AvisoAdopcion.id).label('cantidad')
            )
            .group_by(func.date(AvisoAdopcion.fecha_ingreso))
            .order_by(func.date(AvisoAdopcion.fecha_ingreso))
            .all()
        )

        avisos_por_tipo = (
            session.query(
                AvisoAdopcion.tipo,
                func.count(AvisoAdopcion.id).label('cantidad')
            )
            .group_by(AvisoAdopcion.tipo)
            .all()
        )

        avisos_por_mes_y_tipo = (
            session.query(
                func.DATE_FORMAT(AvisoAdopcion.fecha_ingreso, "%Y-%m").label('mes'),
                AvisoAdopcion.tipo,
                func.count(AvisoAdopcion.id).label('cantidad')
            )
            .group_by(func.DATE_FORMAT(AvisoAdopcion.fecha_ingreso, "%Y-%m"), AvisoAdopcion.tipo)
            .order_by(func.DATE_FORMAT(AvisoAdopcion.fecha_ingreso, "%Y-%m"))
            .all()
        )

        data = {
            "por_dia": [{"fecha": str(f), "cantidad": c} for f, c in avisos_por_dia],
            "por_tipo": [{"tipo": t, "cantidad": c} for t, c in avisos_por_tipo],
            "por_mes_y_tipo": [{"mes": m, "tipo": t, "cantidad": c} for m, t, c in avisos_por_mes_y_tipo]
        }
        
        return data
    
    finally:
        session.close()

def agregar_comentario(aviso_id, nombre, texto):
    session = SessionLocal()
    comentario = Comentario(
        aviso_id=aviso_id,
        nombre=nombre,
        texto=texto,
        fecha=datetime.now()
    )
    session.add(comentario)
    session.commit()
    session.refresh(comentario)
    session.close()
    return comentario

def obtener_comentarios(aviso_id):
    session = SessionLocal()
    comentarios = session.query(Comentario).filter_by(aviso_id=aviso_id).order_by(Comentario.fecha.desc()).all()
    resultado = [{
        "nombre": c.nombre,
        "texto": c.texto,
        "fecha": c.fecha.strftime("%Y-%m-%d %H:%M")
    } for c in comentarios]
    session.close()
    return resultado