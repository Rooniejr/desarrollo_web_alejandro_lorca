package tarea4.tarea_4.models;

import jakarta.persistence.*;


@Entity
@Table(name = "nota")
public class Nota {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;


    private Integer nota;


    @ManyToOne
    @JoinColumn(name = "aviso_id")
    private Aviso aviso;


    public Integer getId() { return id; }
    public Integer getNota() { return nota; }
    public void setNota(Integer n) { this.nota = n; }
    public void setAviso(Aviso a) { this.aviso = a; }
}
