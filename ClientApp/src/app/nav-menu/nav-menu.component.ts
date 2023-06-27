import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Cliente } from '../modelos/cliente';
import { ClienteService } from '../services/cliente.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {
  isExpanded = false;
  cliente: Cliente;
  logado: boolean;

  constructor(public servicioCliente: ClienteService,private router:Router)
  {
    this.servicioCliente.cliente.subscribe(res =>
    {
      this.cliente = res;
      if (this.cliente == null || typeof this.cliente.email == "undefined")
        this.logado = false;
      else
        this.logado = true;


    })
  }

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  cierreSesion() {
    this.servicioCliente.cierreSesion();
    this.router.navigate(['/login']);
    this.logado = false;
  }
}
