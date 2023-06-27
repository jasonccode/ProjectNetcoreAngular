import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { environment } from '../../environments/environment';
import { AuthAPI } from '../modelos/authAPI';
import { Cliente } from '../modelos/cliente';
import { ClienteService } from '../services/cliente.service';
import { UsuarioApiService } from '../services/usuarioApi.service';
@Component({
  selector: 'app-MisDatos-component',
  templateUrl: './misdatos.component.html'
})

export class MisDatosComponent implements OnInit {

  usuarioAPI: AuthAPI;
  datosForm: FormGroup;
  resultadoPeticion: string;
  enviado = false;
  @ViewChild("myModalInfo", { static: false }) myModalInfo: TemplateRef<any> | undefined;

  constructor(private servicioLogin: UsuarioApiService, private formBuilder: FormBuilder,
    private servicioCliente: ClienteService, private modalService: NgbModal )
  {
    this.usuarioAPI =
    {
      email: environment.usuarioAPI,
      password: environment.passAPI
    }
  }

  ngOnInit() {

    this.datosForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      pass: ['', Validators.required]

    })

    //Login API
    if (sessionStorage.getItem('token') == null) {
      this.servicioLogin.loginAPI(this.usuarioAPI).subscribe(res => {
        if (res.error != null && res.error != '')
          this.resultadoPeticion = res.texto;
      })
    }

    let usuarioSesion = JSON.parse(localStorage.getItem('emailLogin') || '{}');
    let cliente: Cliente ={ email: usuarioSesion.email };
    this.servicioCliente.damecliente(cliente).subscribe(res => {
      if (res.error != null && res.error != '')
        this.resultadoPeticion = res.texto;
      else
      {
        const c = res.objetoGenerico as Cliente;
        this.datosForm.controls['nombre'].setValue(c.nombre);
      }

    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.datosForm.controls;
  }

  MisDatos() {
    this.enviado = true;

    if (this.datosForm.invalid) {
      console.log("Invalido");
      return;
    }

    let usuarioSesion = JSON.parse(localStorage.getItem('emailLogin') || '{}');
    let aux: Cliente = { email: usuarioSesion.email };

    let cliente: Cliente =
    {
      nombre: this.datosForm.controls['nombre'].value,
      email: aux.email,
      pass: this.datosForm.controls['pass'].value
    };

    this.servicioCliente.modificarCliente(cliente).subscribe(res => {
      if (res.error != null && res.error != '') {
        this.resultadoPeticion = res.texto;
      }
      else {
        this.resultadoPeticion = 'Datos modificados correctamente';
      }
      this.modalService.open(this.myModalInfo);
    })
  }
}
