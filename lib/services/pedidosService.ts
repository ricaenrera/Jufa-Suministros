import type { Pedido, StatusPedido } from '@/types/pedido';

export async function crearPedido(pedido: Omit<Pedido, 'id' | 'creadoEn' | 'status'>): Promise<Pedido> {
  // Supabase integration pending — returns stub
  return {
    ...pedido,
    id: crypto.randomUUID(),
    status: 'pendiente',
    creadoEn: new Date().toISOString(),
  };
}

export async function getPedidoById(id: string): Promise<Pedido | null> {
  // Supabase integration pending
  void id;
  return null;
}

export async function actualizarStatus(id: string, status: StatusPedido): Promise<void> {
  // Supabase integration pending
  void id;
  void status;
}

export async function getPedidosPendientes(): Promise<Pedido[]> {
  // Supabase integration pending
  return [];
}
