import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { UsuarioApiService } from "../services/usuarioApi.service";

@Injectable()
export class TokenInterceptor implements HttpInterceptor
{
  constructor(private usuarioAPIService: UsuarioApiService) {

  }

  intercept(peticion: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>
  {
    const token = this.usuarioAPIService.tokenAPI;
    if (token != "undefined")
    {
      peticion = peticion.clone({
        setHeaders: { Authorization: 'Bearer ' + token }
      })
    }

    return next.handle(peticion);
  }
}
