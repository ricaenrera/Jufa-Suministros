-- Jufa Suministros — Supabase Schema

create table if not exists productos (
  id          serial primary key,
  nombre      text not null,
  categoria   text not null,
  etiqueta    text not null,
  descripcion text not null,
  icono       text not null,
  activo      boolean default true,
  creado_en   timestamptz default now()
);

create table if not exists pedidos (
  id              uuid primary key default gen_random_uuid(),
  producto_id     integer references productos(id),
  producto_nombre text not null,
  cantidad        integer not null default 1,
  -- datos envío
  envio_nombre    text not null,
  envio_cedula    text not null,
  envio_telefono  text not null,
  envio_estado    text not null,
  envio_ciudad    text not null,
  envio_direccion text not null,
  envio_referencia text,
  envio_nota      text,
  -- pago
  metodo_pago     text not null,  -- 'pagoMovil' | 'zelle' | 'binance'
  comprobante_json jsonb,          -- datos específicos del método
  archivo_nombre  text,
  -- control
  status          text not null default 'pendiente',
  creado_en       timestamptz default now()
);

-- Row Level Security (habilitar después de configurar auth)
-- alter table pedidos enable row level security;
