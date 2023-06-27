import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { environment } from '../../environments/environment';
import { AuthAPI } from '../modelos/authAPI';
import { Cliente } from '../modelos/cliente';
import { UsuarioAPI } from '../modelos/usuarioAPI';
import { ClienteService } from '../services/cliente.service';
import { UsuarioApiService } from '../services/usuarioApi.service';

@Component({
  selector: 'app-Login-component',
  templateUrl: './Login.component.html',
})
export class LoginComponent implements OnInit {
  usuarioAPI: AuthAPI;
  loginForm: FormGroup;
  enviado = false;
  resultadoPeticion: string;
  @ViewChild('myModalInfo', { static: false }) myModalInfo: TemplateRef<any> | undefined;

  constructor(
    private servicioLogin: UsuarioApiService,
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private servicioCliente: ClienteService,
    private router: Router
  ) {
    this.usuarioAPI = {
      email: environment.usuarioAPI,
      password: environment.passAPI,
    };
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      pass: ['', Validators.required],
    });

    //Login API
    if (sessionStorage.getItem('token') == null) {
      this.servicioLogin.loginAPI(this.usuarioAPI).subscribe((res) => {
        if (res.error != null && res.error != '')
          this.resultadoPeticion = res.texto;
      });
    }
  }

  get f(): { [key: string]: AbstractControl } {
    return this.loginForm.controls;
  }

  Login() {
    this.enviado = true;
    if (this.loginForm.invalid) {
      console.log('Invalido');
      return;
    }

    let cliente: Cliente = {
      email: this.loginForm.controls['email'].value,
      pass: this.loginForm.controls['pass'].value,
    };

    this.servicioCliente.loginCliente(cliente).subscribe((res) => {
      if (res.error != null && res.error != '') {
        this.resultadoPeticion = res.texto;
        this.modalService.open(this.myModalInfo);
      } else this.router.navigate(['/Productos']);
    });
  }
}
