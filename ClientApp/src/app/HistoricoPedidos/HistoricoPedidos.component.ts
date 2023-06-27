import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { environment } from '../../environments/environment';
import { AuthAPI } from '../modelos/authAPI';
import { Cliente } from '../modelos/cliente';
import { ProductoService } from '../services/producto.service';
import { UsuarioApiService } from '../services/usuarioApi.service';
import { PedidoDetalle } from '../modelos/PedidoDetalle';
@Component({
  selector: 'app-HistoricoPedidos-component',
  templateUrl: './HistoricoPedidos.component.html',
})
export class HistoricoPedidosComponent implements OnInit {
  usuarioAPI: AuthAPI;
  cliente: Cliente;
  listaPedidos: PedidoDetalle[];
  detalleAux: number = 0;
  @ViewChild('myModalInfo', { static: false }) myModalInfo: TemplateRef<any>;

  constructor(
    private servicioLogin: UsuarioApiService,
    private servicioProducto: ProductoService,
    private modalService: NgbModal
  ) {
    this.usuarioAPI = {
      email: environment.usuarioAPI,
      password: environment.passAPI,
    };
  }

  ngOnInit(): void {
    //Login API
    if (sessionStorage.getItem('token') == null) {
      this.servicioLogin.loginAPI(this.usuarioAPI).subscribe((res) => {
        if (res.error != null && res.error != '')
          console.log('Error obtener token');
        else this.damePedidos();
      });
    } else {
      this.damePedidos();
    }
  }

  damePedidos(): void {
    let usuarioSesion = JSON.parse(localStorage.getItem('emailLogin') || '{}');
    this.cliente = { email: usuarioSesion.email };
    this.servicioProducto.ObtenerPedidos(this.cliente).subscribe((res) => {
      if (res.error != null && res.error != '') {
        console.log('Error obtener pedidos');
      } else this.listaPedidos = res.objetoGenerico;

      //console.log(this.listaPedidos);
      //console.log(this.listaPedidos[0]);
      //console.log(this.listaPedidos[0].total);
      //console.log(this.listaPedidos[0].detallesProductosPedido[0].nombreProducto);
    });
  }

  detalles(indice: number) {
    this.detalleAux = indice;
    this.modalService.open(this.myModalInfo);
    //console.log(this.listaPedidos[indice].detallesProductosPedido[0].nombreProducto)
  }
}
