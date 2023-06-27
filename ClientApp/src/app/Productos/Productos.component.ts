import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { environment } from '../../environments/environment';
import { AuthAPI } from '../modelos/authAPI';
import { ProductoService } from '../services/producto.service';
import { UsuarioApiService } from '../services/usuarioApi.service';
import { Pedido } from '../modelos/Pedido';
import { LineaPedido } from '../modelos/lineapedido';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-Productos-component',
  templateUrl: './Productos.component.html',
})
export class ProductoComponent implements OnInit {
  public listaProductos!: any[];
  usuarioAPI: AuthAPI;
  pedido: Pedido;
  lineasPedido: LineaPedido[];
  public TotalPedido: number = 0;
  public resultadoPedido: string = '';
  @ViewChild('myModalInfo', { static: false }) myModalInfo:
    | TemplateRef<any>
    | undefined;

  constructor(
    private servicioProducto: ProductoService,
    private servicioLogin: UsuarioApiService,
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
        else {
          this.dameProductos();
        }
      });
    }
  }

  dameProductos() {
    this.servicioProducto.dameProductos().subscribe((res) => {
      this.listaProductos = res.objetoGenerico;
    });
  }

  agregarProducto(indice: number) {
    let usuarioSesion = JSON.parse(localStorage.getItem('emailLogin') || '{}');
    let cant = (<HTMLInputElement>(
      document.getElementById('txtcantidad_' + indice)
    )).value;
    if (typeof this.pedido == 'undefined') {
      this.lineasPedido = [];
      let lineaPedido: LineaPedido;
      lineaPedido = {
        IdProducto: this.listaProductos[indice].id,
        Cantidad: Number(cant),
        ImporteUnitario: this.listaProductos[indice].precio,
      };
      this.lineasPedido.push(lineaPedido);
      this.calcularTotal();
    } else {
      //CONTROLAR ELEMENTOS REPETIDOS
      this.lineasPedido = this.lineasPedido.filter(
        (x) => x.IdProducto !== this.listaProductos[indice].id
      );
      let lineaPedido: LineaPedido;
      lineaPedido = {
        IdProducto: this.listaProductos[indice].id,
        Cantidad: Number(cant),
        ImporteUnitario: this.listaProductos[indice].precio,
      };
      this.lineasPedido.push(lineaPedido);
      this.calcularTotal();
    }
    this.pedido = {
      email: usuarioSesion.email,
      DetallesPedido: this.lineasPedido,
    };
    //console.log(this.pedido);
  }
  calcularTotal() {
    this.TotalPedido = 0;
    for (let l of this.lineasPedido)
      this.TotalPedido = this.TotalPedido + l.Cantidad * l.ImporteUnitario;
    this.TotalPedido = Number(this.TotalPedido.toFixed(2));
  }

  FinalizarPedido() {
    this.servicioProducto.AgregarPedido(this.pedido).subscribe((res) => {
      if (res.error != null && res.error != '') {
        this.resultadoPedido = res.error;
      } else {
        this.resultadoPedido = 'Pedido realizado correctamente';
        this.modalService.open(this.myModalInfo);
        this.TotalPedido = 0;
      }
    });
  }
}
