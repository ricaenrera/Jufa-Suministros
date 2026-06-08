'use strict';

/* ═══════════════════════════════════════════════════════════════
   JUFA SUMINISTROS — Módulo de Checkout
   Flujo: Carrito → Envío → Pago → Comprobante → Confirmación
   Vanilla JS puro, sin dependencias externas.
═══════════════════════════════════════════════════════════════ */

/* ──────────────────────────────────────────
   CONFIGURACIÓN (reemplaza con datos reales)
────────────────────────────────────────── */
const WA_NUMERO = '584121017811';

const DATOS_PAGO = {
  pagoMovil: {
    banco:    '[BANCO_PLACEHOLDER]',
    telefono: '[TELEFONO_PLACEHOLDER]',
    cedula:   '[CEDULA_PLACEHOLDER]',
    nombre:   'Jufa Suministros',
  },
  zelle: {
    contacto: '[ZELLE_PLACEHOLDER]',
    nombre:   '[NOMBRE_ZELLE_PLACEHOLDER]',
  },
  binance: {
    wallet: '[WALLET_PLACEHOLDER]',
    payId:  '[PAYID_PLACEHOLDER]',
  },
};

/* ──────────────────────────────────────────
   DATOS ESTÁTICOS
────────────────────────────────────────── */
const ESTADOS_VE = [
  'Amazonas','Anzoátegui','Apure','Aragua','Barinas',
  'Bolívar','Carabobo','Cojedes','Delta Amacuro','Distrito Capital',
  'Falcón','Guárico','Lara','Mérida','Miranda',
  'Monagas','Nueva Esparta','Portuguesa','Sucre','Táchira',
  'Trujillo','La Guaira','Yaracuy','Zulia',
];

const BANCOS_VE = [
  'Banesco','Mercantil','BDV (Banco de Venezuela)','BBVA Provincial',
  'Banco Activo','BNC','Banplus','Bicentenario','Otros',
];

const TITULOS = [
  'Resumen del pedido',
  'Datos de envío',
  'Método de pago',
  'Comprobante de pago',
  '¡Pedido enviado!',
];

const LABELS_PASOS = ['Carrito', 'Envío', 'Pago', 'Comprobante', '¡Listo!'];

/* ──────────────────────────────────────────
   ESTADO DEL PEDIDO EN CURSO
────────────────────────────────────────── */
let co = {};
let pasoCo = 1;

function resetEstado(producto) {
  co = {
    producto,
    cantidad:    1,
    envio:       {},
    metodo:      null,  // 'pagoMovil' | 'zelle' | 'binance'
    comprobante: {},
    archivo:     null,  // File object
  };
  pasoCo = 1;
}

/* ═══════════════════════════════════════════════════════════════
   1. INYECCIÓN DEL MODAL EN EL DOM
═══════════════════════════════════════════════════════════════ */
function inyectarModal() {
  const html = `
    <div id="coOverlay" class="co-overlay" hidden role="dialog" aria-modal="true" aria-labelledby="coTitulo">
      <div class="co-modal">

        <div class="co-header">
          <h2 class="co-titulo" id="coTitulo">Resumen del pedido</h2>
          <button class="co-cerrar" id="coCerrar" aria-label="Cerrar">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                 stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        <div class="co-progreso" id="coProgreso" aria-label="Progreso del checkout"></div>

        <div class="co-contenido" id="coContenido"></div>

        <div class="co-pie" id="coPie"></div>

      </div>
    </div>
  `;
  document.body.insertAdjacentHTML('beforeend', html);
}

/* ═══════════════════════════════════════════════════════════════
   2. ABRIR / CERRAR
═══════════════════════════════════════════════════════════════ */
function abrirCheckout(producto) {
  resetEstado(producto);
  const overlay = document.getElementById('coOverlay');
  overlay.removeAttribute('hidden');
  overlay.offsetHeight; // forzar reflow para iniciar transición CSS
  overlay.classList.add('co-visible');
  document.body.style.overflow = 'hidden';
  renderizarPaso(1);
}

function cerrarCheckout() {
  const overlay = document.getElementById('coOverlay');
  overlay.classList.remove('co-visible');
  setTimeout(() => {
    overlay.setAttribute('hidden', '');
    document.body.style.overflow = '';
  }, 280);
}

/* ═══════════════════════════════════════════════════════════════
   3. BARRA DE PROGRESO
═══════════════════════════════════════════════════════════════ */
function actualizarProgreso() {
  const cont = document.getElementById('coProgreso');
  if (!cont) return;

  let html = '<div class="co-progreso-pasos">';
  LABELS_PASOS.forEach((label, i) => {
    const num = i + 1;
    const clase = num < pasoCo ? 'co-paso-completado' : num === pasoCo ? 'co-paso-activo' : '';
    const circulo = num < pasoCo ? '✓' : num;
    html += `
      <div class="co-progreso-item ${clase}">
        <div class="co-paso-circulo">${circulo}</div>
        <span class="co-paso-label">${label}</span>
      </div>`;
    if (i < LABELS_PASOS.length - 1) {
      html += `<div class="co-progreso-linea ${num < pasoCo ? 'co-linea-completa' : ''}"></div>`;
    }
  });
  html += '</div>';
  cont.innerHTML = html;
}

/* ═══════════════════════════════════════════════════════════════
   4. RENDERIZADO DE PASOS
═══════════════════════════════════════════════════════════════ */
function renderizarPaso(num) {
  pasoCo = num;
  actualizarProgreso();

  const titulo = document.getElementById('coTitulo');
  if (titulo) titulo.textContent = TITULOS[num - 1];

  const cont = document.getElementById('coContenido');
  cont.classList.add('co-saliendo');

  setTimeout(() => {
    cont.classList.remove('co-saliendo');

    switch (num) {
      case 1: cont.innerHTML = htmlPaso1(); attachPaso1(); break;
      case 2: cont.innerHTML = htmlPaso2(); attachPaso2(); break;
      case 3: cont.innerHTML = htmlPaso3(); attachPaso3(); break;
      case 4: cont.innerHTML = htmlPaso4(); attachPaso4(); break;
      case 5: cont.innerHTML = htmlPaso5(); attachPaso5(); break;
    }

    cont.classList.add('co-entrando');
    setTimeout(() => cont.classList.remove('co-entrando'), 260);
    cont.scrollTop = 0;

    renderizarPie(num);
  }, 180);
}

/* ── Pie (botones Atrás / Continuar) ── */
function renderizarPie(num) {
  const pie = document.getElementById('coPie');
  if (!pie) return;

  if (num === 5) { pie.innerHTML = ''; return; }

  const labels = {
    1: 'Continuar',
    2: 'Continuar al pago',
    3: 'Ya realicé el pago &rarr; Enviar comprobante',
    4: 'Enviar pedido por WhatsApp',
  };

  const iconoWA = num === 4
    ? `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
           style="width:17px;height:17px;flex-shrink:0" aria-hidden="true">
         <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.978-1.404A9.955 9.955 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18a7.95 7.95 0 0 1-4.076-1.12l-.292-.173-3.045.859.817-3.02-.19-.31A7.952 7.952 0 0 1 4 12c0-4.418 3.582-8 8-8s8 3.582 8 8-3.582 8-8 8z"/>
       </svg>` : '';

  const iconoFlecha = num < 3
    ? `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
           stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"
           style="width:15px;height:15px" aria-hidden="true">
         <polyline points="9 18 15 12 9 6"/>
       </svg>` : '';

  pie.innerHTML = `
    <div class="co-pie-interior">
      ${num > 1 ? `<button class="co-btn-atras" id="coBtnAtras">← Atrás</button>` : '<div></div>'}
      <button class="co-btn-continuar" id="coBtnContinuar">
        ${iconoWA} ${labels[num]} ${iconoFlecha}
      </button>
    </div>
  `;

  document.getElementById('coBtnAtras')?.addEventListener('click', () => renderizarPaso(pasoCo - 1));
  document.getElementById('coBtnContinuar')?.addEventListener('click', avanzarPaso);
}

function avanzarPaso() {
  const errores = validarPaso();
  if (errores.length) { mostrarErrores(errores); return; }
  guardarPaso();
  if (pasoCo === 4) enviarPorWhatsApp();
  else renderizarPaso(pasoCo + 1);
}

/* ═══════════════════════════════════════════════════════════════
   5. HTML DE CADA PASO
═══════════════════════════════════════════════════════════════ */

/* ── Paso 1: Carrito ── */
function htmlPaso1() {
  const p = co.producto;
  const icono = (typeof ICONOS_SVG !== 'undefined')
    ? (ICONOS_SVG[p.icono] || ICONOS_SVG.generico)
    : '';

  return `
    <div class="co-paso">
      <div class="co-producto-card">
        <div class="co-producto-icono">${icono}</div>
        <div class="co-producto-info">
          <span class="co-producto-etiqueta">${p.etiqueta}</span>
          <h3 class="co-producto-nombre">${p.nombre}</h3>
          <p class="co-producto-desc">${p.descripcion}</p>
        </div>
      </div>

      <div class="co-campo-grupo">
        <label class="co-label" for="coQtyInput">Cantidad</label>
        <div class="co-cantidad-ctrl">
          <button type="button" class="co-qty-btn" id="coQtyMenos" aria-label="Reducir">−</button>
          <input type="number" id="coQtyInput" class="co-qty-input"
                 value="${co.cantidad}" min="1" max="9999" aria-label="Cantidad" />
          <button type="button" class="co-qty-btn" id="coQtyMas" aria-label="Aumentar">+</button>
        </div>
        <span class="co-error" id="coQtyError"></span>
      </div>

      <div class="co-nota-precio">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
             stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
             style="width:15px;height:15px;flex-shrink:0;margin-top:2px" aria-hidden="true">
          <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
        </svg>
        <span>El precio lo confirma nuestro asesor por WhatsApp según disponibilidad.</span>
      </div>
    </div>
  `;
}

function attachPaso1() {
  const input = document.getElementById('coQtyInput');
  if (!input) return;
  document.getElementById('coQtyMenos').addEventListener('click', () => {
    if (parseInt(input.value) > 1) input.value = parseInt(input.value) - 1;
    co.cantidad = parseInt(input.value);
  });
  document.getElementById('coQtyMas').addEventListener('click', () => {
    input.value = parseInt(input.value) + 1;
    co.cantidad = parseInt(input.value);
  });
  input.addEventListener('change', () => {
    const v = parseInt(input.value);
    input.value = (!v || v < 1) ? 1 : v;
    co.cantidad = parseInt(input.value);
  });
}

/* ── Paso 2: Envío ── */
function htmlPaso2() {
  const e = co.envio;
  const optsEstados = ESTADOS_VE.map(est =>
    `<option value="${est}" ${e.estado === est ? 'selected' : ''}>${est}</option>`
  ).join('');

  return `
    <div class="co-paso">
      <p class="co-paso-intro">Completa tus datos de contacto y dirección de entrega.</p>
      <div class="co-form">
        ${campoTexto('Nombre completo', 'coNombre', 'text', e.nombre||'', 'Ej: María García López', true)}
        ${campoTexto('Cédula de identidad', 'coCedula', 'text', e.cedula||'', 'Ej: 12345678', true, 'Solo números, sin puntos ni guiones')}
        ${campoTexto('Teléfono de contacto', 'coTelefono', 'tel', e.telefono||'', 'Ej: 0412-1234567', true, 'Formato: 04XX-XXXXXXX')}

        <div class="co-campo-grupo">
          <label class="co-label" for="coEstado">Estado <span class="co-requerido">*</span></label>
          <select class="co-input" id="coEstado">
            <option value="">Selecciona un estado</option>
            ${optsEstados}
          </select>
          <span class="co-error" id="coEstadoError"></span>
        </div>

        ${campoTexto('Ciudad / Municipio', 'coCiudad', 'text', e.ciudad||'', 'Ej: Maturín', true)}

        <div class="co-campo-grupo">
          <label class="co-label" for="coDireccion">Dirección exacta <span class="co-requerido">*</span></label>
          <textarea class="co-input co-textarea" id="coDireccion"
                    placeholder="Calle, número, urbanización..." rows="3">${e.direccion||''}</textarea>
          <span class="co-error" id="coDireccionError"></span>
        </div>

        ${campoTexto('Punto de referencia', 'coReferencia', 'text', e.referencia||'', 'Ej: Frente al Banco Mercantil', false)}
        ${campoTexto('Nota adicional', 'coNota', 'text', e.nota||'', 'Cualquier detalle que debamos saber', false)}
      </div>
    </div>
  `;
}

function attachPaso2() {
  /* Los datos se leen en guardarPaso() */
}

/* ── Paso 3: Método de pago ── */
function htmlPaso3() {
  const metodos = [
    { id: 'pagoMovil', emoji: '💰', label: 'Pago Móvil',     desc: 'Transferencia bancaria desde tu teléfono' },
    { id: 'zelle',     emoji: '💵', label: 'Zelle',           desc: 'Desde una cuenta bancaria en EE.UU.' },
    { id: 'binance',   emoji: '₿',  label: 'Binance (USDT)', desc: 'Criptomonedas · Red TRC20' },
  ];

  const tarjetas = metodos.map(m => `
    <label class="co-metodo-card ${co.metodo === m.id ? 'co-metodo-activo' : ''}" for="coMetodo_${m.id}">
      <input type="radio" name="coMetodoPago" id="coMetodo_${m.id}"
             value="${m.id}" class="co-radio-oculto" ${co.metodo === m.id ? 'checked' : ''} />
      <span class="co-metodo-emoji">${m.emoji}</span>
      <div class="co-metodo-texto">
        <strong>${m.label}</strong>
        <span>${m.desc}</span>
      </div>
      <span class="co-metodo-check">✓</span>
    </label>
  `).join('');

  return `
    <div class="co-paso">
      <p class="co-paso-intro">Selecciona cómo realizarás el pago:</p>
      <div class="co-metodos" id="coMetodosLista">${tarjetas}</div>
      <div id="coDatosPagoBox"></div>
      <span class="co-error" id="coMetodoError"></span>
    </div>
  `;
}

function attachPaso3() {
  document.querySelectorAll('input[name="coMetodoPago"]').forEach(radio => {
    radio.addEventListener('change', () => {
      co.metodo = radio.value;
      document.querySelectorAll('.co-metodo-card').forEach(c => c.classList.remove('co-metodo-activo'));
      radio.closest('.co-metodo-card').classList.add('co-metodo-activo');
      renderizarDatosPago(radio.value);
      const err = document.getElementById('coMetodoError');
      if (err) err.textContent = '';
    });
  });
  if (co.metodo) renderizarDatosPago(co.metodo);
}

function renderizarDatosPago(metodo) {
  const cont = document.getElementById('coDatosPagoBox');
  if (!cont) return;

  const d = DATOS_PAGO[metodo];
  let filas = '';

  if (metodo === 'pagoMovil') {
    filas = filaDato('Banco',    d.banco,    false)
          + filaDato('Teléfono', d.telefono, true)
          + filaDato('Cédula',   d.cedula,   true)
          + filaDato('Nombre',   d.nombre,   false);
  } else if (metodo === 'zelle') {
    filas = filaDato('Email / Teléfono', d.contacto, true)
          + filaDato('A nombre de',      d.nombre,   false);
  } else if (metodo === 'binance') {
    filas = `<p class="co-dato-red">Red: USDT (TRC20)</p>`
          + filaDato('Dirección wallet', d.wallet, true)
          + filaDato('Pay ID',           d.payId,  true);
  }

  cont.innerHTML = `
    <div class="co-datos-pago-box">
      <p class="co-datos-titulo">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
             stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
             style="width:13px;height:13px" aria-hidden="true">
          <rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/>
        </svg>
        Datos para realizar el pago
      </p>
      ${filas}
    </div>
  `;

  cont.querySelectorAll('.co-btn-copiar').forEach(btn => {
    btn.addEventListener('click', () => copiarTexto(btn.dataset.valor, btn));
  });
}

function filaDato(label, valor, copiable) {
  return `
    <div class="co-dato-fila">
      <span class="co-dato-etiq">${label}:</span>
      <span class="co-dato-val">${valor}</span>
      ${copiable ? `<button type="button" class="co-btn-copiar" data-valor="${escHtml(valor)}" aria-label="Copiar ${label}">📋</button>` : ''}
    </div>
  `;
}

/* ── Paso 4: Comprobante ── */
function htmlPaso4() {
  const hoy = new Date().toISOString().split('T')[0];
  const cb  = co.comprobante;
  let formPago = '';

  if (co.metodo === 'pagoMovil') {
    const optsBancos = BANCOS_VE.map(b =>
      `<option value="${b}" ${cb.bancoOrigen === b ? 'selected' : ''}>${b}</option>`
    ).join('');
    formPago = `
      ${campoTexto('Teléfono desde el que pagó', 'cbTelefono', 'tel', cb.telefono||'', '04XX-XXXXXXX', true)}
      ${campoTexto('Cédula del titular de la cuenta', 'cbCedulaTitular', 'text', cb.cedulaTitular||'', 'Ej: 12345678', true, 'Solo números')}
      <div class="co-campo-grupo">
        <label class="co-label" for="cbBancoOrigen">Banco desde el que pagó <span class="co-requerido">*</span></label>
        <select class="co-input" id="cbBancoOrigen">
          <option value="">Selecciona tu banco</option>
          ${optsBancos}
        </select>
        <span class="co-error" id="cbBancoOrigenError"></span>
      </div>
      ${campoFecha('Fecha del pago', 'cbFecha', cb.fecha||'', hoy, true)}
      ${campoTexto('Número de referencia', 'cbReferencia', 'text', cb.referencia||'', 'Ej: 12345678901', true)}
    `;
  } else if (co.metodo === 'zelle') {
    formPago = `
      ${campoTexto('Nombre del titular que envió', 'cbNombreTitular', 'text', cb.nombreTitular||'', 'Nombre completo', true)}
      ${campoTexto('Email o teléfono Zelle usado', 'cbContactoZelle', 'text', cb.contactoZelle||'', 'email@ejemplo.com', true)}
      ${campoFecha('Fecha del pago', 'cbFecha', cb.fecha||'', hoy, true)}
      ${campoTexto('Monto enviado (USD)', 'cbMonto', 'number', cb.monto||'', 'Ej: 25.00', true, 'En dólares americanos')}
    `;
  } else if (co.metodo === 'binance') {
    formPago = `
      ${campoTexto('TxID / Hash de la transacción', 'cbTxid', 'text', cb.txid||'', 'Hash de la tx en la blockchain', true)}
      ${campoFecha('Fecha del pago', 'cbFecha', cb.fecha||'', hoy, true)}
      ${campoTexto('Monto enviado (USDT)', 'cbMonto', 'number', cb.monto||'', 'Ej: 25.00', true, 'En USDT')}
    `;
  }

  return `
    <div class="co-paso">
      <p class="co-paso-intro">Completa los datos del pago realizado y sube el comprobante.</p>
      <div class="co-form">
        ${formPago}

        <div class="co-campo-grupo">
          <label class="co-label">Comprobante de pago <span class="co-requerido">*</span></label>
          <div class="co-dropzone" id="coDropzone" tabindex="0" role="button" aria-label="Subir comprobante de pago">
            <div class="co-dropzone-inner" id="coDzInner">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                   stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="17 8 12 3 7 8"/>
                <line x1="12" y1="3" x2="12" y2="15"/>
              </svg>
              <div class="co-dz-textos">
                <strong>Arrastra aquí tu comprobante</strong>
                <span>o haz clic para seleccionar</span>
                <span class="co-dz-hint">PNG, JPG o PDF · máx. 5 MB</span>
              </div>
            </div>
            <div class="co-preview-wrap" id="coPreviewWrap" style="display:none"></div>
            <input type="file" id="coFileInput" class="co-file-input"
                   accept="image/jpeg,image/png,image/gif,image/webp,application/pdf"
                   aria-label="Seleccionar archivo del comprobante" />
          </div>
          <span class="co-error" id="coArchivoError"></span>
        </div>
      </div>
    </div>
  `;
}

function attachPaso4() {
  const dropzone = document.getElementById('coDropzone');
  const fileInput = document.getElementById('coFileInput');
  if (!dropzone || !fileInput) return;

  /* Clic en zona → selector de archivo */
  dropzone.addEventListener('click', e => {
    if (e.target.id === 'coBtnQuitarArchivo') return;
    fileInput.click();
  });
  dropzone.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); fileInput.click(); }
  });

  /* Drag & drop */
  dropzone.addEventListener('dragover', e => { e.preventDefault(); dropzone.classList.add('co-dropzone-hover'); });
  dropzone.addEventListener('dragleave', ()  => dropzone.classList.remove('co-dropzone-hover'));
  dropzone.addEventListener('drop', e => {
    e.preventDefault();
    dropzone.classList.remove('co-dropzone-hover');
    if (e.dataTransfer.files[0]) procesarArchivo(e.dataTransfer.files[0]);
  });

  fileInput.addEventListener('change', () => {
    if (fileInput.files[0]) procesarArchivo(fileInput.files[0]);
  });

  /* Si ya existe un archivo previo, mostrarlo */
  if (co.archivo) mostrarPreview(co.archivo);
}

function procesarArchivo(archivo) {
  const errEl = document.getElementById('coArchivoError');
  if (archivo.size > 5 * 1024 * 1024) {
    if (errEl) errEl.textContent = 'El archivo no puede superar 5 MB.';
    return;
  }
  const tiposOK = ['image/jpeg','image/png','image/gif','image/webp','application/pdf'];
  if (!tiposOK.includes(archivo.type)) {
    if (errEl) errEl.textContent = 'Solo se permiten imágenes (JPG, PNG, GIF, WEBP) o PDF.';
    return;
  }
  if (errEl) errEl.textContent = '';
  co.archivo = archivo;
  mostrarPreview(archivo);
}

function mostrarPreview(archivo) {
  const wrap    = document.getElementById('coPreviewWrap');
  const dzInner = document.getElementById('coDzInner');
  const dz      = document.getElementById('coDropzone');
  if (!wrap) return;

  dz.classList.add('co-dropzone-lleno');
  wrap.style.display = 'flex';
  if (dzInner) dzInner.style.display = 'none';

  const ext = archivo.name.split('.').pop().toUpperCase();

  if (archivo.type.startsWith('image/')) {
    const reader = new FileReader();
    reader.onload = ev => {
      wrap.innerHTML = `
        <div class="co-preview-img">
          <img src="${ev.target.result}" alt="Vista previa del comprobante" />
        </div>
        <div class="co-preview-info">
          <p class="co-preview-nombre">${archivo.name}</p>
          <p class="co-preview-tipo">Imagen · ${(archivo.size / 1024).toFixed(0)} KB</p>
        </div>
        <button type="button" class="co-btn-quitar" id="coBtnQuitarArchivo" aria-label="Quitar archivo">✕</button>
      `;
      document.getElementById('coBtnQuitarArchivo')?.addEventListener('click', e => { e.stopPropagation(); quitarArchivo(); });
    };
    reader.readAsDataURL(archivo);
  } else {
    wrap.innerHTML = `
      <div class="co-preview-pdf-icono">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
             stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
          <polyline points="14 2 14 8 20 8"/>
        </svg>
      </div>
      <div class="co-preview-info">
        <p class="co-preview-nombre">${archivo.name}</p>
        <p class="co-preview-tipo">${ext} · ${(archivo.size / 1024).toFixed(0)} KB</p>
      </div>
      <button type="button" class="co-btn-quitar" id="coBtnQuitarArchivo" aria-label="Quitar archivo">✕</button>
    `;
    document.getElementById('coBtnQuitarArchivo')?.addEventListener('click', e => { e.stopPropagation(); quitarArchivo(); });
  }
}

function quitarArchivo() {
  co.archivo = null;
  const wrap    = document.getElementById('coPreviewWrap');
  const dzInner = document.getElementById('coDzInner');
  const dz      = document.getElementById('coDropzone');
  const fi      = document.getElementById('coFileInput');
  if (wrap)    { wrap.innerHTML = ''; wrap.style.display = 'none'; }
  if (dzInner) dzInner.style.display = '';
  if (dz)      dz.classList.remove('co-dropzone-lleno');
  if (fi)      fi.value = '';
}

/* ── Paso 5: Confirmación ── */
function htmlPaso5() {
  return `
    <div class="co-paso co-paso-confirmacion">
      <div class="co-confirm-icono">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
             stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
          <polyline points="22 4 12 14.01 9 11.01"/>
        </svg>
      </div>
      <h3 class="co-confirm-titulo">¡Pedido enviado!</h3>
      <p class="co-confirm-texto">
        En breve un asesor de <strong>Jufa Suministros</strong> se comunicará contigo para confirmar tu compra.
      </p>
      <p class="co-confirm-sub">
        Recuerda adjuntar el comprobante de pago en el chat de WhatsApp.
      </p>
      <button class="co-btn-cerrar-final" id="coBtnCerrarFinal">
        Volver al catálogo
      </button>
    </div>
  `;
}

function attachPaso5() {
  document.getElementById('coBtnCerrarFinal')?.addEventListener('click', cerrarCheckout);
}

/* ═══════════════════════════════════════════════════════════════
   6. VALIDACIÓN
═══════════════════════════════════════════════════════════════ */
function validarPaso() {
  limpiarErrores();
  const errs = [];

  if (pasoCo === 1) {
    const qty = parseInt(g('coQtyInput')?.value);
    if (!qty || qty < 1) errs.push({ id: 'coQtyError', msg: 'La cantidad debe ser al menos 1.' });
  }

  if (pasoCo === 2) {
    if (!v('coNombre'))   errs.push({ id: 'coNombreError',   msg: 'El nombre completo es obligatorio.' });
    if (!v('coCedula'))   errs.push({ id: 'coCedulaError',   msg: 'La cédula es obligatoria.' });
    else if (!/^\d+$/.test(v('coCedula').replace(/[\s.\-]/g, '')))
                          errs.push({ id: 'coCedulaError',   msg: 'La cédula debe contener solo números.' });
    if (!v('coTelefono')) errs.push({ id: 'coTelefonoError', msg: 'El teléfono es obligatorio.' });
    else if (!/^(0?(412|414|416|424|426|212)[\-\s]?\d{7})$/.test(v('coTelefono').replace(/[\s\-]/g,'')))
                          errs.push({ id: 'coTelefonoError', msg: 'Formato inválido. Ej: 0412-1234567' });
    if (!v('coEstado'))   errs.push({ id: 'coEstadoError',   msg: 'Selecciona un estado.' });
    if (!v('coCiudad'))   errs.push({ id: 'coCiudadError',   msg: 'La ciudad es obligatoria.' });
    if (!v('coDireccion'))errs.push({ id: 'coDireccionError',msg: 'La dirección es obligatoria.' });
  }

  if (pasoCo === 3) {
    if (!co.metodo) errs.push({ id: 'coMetodoError', msg: 'Selecciona un método de pago.' });
  }

  if (pasoCo === 4) {
    if (!co.archivo) errs.push({ id: 'coArchivoError', msg: 'Debes adjuntar el comprobante de pago.' });

    if (co.metodo === 'pagoMovil') {
      if (!v('cbTelefono'))      errs.push({ id: 'cbTelefonoError',      msg: 'El teléfono es obligatorio.' });
      if (!v('cbCedulaTitular')) errs.push({ id: 'cbCedulaTitularError', msg: 'La cédula del titular es obligatoria.' });
      else if (!/^\d+$/.test(v('cbCedulaTitular').replace(/[\s.\-]/g,'')))
                                 errs.push({ id: 'cbCedulaTitularError', msg: 'Solo números.' });
      if (!v('cbBancoOrigen'))   errs.push({ id: 'cbBancoOrigenError',   msg: 'Selecciona tu banco.' });
      if (!v('cbFecha'))         errs.push({ id: 'cbFechaError',         msg: 'La fecha es obligatoria.' });
      if (!v('cbReferencia'))    errs.push({ id: 'cbReferenciaError',    msg: 'El número de referencia es obligatorio.' });
    }
    if (co.metodo === 'zelle') {
      if (!v('cbNombreTitular')) errs.push({ id: 'cbNombreTitularError', msg: 'El nombre del titular es obligatorio.' });
      if (!v('cbContactoZelle')) errs.push({ id: 'cbContactoZelleError', msg: 'El email o teléfono Zelle es obligatorio.' });
      if (!v('cbFecha'))         errs.push({ id: 'cbFechaError',         msg: 'La fecha es obligatoria.' });
      if (!v('cbMonto'))         errs.push({ id: 'cbMontoError',         msg: 'El monto enviado es obligatorio.' });
    }
    if (co.metodo === 'binance') {
      if (!v('cbTxid'))  errs.push({ id: 'cbTxidError',  msg: 'El TxID de la transacción es obligatorio.' });
      if (!v('cbFecha')) errs.push({ id: 'cbFechaError', msg: 'La fecha es obligatoria.' });
      if (!v('cbMonto')) errs.push({ id: 'cbMontoError', msg: 'El monto enviado es obligatorio.' });
    }
  }

  return errs;
}

function mostrarErrores(errores) {
  errores.forEach(({ id, msg }) => {
    const el = document.getElementById(id);
    if (el) el.textContent = msg;
    /* Marcar el input correspondiente */
    const inputId = id.replace('Error', '');
    const input = document.getElementById(inputId);
    if (input) input.classList.add('co-input-error');
  });
  /* Scroll al primer error visible */
  const primero = document.querySelector('.co-error:not(:empty)');
  if (primero) primero.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function limpiarErrores() {
  document.querySelectorAll('.co-error').forEach(el => { el.textContent = ''; });
  document.querySelectorAll('.co-input-error').forEach(el => el.classList.remove('co-input-error'));
}

/* ═══════════════════════════════════════════════════════════════
   7. GUARDAR DATOS DE CADA PASO
═══════════════════════════════════════════════════════════════ */
function guardarPaso() {
  if (pasoCo === 1) {
    co.cantidad = parseInt(g('coQtyInput')?.value) || 1;
  }
  if (pasoCo === 2) {
    co.envio = {
      nombre:     v('coNombre'),
      cedula:     v('coCedula'),
      telefono:   v('coTelefono'),
      estado:     v('coEstado'),
      ciudad:     v('coCiudad'),
      direccion:  v('coDireccion'),
      referencia: v('coReferencia'),
      nota:       v('coNota'),
    };
  }
  /* Paso 3: co.metodo ya se guarda en el evento 'change' */
  if (pasoCo === 4) {
    if (co.metodo === 'pagoMovil') {
      co.comprobante = {
        telefono:      v('cbTelefono'),
        cedulaTitular: v('cbCedulaTitular'),
        bancoOrigen:   v('cbBancoOrigen'),
        fecha:         v('cbFecha'),
        referencia:    v('cbReferencia'),
      };
    } else if (co.metodo === 'zelle') {
      co.comprobante = {
        nombreTitular: v('cbNombreTitular'),
        contactoZelle: v('cbContactoZelle'),
        fecha:         v('cbFecha'),
        monto:         v('cbMonto'),
      };
    } else if (co.metodo === 'binance') {
      co.comprobante = {
        txid:  v('cbTxid'),
        fecha: v('cbFecha'),
        monto: v('cbMonto'),
      };
    }
  }
}

/* ═══════════════════════════════════════════════════════════════
   8. MENSAJE DE WHATSAPP Y ENVÍO
═══════════════════════════════════════════════════════════════ */
function construirMensaje() {
  const p  = co.producto;
  const e  = co.envio;
  const cb = co.comprobante;
  const metodosLabel = { pagoMovil: 'Pago Móvil', zelle: 'Zelle', binance: 'Binance (USDT)' };

  let detallesPago = '';
  if (co.metodo === 'pagoMovil') {
    detallesPago = [
      `Teléfono pagador: ${cb.telefono}`,
      `Cédula titular:   ${cb.cedulaTitular}`,
      `Banco:            ${cb.bancoOrigen}`,
      `Fecha:            ${cb.fecha}`,
      `Referencia:       ${cb.referencia}`,
    ].join('\n');
  } else if (co.metodo === 'zelle') {
    detallesPago = [
      `Titular: ${cb.nombreTitular}`,
      `Zelle:   ${cb.contactoZelle}`,
      `Fecha:   ${cb.fecha}`,
      `Monto:   $${cb.monto} USD`,
    ].join('\n');
  } else if (co.metodo === 'binance') {
    detallesPago = [
      `TxID:  ${cb.txid}`,
      `Fecha: ${cb.fecha}`,
      `Monto: ${cb.monto} USDT`,
    ].join('\n');
  }

  const lineas = [
    '🛒 *NUEVO PEDIDO — Jufa Suministros*',
    '',
    `📦 *Producto:* ${p.nombre} x${co.cantidad}`,
    '',
    '👤 *Datos del cliente:*',
    `Nombre:    ${e.nombre}`,
    `Cédula:    ${e.cedula}`,
    `Teléfono:  ${e.telefono}`,
    `Estado:    ${e.estado}`,
    `Ciudad:    ${e.ciudad}`,
    `Dirección: ${e.direccion}`,
    e.referencia ? `Referencia: ${e.referencia}` : null,
    e.nota       ? `Nota:       ${e.nota}`        : null,
    '',
    `💳 *Método de pago:* ${metodosLabel[co.metodo]}`,
    detallesPago,
    '',
    '📎 *El cliente adjuntará el comprobante en este chat.*',
  ];

  return lineas.filter(l => l !== null).join('\n');
}

function enviarPorWhatsApp() {
  guardarPaso();
  const msg = construirMensaje();
  const url = `https://wa.me/${WA_NUMERO}?text=${encodeURIComponent(msg)}`;
  window.open(url, '_blank', 'noopener,noreferrer');
  renderizarPaso(5);
}

/* ═══════════════════════════════════════════════════════════════
   9. UTILIDADES
═══════════════════════════════════════════════════════════════ */

/* Obtener elemento por ID */
function g(id) { return document.getElementById(id); }

/* Obtener valor de un campo */
function v(id) { const el = g(id); return el ? el.value.trim() : ''; }

/* Escape básico para evitar XSS en atributos HTML */
function escHtml(s) {
  return String(s||'')
    .replace(/&/g,'&amp;').replace(/"/g,'&quot;')
    .replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

/* Generar HTML de un campo de texto */
function campoTexto(label, id, tipo, val, placeholder, requerido, hint) {
  return `
    <div class="co-campo-grupo">
      <label class="co-label" for="${id}">${label}${requerido ? ' <span class="co-requerido">*</span>' : ''}</label>
      <input type="${tipo}" id="${id}" class="co-input"
             value="${escHtml(val)}" placeholder="${escHtml(placeholder)}"
             ${requerido ? 'required' : ''} autocomplete="off" />
      ${hint ? `<span class="co-hint">${hint}</span>` : ''}
      <span class="co-error" id="${id}Error"></span>
    </div>
  `;
}

/* Generar HTML de un campo de fecha */
function campoFecha(label, id, val, maxFecha, requerido) {
  return `
    <div class="co-campo-grupo">
      <label class="co-label" for="${id}">${label}${requerido ? ' <span class="co-requerido">*</span>' : ''}</label>
      <input type="date" id="${id}" class="co-input"
             value="${val}" max="${maxFecha}" ${requerido ? 'required' : ''} />
      <span class="co-error" id="${id}Error"></span>
    </div>
  `;
}

/* Copiar al portapapeles con feedback visual en el botón */
function copiarTexto(texto, boton) {
  const original = boton.textContent;
  const exito = () => {
    boton.textContent = '✅';
    boton.classList.add('co-copiado');
    setTimeout(() => { boton.textContent = original; boton.classList.remove('co-copiado'); }, 1800);
  };
  if (navigator.clipboard?.writeText) {
    navigator.clipboard.writeText(texto).then(exito).catch(() => copiarFallback(texto, exito));
  } else {
    copiarFallback(texto, exito);
  }
}

/* Fallback para navegadores sin Clipboard API */
function copiarFallback(texto, cb) {
  const el = document.createElement('textarea');
  el.value = texto;
  el.style.cssText = 'position:fixed;top:-9999px;opacity:0';
  document.body.appendChild(el);
  el.select();
  try { document.execCommand('copy'); cb(); } catch(_) {}
  document.body.removeChild(el);
}

/* ═══════════════════════════════════════════════════════════════
   10. INICIALIZACIÓN
═══════════════════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  /* Solo inicializar en la página del catálogo */
  if (!document.getElementById('gridProductos')) return;

  /* Inyectar el modal en el DOM */
  inyectarModal();

  /* Botón X del modal */
  g('coCerrar').addEventListener('click', cerrarCheckout);

  /* Clic en overlay (fuera del modal) → cerrar */
  g('coOverlay').addEventListener('click', e => {
    if (e.target === g('coOverlay')) cerrarCheckout();
  });

  /* Tecla Escape → cerrar */
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      const ov = g('coOverlay');
      if (ov && !ov.hasAttribute('hidden')) cerrarCheckout();
    }
  });

  /* Delegación de eventos para botones "Comprar" del grid de productos */
  g('gridProductos').addEventListener('click', e => {
    const btn = e.target.closest('.btn-comprar');
    if (!btn) return;
    const id = parseInt(btn.dataset.productoId, 10);
    const prod = (typeof PRODUCTOS !== 'undefined') ? PRODUCTOS.find(p => p.id === id) : null;
    if (prod) abrirCheckout(prod);
  });
});
