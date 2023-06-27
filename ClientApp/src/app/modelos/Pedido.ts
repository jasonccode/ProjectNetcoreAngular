import { LineaPedido } from "./lineapedido";

export interface Pedido {
  email: string;
  DetallesPedido?: LineaPedido[];
}
