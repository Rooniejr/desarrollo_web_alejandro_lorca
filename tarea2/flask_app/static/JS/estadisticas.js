async function cargarDatos() {
  const res = await fetch("/get-estadisticas-data");
  const data = await res.json();

  console.log(data);
  console.log("Por mes y tipo:", data.por_mes_y_tipo);

  // === 1. Gráfico de líneas ===
  const fechas = data.por_dia.map(i => i.fecha);
  const cantidades = data.por_dia.map(i => i.cantidad);

  Highcharts.chart('grafico_linea', {
    chart: { type: 'line' },
    title: { text: 'Cantidad de Avisos de Adopción por Día' },
    xAxis: { categories: fechas, title: { text: 'Fecha' } },
    yAxis: { title: { text: 'Cantidad de Avisos' } },
    series: [{ name: 'Avisos', data: cantidades }]
  });

  // === 2. Gráfico de torta ===
  const tipos = data.por_tipo.map(i => ({
    name: i.tipo,
    y: i.cantidad
  }));

  Highcharts.chart('grafico_torta', {
    chart: { type: 'pie' },
    title: { text: 'Total de Avisos por Tipo de Mascota' },
    series: [{ name: 'Tipo de Mascota', colorByPoint: true, data: tipos }]
  });

  // === 3. Gráfico de barras ===
  const meses = [...new Set(data.por_mes_y_tipo.map(i =>
    new Date(i.mes + 'T12:00:00').toLocaleString('es-CL', { month: 'short', year: 'numeric' })
  ))];

  const perros = [];
  const gatos = [];

  meses.forEach(mes => {
    const perro = data.por_mes_y_tipo.find(i =>
      new Date(i.mes + 'T12:00:00').toLocaleString('es-CL', { month: 'short', year: 'numeric' }) === mes && i.tipo === 'perro');
    const gato = data.por_mes_y_tipo.find(i =>
      new Date(i.mes + 'T12:00:00').toLocaleString('es-CL', { month: 'short', year: 'numeric' }) === mes && i.tipo === 'gato');

    perros.push(perro ? perro.cantidad : 0);
    gatos.push(gato ? gato.cantidad : 0);
  });

  Highcharts.chart('grafico_barra', {
    chart: { type: 'column' },
    title: { text: 'Avisos por Mes y Tipo' },
    xAxis: { categories: meses, title: { text: 'Mes' } },
    yAxis: { title: { text: 'Cantidad de Avisos' } },
    series: [
      { name: 'Perros', data: perros },
      { name: 'Gatos', data: gatos }
    ]
  });
}

cargarDatos();
