import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router'
import { ClienteService } from '../services/cliente.service';

@Injectable
  ({
    providedIn: 'root'
  })

export class AutenticacionGuard implements CanActivate {

  constructor(private rutas: Router, private servicioCliente: ClienteService) {

  }

  canActivate(rutas: ActivatedRouteSnapshot ,)
  {
    const usuario = this.servicioCliente.usuarioLogin;
    if (typeof usuario.email != "undefined") {
      return true;
    }

    this.rutas.navigate(['/login']);
    return false;
  }

}
