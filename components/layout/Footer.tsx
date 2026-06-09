import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="footer" aria-label="Pie de página">
      <div className="contenedor">
        <div className="footer-grid">

          <div className="footer-marca">
            <Link href="/" className="logo-link" style={{ marginBottom: '14px' }}>
              <Image src="/logo.jpg" alt="Logo Jufa Suministros" width={44} height={44} className="logo-img" style={{ height: '44px', width: '44px' }} />
              <div className="logo-texto">
                <span className="logo-nombre">Jufa Suministros</span>
                <span className="logo-slogan">Insumos médicos de calidad</span>
              </div>
            </Link>
            <p className="footer-descripcion">
              Tu proveedor de confianza en insumos médicos en Maturín, Estado Monagas. Calidad, disponibilidad y atención personalizada.
            </p>
          </div>

          <div>
            <p className="footer-titulo">Páginas</p>
            <nav className="footer-links" aria-label="Navegación del footer">
              <Link href="/">Inicio</Link>
              <Link href="/catalogo">Catálogo de productos</Link>
              <Link href="/#nosotros">Nosotros</Link>
              <Link href="/#contacto">Contacto</Link>
            </nav>
          </div>

          <div>
            <p className="footer-titulo">Contacto</p>
            <div>
              <div className="footer-contacto-item">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
                </svg>
                <span>Av. Fuerzas Armadas, Maturín, Monagas</span>
              </div>
              <div className="footer-contacto-item">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
                <a href="https://instagram.com/jufasuministros" target="_blank" rel="noopener noreferrer">@jufasuministros</a>
              </div>
              <div className="footer-contacto-item">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" style={{ width: '16px', height: '16px' }} aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.978-1.404A9.955 9.955 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2z" />
                </svg>
                <a href="https://wa.me/584121017811" target="_blank" rel="noopener noreferrer">Escribir por WhatsApp</a>
              </div>
              <div className="footer-contacto-item">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '16px', height: '16px', color: 'var(--azul-claro)', flexShrink: 0 }} aria-hidden="true">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2.22h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 9.91A16 16 0 0 0 13 15l.96-.96a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 20.9 16.22z" />
                </svg>
                <a href="tel:+584121017811">Llámanos: +58 412-1017811</a>
              </div>
            </div>
          </div>

        </div>

        <div className="footer-divider" />

        <div className="footer-bottom">
          <p className="footer-copyright">
            &copy; 2025 Jufa Suministros. Todos los derechos reservados. Maturín, Venezuela.
          </p>
          <div className="footer-social">
            <a href="https://instagram.com/jufasuministros" target="_blank" rel="noopener noreferrer" aria-label="Instagram de Jufa Suministros">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
              @jufasuministros
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
