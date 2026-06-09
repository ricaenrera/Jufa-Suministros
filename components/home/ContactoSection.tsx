export default function ContactoSection() {
  return (
    <section className="seccion-contacto" id="contacto" aria-label="Información de contacto">
      <div className="contenedor">
        <div className="seccion-cabecera" data-animar="">
          <span className="seccion-etiqueta">Estamos aquí para ti</span>
          <h2>Contáctanos</h2>
          <p>Visítanos en nuestra tienda o escríbenos por redes sociales. Respondemos a la brevedad posible.</p>
        </div>

        <div className="contacto-grid">
          <div className="contacto-item" data-animar="" data-delay="1">
            <div className="contacto-icono">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
              </svg>
            </div>
            <div className="contacto-texto">
              <strong>Dirección</strong>
              <span>Av. Fuerzas Armadas,<br />Maturín, Estado Monagas,<br />Venezuela</span>
            </div>
          </div>

          <div className="contacto-item" data-animar="" data-delay="2">
            <div className="contacto-icono">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </div>
            <div className="contacto-texto">
              <strong>Instagram</strong>
              <a href="https://instagram.com/jufasuministros" target="_blank" rel="noopener noreferrer">@jufasuministros</a>
            </div>
          </div>

          <div className="contacto-item" data-animar="" data-delay="3">
            <div className="contacto-icono">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.978-1.404A9.955 9.955 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18a7.95 7.95 0 0 1-4.076-1.12l-.292-.173-3.045.859.817-3.02-.19-.31A7.952 7.952 0 0 1 4 12c0-4.418 3.582-8 8-8s8 3.582 8 8-3.582 8-8 8z" />
              </svg>
            </div>
            <div className="contacto-texto">
              <strong>WhatsApp</strong>
              <a href="https://wa.me/584121017811" target="_blank" rel="noopener noreferrer">Escríbenos ahora</a>
            </div>
          </div>

          <div className="contacto-item" data-animar="" data-delay="4">
            <div className="contacto-icono">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
              </svg>
            </div>
            <div className="contacto-texto">
              <strong>Horario</strong>
              <span>Lun – Sáb: 8:00 am – 6:00 pm</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
