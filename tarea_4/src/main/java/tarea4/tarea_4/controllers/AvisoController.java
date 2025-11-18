package tarea4.tarea_4.controllers;

import tarea4.tarea_4.models.Aviso;
import tarea4.tarea_4.models.AvisoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/avisos")
public class AvisoController {
    @Autowired
    private AvisoRepository avisoRepository;

    @GetMapping("/all")
    public Iterable<Aviso> all() {
    return avisoRepository.findAll();
    }

    @GetMapping("/{id}")
    public Aviso get(@PathVariable Integer id) {
    return avisoRepository.findById(id).orElse(null);
    }
}
