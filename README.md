Generador de Paletas de Colores
Proyecto Integrador — Módulo 1


¿Qué es esta aplicación?
Es una herramienta web que genera paletas de colores armónicas a partir de un color base elegido por el usuario. Permite seleccionar entre cuatro modos de armonía cromática y copiar los códigos hexadecimales de cada color con un solo click.

¿Cómo usar la app?

Hacé click en el selector de color y elegí tu color base
Seleccioná un modo de armonía en el menú desplegable:

Complementario — colores opuestos en el círculo cromático
Análogo — colores cercanos entre sí
Triádico — tres colores equidistantes
Monocromático — variaciones de luminosidad del mismo tono


Hacé click en Generar paleta
Hacé click en cualquier swatch para copiar su código hex al portapapeles


Decisiones técnicas
Tecnologías utilizadas

HTML5 — estructura de la aplicación
CSS3 — estilos y variables CSS para los colores dinámicos
JavaScript puro (Vanilla JS) — lógica de generación de paletas, sin frameworks ni librerías externas

¿Por qué estas tecnologías?
Se eligió HTML, CSS y JavaScript puro para mantener el proyecto simple, sin dependencias externas y fácil de desplegar en cualquier servidor estático como GitHub Pages.
Lógica de colores
La app convierte el color base de formato HEX a HSL (Hue, Saturation, Lightness) para poder manipular matemáticamente el tono, saturación y luminosidad. Luego aplica las fórmulas de cada modo de armonía y convierte los resultados de vuelta a HEX para mostrarlos.

hexToHsl() — convierte HEX a HSL
hslToHex() — convierte HSL a HEX
calcularPaleta() — aplica el modo de armonía elegido y devuelve 5 colores
actualizarSwatches() — actualiza el DOM y las variables CSS en :root

Variables CSS dinámicas
Los colores se aplican como variables CSS en :root (--color-primary, --color-success, etc.), lo que permite que toda la interfaz se actualice instantáneamente al generar una nueva paleta.