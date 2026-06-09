import Link from 'next/link';

const CATEGORIAS = [
  {
    id: 'proteccion',
    titulo: 'Equipos de Protección Personal',
    descripcion: 'Guantes, mascarillas, lentes, trajes',
    icono: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
  {
    id: 'curacion',
    titulo: 'Material de Curación',
    descripcion: 'Vendas, gasas, esparadrapos, apósitos',
    icono: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    ),
  },
  {
    id: 'diagnostico',
    titulo: 'Equipos de Diagnóstico',
    descripcion: 'Tensiómetros, estetoscopios, oxímetros',
    icono: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3" />
        <path d="M8 15v1a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6v-4" />
        <circle cx="20" cy="10" r="2" />
      </svg>
    ),
  },
  {
    id: 'descartables',
    titulo: 'Descartables',
    descripcion: 'Jeringas, catéteres, sondas, guías',
    icono: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="m18 2 4 4" /><path d="m17 7 3-3" />
        <path d="M19 9 8.7 19.3c-1 1-2.5 1-3.4 0l-.6-.6c-1-1-1-2.5 0-3.4L15 5" />
        <path d="m9 11 4 4" /><path d="m5 19-3 3" /><path d="m14 4 6 6" />
      </svg>
    ),
  },
];

export default function CategoriasDestacadas() {
  return (
    <section className="seccion-categorias" aria-label="Categorías de productos">
      <div className="contenedor">
        <div className="seccion-cabecera" data-animar="">
          <span className="seccion-etiqueta">Lo que ofrecemos</span>
          <h2>Categorías destacadas</h2>
          <p>Explora nuestra variedad de insumos médicos organizados por categoría para encontrar lo que necesitas rápidamente.</p>
        </div>

        <div className="grid-categorias">
          {CATEGORIAS.map((cat, i) => (
            <Link
              key={cat.id}
              href={`/catalogo?cat=${cat.id}`}
              className="tarjeta-categoria"
              data-animar=""
              data-delay={i + 1}
            >
              <div className="categoria-icono">{cat.icono}</div>
              <h3>{cat.titulo}</h3>
              <p>{cat.descripcion}</p>
              <span className="ver-mas">
                Ver productos
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
