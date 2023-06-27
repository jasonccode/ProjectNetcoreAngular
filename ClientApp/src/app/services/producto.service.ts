import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Resultado } from '../modelos/resultado';
import { Pedido } from '../modelos/Pedido';
import { Cliente } from '../modelos/cliente';

@Injectable({
  providedIn: 'root',
})
export class ProductoService {
  url: string = 'https://localhost:7185/API/productos/';
  constructor(private peticion: HttpClient) {}

  dameProductos(): Observable<Resultado> {
    return this.peticion.get<Resultado>(this.url);
  }

  AgregarPedido(pedido: Pedido): Observable<Resultado> {
    return this.peticion.post<Resultado>(this.url, pedido);
  }

  ObtenerPedidos(cliente: Cliente): Observable<Resultado> {
    return this.peticion.post<Resultado>(this.url + 'Pedidos', cliente);
  }
}
