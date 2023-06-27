import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthAPI } from '../modelos/authAPI';
import { Resultado } from '../modelos/resultado';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UsuarioAPI } from '../modelos/usuarioAPI';


@Injectable
  ({
    providedIn: 'root'
  })

export class UsuarioApiService {

  private url: string = 'https://localhost:7185/API/UsuarioAPI/';

  private tokenAPISubject: BehaviorSubject<string>

  public get tokenAPI(): string {
    return this.tokenAPISubject.value;
  }


  constructor(private peticion: HttpClient) {

    this.tokenAPISubject = new BehaviorSubject(JSON.parse(sessionStorage.getItem('token') || '{}'));
  }

  loginAPI(autenticacion: AuthAPI): Observable<Resultado>
  {
    return this.peticion.post<Resultado>(this.url, autenticacion).pipe(
      map(result => {
        if (result.error == null || result.error == '') {
          const token: string = (result.objetoGenerico as UsuarioAPI).token;
          sessionStorage.setItem('token', JSON.stringify(token));
          this.tokenAPISubject.next(token)
        }
        return result;
      })
    );
  }


}
