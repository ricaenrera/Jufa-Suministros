'use client';

interface PasoConfirmacionProps {
  onCerrar: () => void;
}

export default function PasoConfirmacion({ onCerrar }: PasoConfirmacionProps) {
  return (
    <div className="co-paso co-paso-confirmacion">
      <div className="co-confirm-icono">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
          <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
      </div>
      <h3 className="co-confirm-titulo">¡Pedido enviado!</h3>
      <p className="co-confirm-texto">
        En breve un asesor de <strong>Jufa Suministros</strong> se comunicará contigo para confirmar tu compra.
      </p>
      <p className="co-confirm-sub">
        Recuerda adjuntar el comprobante de pago en el chat de WhatsApp.
      </p>
      <button className="co-btn-cerrar-final" onClick={onCerrar}>
        Volver al catálogo
      </button>
    </div>
  );
}
