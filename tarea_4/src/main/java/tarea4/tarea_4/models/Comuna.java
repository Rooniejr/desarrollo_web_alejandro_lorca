package tarea4.tarea_4.models;

import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "comuna")
public class Comuna {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String nombre;

    @ManyToOne
    @JoinColumn(name = "region_id")
    private Region region;

    @OneToMany(mappedBy = "comuna")
    private List<Aviso> avisos;

    public Integer getId() { return id; }
    public String getNombre() { return nombre; }
    public Region getRegion() { return region; }
}