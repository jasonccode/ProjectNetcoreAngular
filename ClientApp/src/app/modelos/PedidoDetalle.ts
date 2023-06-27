import { PedidoDetalleProducto } from "./PedidoDetalleProducto";

export interface PedidoDetalle {
  total: number;
  detallesProductosPedido: PedidoDetalleProducto[]
}
