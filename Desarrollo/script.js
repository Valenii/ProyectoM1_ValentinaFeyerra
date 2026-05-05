// ─── Utilidades de color ──────────────────────────────────────────────────────

function hexToHsl(hex) {
    let r = parseInt(hex.slice(1, 3), 16) / 255;
    let g = parseInt(hex.slice(3, 5), 16) / 255;
    let b = parseInt(hex.slice(5, 7), 16) / 255;

    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max === min) {
        h = s = 0;
    } else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
            case g: h = ((b - r) / d + 2) / 6; break;
            case b: h = ((r - g) / d + 4) / 6; break;
        }
    }
    return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
}

function hslToHex(h, s, l) {
    h = ((h % 360) + 360) % 360;
    s /= 100; l /= 100;
    const k = n => (n + h / 30) % 12;
    const a = s * Math.min(l, 1 - l);
    const f = n => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
    const toHex = x => Math.round(x * 255).toString(16).padStart(2, '0');
    return `#${toHex(f(0))}${toHex(f(8))}${toHex(f(4))}`;
}

// ─── Calcula 5 colores según el modo elegido ──────────────────────────────────

function calcularPaleta(hex, modo) {
    const [h, s, l] = hexToHsl(hex);

    const modos = {
        complementary: [
            { h,          s,                    l,                    nombre: 'Primary' },
            { h,          s: Math.max(s-20,10), l: Math.min(l+25,90), nombre: 'Primary Light' },
            { h,          s,                    l: Math.max(l-20,10), nombre: 'Primary Dark' },
            { h: h+180,   s,                    l,                    nombre: 'Success' },
            { h: h+180,   s: Math.max(s-15,10), l: Math.min(l+15,90), nombre: 'Success Light' },
        ],
        analogous: [
            { h: h-40, s, l, nombre: 'Primary' },
            { h: h-20, s, l, nombre: 'Primary Light' },
            { h,       s, l, nombre: 'Base' },
            { h: h+20, s, l, nombre: 'Warning' },
            { h: h+40, s, l, nombre: 'Danger' },
        ],
        triadic: [
            { h,       s, l,                    nombre: 'Primary' },
            { h,       s, l: Math.min(l+25,90), nombre: 'Primary Light' },
            { h: h+120,s, l,                    nombre: 'Success' },
            { h: h+240,s, l,                    nombre: 'Warning' },
            { h: h+240,s, l: Math.min(l+20,90), nombre: 'Danger' },
        ],
        monochromatic: [
            { h, s, l: Math.max(l-30, 5),              nombre: 'Primary Dark' },
            { h, s, l: Math.max(l-15,10),              nombre: 'Primary' },
            { h, s, l,                                  nombre: 'Base' },
            { h, s, l: Math.min(l+18,88),              nombre: 'Primary Light' },
            { h, s: Math.max(s-20,5), l: Math.min(l+35,95), nombre: 'Muy claro' },
        ],
    };

    return (modos[modo] || modos.complementary).map(c => ({
        hex: hslToHex(c.h, c.s, c.l),
        nombre: c.nombre
    }));
}

// ─── Actualiza los swatches con los colores calculados ────────────────────────

function actualizarSwatches(colores) {
    const variables = [
        '--color-primary',
        '--color-primary-light',
        '--color-success',
        '--color-warning',
        '--color-danger'
    ];
    const swatches = document.querySelectorAll('.color-swatch');

    colores.forEach((color, i) => {
        // Actualiza la variable CSS en :root
        document.documentElement.style.setProperty(variables[i], color.hex);

        // Actualiza el swatch en el HTML
        if (swatches[i]) {
            swatches[i].querySelector('.swatch-color').style.background = color.hex;
            swatches[i].querySelector('.swatch-name').textContent       = color.nombre;
            swatches[i].querySelector('.swatch-hex').textContent        = color.hex;
        }
    });
}

// ─── Función principal que llama el botón ─────────────────────────────────────

function generar() {
    const hex    = document.getElementById('baseColor').value;
    const modo   = document.getElementById('modeSelect').value;
    const paleta = calcularPaleta(hex, modo);
    actualizarSwatches(paleta);
}

// ─── Copiar hex al hacer click en un swatch ───────────────────────────────────

document.querySelectorAll('.color-swatch').forEach(swatch => {
    swatch.style.cursor = 'pointer';
    swatch.title = 'Click para copiar el hex';

    swatch.addEventListener('click', () => {
        const hex = swatch.querySelector('.swatch-hex').textContent;
        navigator.clipboard.writeText(hex).then(() => {
            const info = swatch.querySelector('.swatch-info');
            info.style.background = '#d4edda';
            setTimeout(() => info.style.background = '', 800);
        });
    });
});

// ─── Genera la paleta al cargar la página ────────────────────────────────────
generar();