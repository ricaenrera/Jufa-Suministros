'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export default function Header() {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => setMenuAbierto((v) => !v);
  const cerrarMenu = () => setMenuAbierto(false);

  const esInicio = pathname === '/';
  const esCatalogo = pathname.startsWith('/catalogo');

  return (
    <header className="header" id="header">
      <div className="contenedor header-inner">

        <Link href="/" className="logo-link" aria-label="Ir al inicio">
          <Image src="/logo.jpg" alt="Logo Jufa Suministros" width={48} height={48} className="logo-img" />
          <div className="logo-texto">
            <span className="logo-nombre">Jufa Suministros</span>
            <span className="logo-slogan">Insumos médicos de calidad</span>
          </div>
        </Link>

        <nav className="nav-desktop" aria-label="Navegación principal">
          <Link href="/" className={esInicio ? 'activo' : ''}>Inicio</Link>
          <Link href="/catalogo" className={esCatalogo ? 'activo' : ''}>Catálogo</Link>
          <Link href="/#nosotros">Nosotros</Link>
          <Link href="/#contacto">Contacto</Link>
        </nav>

        <button
          className={`btn-menu${menuAbierto ? ' abierto' : ''}`}
          id="btnMenu"
          aria-label="Abrir menú"
          aria-expanded={menuAbierto}
          onClick={toggleMenu}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <nav className={`nav-movil${menuAbierto ? ' visible' : ''}`} id="navMovil" aria-label="Menú móvil">
        <Link href="/" onClick={cerrarMenu}>Inicio</Link>
        <Link href="/catalogo" onClick={cerrarMenu}>Catálogo</Link>
        <Link href="/#nosotros" onClick={cerrarMenu}>Nosotros</Link>
        <Link href="/#contacto" onClick={cerrarMenu}>Contacto</Link>
      </nav>
    </header>
  );
}
