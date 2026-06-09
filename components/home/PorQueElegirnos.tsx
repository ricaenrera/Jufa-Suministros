export default function PorQueElegirnos() {
  return (
    <section className="seccion-porque" id="nosotros" aria-label="Ventajas">
      <div className="contenedor">
        <div className="seccion-cabecera" data-animar="">
          <span className="seccion-etiqueta">Nuestros valores</span>
          <h2>¿Por qué elegirnos?</h2>
          <p>Somos tu aliado local en el sector salud. Conocemos las necesidades de nuestra región y trabajamos para satisfacerlas.</p>
        </div>

        <div className="grid-ventajas">
          <div className="tarjeta-ventaja" data-animar="" data-delay="1">
            <div className="ventaja-icono">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <polyline points="9 12 11 14 15 10" />
              </svg>
            </div>
            <h3>Calidad certificada</h3>
            <p>Todos nuestros productos cumplen con los estándares de calidad del sector salud. Trabajamos solo con proveedores reconocidos y confiables.</p>
          </div>

          <div className="tarjeta-ventaja" data-animar="" data-delay="2">
            <div className="ventaja-icono">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
            </div>
            <h3>Disponibilidad constante</h3>
            <p>Mantenemos inventario actualizado para que siempre encuentres lo que necesitas. Respondemos consultas con rapidez por WhatsApp e Instagram.</p>
          </div>

          <div className="tarjeta-ventaja" data-animar="" data-delay="3">
            <div className="ventaja-icono">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </div>
            <h3>Atención personalizada</h3>
            <p>Nuestro equipo te asesora para que encuentres el producto ideal según tus necesidades clínicas o personales, con un trato cercano y profesional.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
