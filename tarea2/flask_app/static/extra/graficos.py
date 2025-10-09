import matplotlib.pyplot as plt
import numpy as np

np.random.seed(42)

dias = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom']
avisos_por_dia = np.random.randint(5, 15, size=len(dias))

plt.figure(figsize=(8,4))
plt.plot(dias, avisos_por_dia, marker='o', color='blue', linestyle='-')
plt.title('Avisos de adopción por día')
plt.xlabel('Día')
plt.ylabel('Cantidad de avisos')
plt.savefig('lineas_avisos_random.png')
plt.close()

tipos_mascota = ['Gato', 'Perro']
avisos_tipo = np.random.randint(20, 60, size=2)

plt.figure(figsize=(6,6))
plt.pie(avisos_tipo, labels=tipos_mascota, autopct='%d%%', colors=['#ff9999','#66b3ff'])
plt.title('Total de avisos por tipo de mascota')
plt.savefig('torta_avisos_random.png')
plt.close()

meses = ['Ene', 'Feb', 'Mar', 'Abr', 'May']
avisos_gatos = np.random.randint(5, 25, size=len(meses))
avisos_perros = np.random.randint(5, 25, size=len(meses))

x = np.arange(len(meses))
width = 0.35

plt.figure(figsize=(8,4))
plt.bar(x - width/2, avisos_gatos, width, label='Gatos', color='orange')
plt.bar(x + width/2, avisos_perros, width, label='Perros', color='green')
plt.xticks(x, meses)
plt.ylabel('Cantidad de avisos')
plt.title('Avisos de adopción por mes y tipo de mascota')
plt.legend()
plt.savefig('barras_avisos_random.png')
plt.close()

print("ready")