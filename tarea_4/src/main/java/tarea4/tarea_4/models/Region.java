package tarea4.tarea_4.models;

import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "region")
public class Region {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String nombre;

    @OneToMany(mappedBy = "region")
    private List<Comuna> comunas;

    public Integer getId() { return id; }
    public String getNombre() { return nombre; }
}
