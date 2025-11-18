Para hacer esta tarea me basé principalmente en la clase que el profe subió a Enlaces. Por lo mismo, no usé fragmentos ni tuve que declarar explícitamente cosas de Thymeleaf con th: dentro del HTML.

Las llamadas asíncronas las hice con JavaScript usando fetch, igual que en el auxiliar. Además, dejé configurado que las tablas de la base de datos se actualicen automáticamente con JPA usando la opción update en el application.properties.

Para la parte de evaluar, usé un modal que solo permite elegir números enteros (1 al 7). Lo hice así para que la validación fuera más simple y evitar que entren valores raros. También redondeé los promedios de las evaluaciones directamente en el JS usando Math.round().

También agregué una función para formatear la fecha y mostrarla en formato de 24 horas. Varias partes de la tarea las saqué de las guías oficiales de Spring: https://spring.io/guides

Tuve que crear un controlador para la ruta inicial (/) porque la app no entraba directo al index.html. Pensé que Thymeleaf lo tomaría solo, pero no fue así.

Finalmente, revisé los validadores y no me aparece ningún error.
