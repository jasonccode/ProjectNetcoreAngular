import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Resultado } from '../modelos/resultado';
import { Cliente } from '../modelos/cliente';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  url: string = 'https://localhost:7185/API/clientes/';
  private emailLoginSubject: BehaviorSubject<Cliente>;
  public cliente: Observable<Cliente>;

  public get usuarioLogin(): Cliente {
    return this.emailLoginSubject.value;
  }

  constructor(private peticion: HttpClient) {
    this.emailLoginSubject = new BehaviorSubject(
      JSON.parse(localStorage.getItem('emailLogin') || '{}')
    );
    this.cliente = this.emailLoginSubject.asObservable();
  }

  dameclientes(): Observable<Resultado> {
    return this.peticion.get<Resultado>(this.url);
  }

  agregarCliente(cliente: Cliente): Observable<Resultado> {
    return this.peticion.post<Resultado>(this.url, cliente);
  }

  modificarCliente(cliente: Cliente): Observable<Resultado> {
    return this.peticion.put<Resultado>(this.url, cliente);
  }

  bajaCliente(email: string): Observable<Resultado> {
    return this.peticion.delete<Resultado>(this.url + email);
  }

  loginCliente(cliente: Cliente): Observable<Resultado> {
    return this.peticion.post<Resultado>(this.url + 'Login', cliente).pipe(
      map((result) => {
        if (result.error == null || result.error == '') {
          const cliente: Cliente = result.objetoGenerico as Cliente;
          localStorage.setItem('emailLogin', JSON.stringify(cliente));
          this.emailLoginSubject.next(cliente);
        }
        return result;
      })
    );
  }

  cierreSesion() {
    localStorage.removeItem('emailLogin');
    sessionStorage.removeItem('token');
    this.emailLoginSubject.next(null!);
  }

  damecliente(cliente: Cliente): Observable<Resultado> {
    return this.peticion.post<Resultado>(this.url + 'Cliente', cliente);
  }
}
