package tarea4.tarea_4.controllers;

import tarea4.tarea_4.models.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/notas")
public class NotaController {
    @Autowired
    private NotaRepository notaRepository;

    @Autowired
    private AvisoRepository avisoRepository;

    @PostMapping("/add")
    public String add(@RequestParam Integer aviso_id, @RequestParam Integer nota) {
        if (nota < 1 || nota > 7) return "Error: nota inválida";

        Aviso aviso = avisoRepository.findById(aviso_id).orElse(null);
        if (aviso == null) return "Error: aviso no existe";

        Nota n = new Nota();
        n.setNota(nota);
        n.setAviso(aviso);
        notaRepository.save(n);

        return "OK";
    }
}
