// ─── Utilidades de color ──────────────────────────────────────────────────────

function hexToHsl(hex) {

    let r = parseInt(hex.slice(1, 3), 16) / 255;
    let g = parseInt(hex.slice(3, 5), 16) / 255;
    let b = parseInt(hex.slice(5, 7), 16) / 255;

    const max = Math.max(r, g, b),
          min = Math.min(r, g, b);

    let h, s, l = (max + min) / 2;

    if (max === min) {
        h = s = 0;
    } else {

        const d = max - min;

        s = l > 0.5
            ? d / (2 - max - min)
            : d / (max + min);

        switch (max) {

            case r:
                h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
                break;

            case g:
                h = ((b - r) / d + 2) / 6;
                break;

            case b:
                h = ((r - g) / d + 4) / 6;
                break;
        }
    }

    return [
        Math.round(h * 360),
        Math.round(s * 100),
        Math.round(l * 100)
    ];
}

function hslToHex(h, s, l) {

    h = ((h % 360) + 360) % 360;

    s /= 100;
    l /= 100;

    const k = n => (n + h / 30) % 12;

    const a = s * Math.min(l, 1 - l);

    const f = n =>
        l - a * Math.max(
            -1,
            Math.min(k(n) - 3, Math.min(9 - k(n), 1))
        );

    const toHex = x =>
        Math.round(x * 255)
            .toString(16)
            .padStart(2, '0');

    return `#${toHex(f(0))}${toHex(f(8))}${toHex(f(4))}`;
}

// ─── Color aleatorio ──────────────────────────────────────────────────────────

function colorAleatorio() {

    const letras = '0123456789ABCDEF';

    let color = '#';

    for (let i = 0; i < 6; i++) {
        color += letras[Math.floor(Math.random() * 16)];
    }

    return color;
}

// ─── Conversores ──────────────────────────────────────────────────────────────

function hexToRgba(hex) {

    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);

    return `rgba(${r}, ${g}, ${b}, 1)`;
}

function hexToHslString(hex) {

    const [h, s, l] = hexToHsl(hex);

    return `hsl(${h}, ${s}%, ${l}%)`;
}

function formatearColor(hex, formato) {

    if (formato === 'hsl') {
        return hexToHslString(hex);
    }

    if (formato === 'rgba') {
        return hexToRgba(hex);
    }

    return hex;
}

// ─── Calcular paleta ──────────────────────────────────────────────────────────

function calcularPaleta(hex, modo, cantidad) {

    const [h, s, l] = hexToHsl(hex);

    const modos = {

        complementary: [
            { h, s, l, nombre: 'Primary' },
            { h, s: Math.max(s - 20, 10), l: Math.min(l + 25, 90), nombre: 'Primary Light' },
            { h, s, l: Math.max(l - 20, 10), nombre: 'Primary Dark' },
            { h: h + 180, s, l, nombre: 'Complementary' },
            { h: h + 180, s: Math.max(s - 15, 10), l: Math.min(l + 15, 90), nombre: 'Comp. Light' },
            { h: h + 180, s, l: Math.max(l - 20, 10), nombre: 'Comp. Dark' },
            { h, s: Math.max(s - 30, 10), l: Math.min(l + 35, 95), nombre: 'Muy claro' },
            { h: h + 90, s, l, nombre: 'Split 1' },
            { h: h + 270, s, l, nombre: 'Split 2' }
        ],

        analogous: [
            { h: h - 60, s, l, nombre: 'Análogo -60°' },
            { h: h - 40, s, l, nombre: 'Análogo -40°' },
            { h: h - 20, s, l, nombre: 'Análogo -20°' },
            { h, s, l, nombre: 'Base' },
            { h: h + 20, s, l, nombre: 'Análogo +20°' },
            { h: h + 40, s, l, nombre: 'Análogo +40°' },
            { h: h + 60, s, l, nombre: 'Análogo +60°' },
            { h: h + 80, s, l, nombre: 'Análogo +80°' },
            { h: h - 80, s, l, nombre: 'Análogo -80°' }
        ],

        triadic: [
            { h, s, l, nombre: 'Primary' },
            { h, s, l: Math.min(l + 25, 90), nombre: 'Primary Light' },
            { h: h + 120, s, l, nombre: 'Triadic 2' },
            { h: h + 120, s, l: Math.min(l + 20, 90), nombre: 'Triadic 2 Light' },
            { h: h + 240, s, l, nombre: 'Triadic 3' },
            { h: h + 240, s, l: Math.min(l + 20, 90), nombre: 'Triadic 3 Light' },
            { h, s, l: Math.max(l - 20, 10), nombre: 'Primary Dark' },
            { h: h + 120, s, l: Math.max(l - 20, 10), nombre: 'Triadic 2 Dark' },
            { h: h + 240, s, l: Math.max(l - 20, 10), nombre: 'Triadic 3 Dark' }
        ],

        monochromatic: [
            { h, s, l: Math.max(l - 35, 5), nombre: 'Más oscuro' },
            { h, s, l: Math.max(l - 25, 10), nombre: 'Oscuro' },
            { h, s, l: Math.max(l - 12, 10), nombre: 'Primary Dark' },
            { h, s, l, nombre: 'Base' },
            { h, s, l: Math.min(l + 12, 88), nombre: 'Primary Light' },
            { h, s, l: Math.min(l + 25, 92), nombre: 'Claro' },
            { h, s: Math.max(s - 20, 5), l: Math.min(l + 38, 96), nombre: 'Más claro' },
            { h, s: Math.max(s - 10, 5), l: Math.min(l + 30, 94), nombre: 'Suave' },
            { h, s: Math.max(s - 40, 5), l: Math.min(l + 42, 97), nombre: 'Casi blanco' }
        ]
    };

    const lista = modos[modo] || modos.complementary;

    return lista.slice(0, cantidad).map(c => ({
        hex: hslToHex(c.h, c.s, c.l),
        nombre: c.nombre
    }));
}

// ─── Render dinámico ──────────────────────────────────────────────────────────

function actualizarSwatches(colores, formato) {

    const container = document.getElementById('paletteContainer');

    container.innerHTML = '';

    colores.forEach(color => {

        const codigoFormato =
            formatearColor(color.hex, formato);

        const swatch = document.createElement('div');

        swatch.className = 'color-swatch';
        swatch.tabIndex = 0;
        swatch.title = 'Click para copiar';
        swatch.style.cursor = 'pointer';

        swatch.innerHTML = `
            <div class="swatch-color" style="background:${color.hex}"></div>

            <div class="swatch-info">
                <span class="swatch-name">${color.nombre}</span>

                <span class="swatch-hex">
                    ${codigoFormato}
                </span>
            </div>
        `;

        swatch.addEventListener('click', () => {
            copiarColor(swatch, codigoFormato);
        });

        swatch.addEventListener('keydown', e => {

            if (e.key === 'Enter' || e.key === ' ') {
                copiarColor(swatch, codigoFormato);
            }
        });

        container.appendChild(swatch);
    });
}

// ─── Copiar ───────────────────────────────────────────────────────────────────

function copiarColor(swatch, valor) {

    navigator.clipboard.writeText(valor).then(() => {

        const info =
            swatch.querySelector('.swatch-info');

        const hexEl =
            swatch.querySelector('.swatch-hex');

        const original =
            hexEl.textContent;

        hexEl.textContent = '¡Copiado!';

        info.style.background = '#1a3a28';

        const tooltip =
            document.getElementById('tooltip');

        tooltip.textContent =
            `✔ Copiado: ${valor}`;

        tooltip.hidden = false;

        setTimeout(() => {

            hexEl.textContent = original;

            info.style.background = '';

            tooltip.hidden = true;

        }, 1200);
    });
}

// ─── Estado global ────────────────────────────────────────────────────────────

// Empieza en null, solo se genera cuando el usuario toca el botón en Aleatorio
let colorBase = null;
let modoActual = null;

// ─── Renderizar paleta ────────────────────────────────────────────────────────

function renderizarPaleta(modo) {

    // Si todavía no hay colorBase, no renderizar nada
    if (!colorBase) return;

    modoActual = modo;

    const cantidad =
        parseInt(document.getElementById('countSelect').value);

    const formato =
        document.getElementById('formatSelect').value;

    const paleta =
        calcularPaleta(colorBase, modo, cantidad);

        actualizarSwatches(paleta, formato);

    // Habilitar el botón Guardar
    document.getElementById('btnGuardar').disabled = false;
}

// ─── Generar aleatoria (solo el botón) ───────────────────────────────────────

function generarAleatoria() {

    const modo =
        document.getElementById('modeSelect').value;

    if (modo === 'random') {

        // Genera nuevo color base y elige modo al azar
        colorBase = colorAleatorio();

        const modos = ['complementary', 'analogous', 'triadic', 'monochromatic'];
        modoActual = modos[Math.floor(Math.random() * modos.length)];
    }

    renderizarPaleta(modoActual);
}

// ─── Eventos ──────────────────────────────────────────────────────────────────

document.getElementById('modeSelect')
.addEventListener('change', () => {

    const modo =
        document.getElementById('modeSelect').value;

    // Al volver a Aleatorio, mostrar lo que ya había generado sin cambiar nada
    if (modo === 'random') {
        if (modoActual) renderizarPaleta(modoActual);
        return;
    }

    renderizarPaleta(modo);
});

document.getElementById('formatSelect')
.addEventListener('change', () => {

    const modo =
        document.getElementById('modeSelect').value;

    const modoARenderizar =
        modo === 'random' ? modoActual : modo;

    if (modoARenderizar) renderizarPaleta(modoARenderizar);
});

document.getElementById('countSelect')
.addEventListener('change', () => {

    const modo =
        document.getElementById('modeSelect').value;

    const modoARenderizar =
        modo === 'random' ? modoActual : modo;

    if (modoARenderizar) renderizarPaleta(modoARenderizar);
});

// ─── Guardar paleta ───────────────────────────────────────────────────────────
 
function guardarPaleta() {
 
    if (!colorBase || !modoActual) return;
 
    const cantidad =
        parseInt(document.getElementById('countSelect').value);
 
    const formato =
        document.getElementById('formatSelect').value;
 
    const paleta = calcularPaleta(colorBase, modoActual, cantidad);
 
    const entrada = {
        id:      Date.now(),
        fecha:   new Date().toLocaleString('es-AR', { dateStyle: 'short', timeStyle: 'short' }),
        modo:    modoActual,
        colores: paleta,
        formato
    };
 
    const guardadas = obtenerPaletasGuardadas();
    guardadas.unshift(entrada);
    localStorage.setItem('paletas', JSON.stringify(guardadas));
 
    renderizarGuardadas();
 
    // Feedback en el tooltip
    const tooltip = document.getElementById('tooltip');
    tooltip.textContent = '✔ Paleta guardada';
    tooltip.hidden = false;
    setTimeout(() => { tooltip.hidden = true; }, 1400);
}
 
// ─── Obtener paletas del localStorage ────────────────────────────────────────
 
function obtenerPaletasGuardadas() {
 
    try {
        return JSON.parse(localStorage.getItem('paletas')) || [];
    } catch {
        return [];
    }
}
 
// ─── Eliminar paleta ──────────────────────────────────────────────────────────
 
function eliminarPaleta(id) {
 
    const filtradas =
        obtenerPaletasGuardadas().filter(p => p.id !== id);
 
    localStorage.setItem('paletas', JSON.stringify(filtradas));
 
    renderizarGuardadas();
}
 
// ─── Renderizar paletas guardadas ─────────────────────────────────────────────
 
function renderizarGuardadas() {
 
    const guardadas = obtenerPaletasGuardadas();
    const section   = document.getElementById('savedSection');
    const lista     = document.getElementById('savedList');
 
    if (guardadas.length === 0) {
        section.hidden = true;
        lista.innerHTML = '';
        return;
    }
 
    section.hidden = false;
    lista.innerHTML = '';
 
    const nombresLegibles = {
        complementary: 'Complementario',
        analogous:     'Análogo',
        triadic:       'Triádico',
        monochromatic: 'Monocromático'
    };
 
    guardadas.forEach(entrada => {
 
        const div = document.createElement('div');
        div.className = 'saved-palette';
 
        div.innerHTML = `
            <div class="saved-palette-header">
                <span class="saved-palette-meta">
                    ${nombresLegibles[entrada.modo] ?? entrada.modo}
                    &nbsp;·&nbsp; ${entrada.colores.length} colores
                    &nbsp;·&nbsp; ${entrada.fecha}
                </span>
                <button class="btn-delete" onclick="eliminarPaleta(${entrada.id})">
                    Eliminar
                </button>
            </div>
            <div class="saved-palette-swatches">
                ${entrada.colores.map(c => `
                    <div
                        class="mini-swatch"
                        style="background:${c.hex}"
                        data-hex="${formatearColor(c.hex, entrada.formato)}"
                        title="${c.nombre} · ${formatearColor(c.hex, entrada.formato)}"
                        onclick="navigator.clipboard.writeText('${formatearColor(c.hex, entrada.formato)}')"
                    ></div>
                `).join('')}
            </div>
        `;
 
        lista.appendChild(div);
    });
}
 
// ─── Al cargar: restaurar paletas guardadas ───────────────────────────────────
 
renderizarGuardadas();