# Generador de Paletas de Colores
### Proyecto Integrador — Módulo 1

Aplicación web desarrollada con HTML, CSS y JavaScript que permite generar paletas de colores armónicas de forma dinámica utilizando distintos modos cromáticos. También ofrece la posibilidad de visualizar los colores en formato HEX, HSL o RGBA, elegir la cantidad de colores generados y copiar cualquier código al portapapeles con un solo click.

---

## ¿Qué es esta aplicación?

El **Generador de Paletas de Colores** es una herramienta web pensada para usuarios que necesiten inspiración visual o combinaciones de colores listas para utilizar en diseños, interfaces o proyectos web.

La aplicación genera paletas basadas en armonías del círculo cromático y permite visualizar cada color en diferentes formatos para facilitar su uso.

---

# Manual de Usuario — ¿Cómo usar la aplicación?

El funcionamiento de la aplicación es simple e intuitivo.

## 1. Seleccionar un modo de armonía

Desde el selector **“Modo”**, el usuario puede elegir entre cuatro tipos de paletas:

### Complementario
Genera colores opuestos dentro del círculo cromático, logrando contrastes más fuertes y llamativos.

### Análogo
Genera colores cercanos entre sí, creando combinaciones más suaves y armónicas.

### Triádico
Genera grupos de colores distribuidos de forma equidistante dentro del círculo cromático, aportando equilibrio visual.

### Monocromático
Genera variaciones de saturación y luminosidad de un mismo color.

---

## 2. Elegir la cantidad de colores

La aplicación permite generar:

- **6 colores**
- **8 colores**
- **9 colores**

La cantidad seleccionada determinará cuántas tarjetas de color (**swatches**) se mostrarán en pantalla.

---

## 3. Elegir el formato del color

Los colores pueden visualizarse en tres formatos distintos:

### HEX
Formato hexadecimal muy utilizado en diseño y desarrollo web.

Ejemplo:

```txt
#378ADD
```

### HSL
Formato basado en tono (**Hue**), saturación (**Saturation**) y luminosidad (**Lightness**).

Ejemplo:

```css
hsl(210, 71%, 54%)
```

### RGBA
Formato basado en rojo (**Red**), verde (**Green**), azul (**Blue**) y nivel de transparencia (**Alpha**).

Ejemplo:

```css
rgba(55, 138, 221, 1)
```

---

## 4. Generar una paleta

Para generar una nueva combinación de colores, presionar el botón:

**“Generar Paleta”**

La aplicación creará automáticamente una paleta aleatoria según la configuración seleccionada.

También se actualiza automáticamente cuando se modifica:

- el modo de armonía
- la cantidad de colores
- el formato del color

---

## 5. Copiar un color

Cada tarjeta de color es interactiva.

Al hacer click sobre un color:

- el código se copia automáticamente al portapapeles
- se muestra un mensaje visual de confirmación indicando el color copiado

---

## 6. Guardar una paleta
 
Una vez generada una paleta, se habilitará el botón:
 
**"Guardar Paleta"**
 
Al presionarlo:
 
- la paleta actual se guarda de forma persistente en el navegador
- aparece una sección **"Paletas Guardadas"** debajo de la paleta activa
- cada paleta guardada muestra el modo de armonía, la cantidad de colores y la fecha y hora en que fue guardada
Las paletas guardadas se conservan aunque se cierre o recargue la página.

### Interacción con paletas guardadas
 
Dentro de cada paleta guardada es posible:
 
- hacer click sobre cualquier mini swatch para copiar su código al portapapeles
- pasar el cursor sobre un mini swatch para ver su código en un tooltip
- presionar **"Eliminar"** para borrar esa paleta de la lista
---

# Decisiones Técnicas — Manual Técnico

## Tecnologías utilizadas

### HTML5
Se utilizó para estructurar la interfaz de usuario, incluyendo:
 
- selectores de configuración
- botones de generación y guardado
- contenedor dinámico de colores
- sección de paletas guardadas
- tooltip de copiado

### CSS3
Se utilizó para el diseño visual de la aplicación.
 
Características implementadas:
 
- interfaz con tema oscuro
- gradientes y efectos visuales
- animaciones hover en botones y tarjetas
- organización del contenido con Flexbox
- uso de variables CSS mediante `:root`
- adaptación básica a distintos tamaños de pantalla

### JavaScript (Vanilla JS)
Toda la lógica de la aplicación fue desarrollada con JavaScript puro, sin utilizar librerías externas.
 
Funciones implementadas:
 
- generación aleatoria de colores
- conversión entre formatos HEX, HSL y RGBA
- cálculo de armonías cromáticas
- renderizado dinámico de swatches
- copiado automático al portapapeles
- actualización automática al cambiar el modo, formato o cantidad de colores
- guardado de paletas en `localStorage`
- renderizado de paletas guardadas con mini swatches interactivos
- eliminación individual de paletas guardadas
---

# Cómo descargar y ejecutar la aplicación en local

## Opción 1 — Descargar ZIP

1. Ingresar al repositorio del proyecto.
2. Presionar el botón **Code**.
3. Seleccionar **Download ZIP**.
4. Descomprimir el archivo descargado.
5. Abrir la carpeta del proyecto en Visual Studio Code.
6. Ejecutar el archivo `index.html` utilizando **Live Server** o directamente desde el navegador.

---

## Opción 2 — Clonar el repositorio

Abrir una terminal y ejecutar:

```bash
git clone https://github.com/Valenii/ProyectoM1_ValentinaFeyerra.git
```

Luego abrir el proyecto en Visual Studio Code.

---

# Despliegue en GitHub Pages

1. Ingresar al repositorio del proyecto en GitHub.
2. Abrir la pestaña:

```txt
Settings → Pages
```

3. En **Source**, seleccionar:

```txt
Deploy from a branch
```

4. Configurar:

```txt
Branch: master
Folder: /root
```

5. Guardar los cambios.

GitHub generará automáticamente una URL pública para acceder a la aplicación desde el navegador.

---

## Repositorio del proyecto

```txt
https://github.com/Valenii/ProyectoM1_ValentinaFeyerra
```