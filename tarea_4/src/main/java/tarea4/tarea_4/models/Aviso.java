package tarea4.tarea_4.models;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.List;


@Entity
@Table(name = "aviso_adopcion")
public class Aviso {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;


    private LocalDateTime fecha_ingreso;
    private String sector;
    private String nombre;
    private String email;
    private String celular;
    private String tipo;
    private Integer cantidad;
    private Integer edad;
    private String unidad_medida;
    private LocalDateTime fecha_entrega;


    @ManyToOne
    @JoinColumn(name = "comuna_id")
    private Comuna comuna;


    @OneToMany(mappedBy = "aviso", cascade = CascadeType.ALL)
    private List<Nota> notas;


    public Double getPromedioNotas() {
        if (notas == null || notas.isEmpty()) return null;
        return notas.stream().mapToInt(Nota::getNota).average().orElse(0);
    }

    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }

    public LocalDateTime getFecha_ingreso() { return fecha_ingreso; }
    public void setFecha_ingreso(LocalDateTime fecha_ingreso) { this.fecha_ingreso = fecha_ingreso; }

    public String getSector() { return sector; }
    public void setSector(String sector) { this.sector = sector; }

    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getCelular() { return celular; }
    public void setCelular(String celular) { this.celular = celular; }

    public String getTipo() { return tipo; }
    public void setTipo(String tipo) { this.tipo = tipo; }

    public Integer getCantidad() { return cantidad; }
    public void setCantidad(Integer cantidad) { this.cantidad = cantidad; }

    public Integer getEdad() { return edad; }
    public void setEdad(Integer edad) { this.edad = edad; }

    public String getUnidad_medida() { return unidad_medida; }
    public void setUnidad_medida(String unidad_medida) { this.unidad_medida = unidad_medida; }

    public LocalDateTime getFecha_entrega() { return fecha_entrega; }
    public void setFecha_entrega(LocalDateTime fecha_entrega) { this.fecha_entrega = fecha_entrega; }

    public Comuna getComuna() { return comuna; }
    public void setComuna(Comuna comuna) { this.comuna = comuna; }

    public List<Nota> getNotas() { return notas; }
    public void setNotas(List<Nota> notas) { this.notas = notas; }
}
