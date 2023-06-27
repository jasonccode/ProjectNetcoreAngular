import { Component, Input, OnInit, ViewChild, TemplateRef} from '@angular/core';
import { Cliente } from '../modelos/cliente';
import { ClienteService } from '../services/cliente.service';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UsuarioApiService } from '../services/usuarioApi.service';
import { AuthAPI } from '../modelos/authAPI';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-cliente-component',
  templateUrl: './cliente.component.html'
})


export class ClienteComponent implements OnInit {

  altaForm: FormGroup;
  enviado = false;
  resultadoPeticion: string;
  @ViewChild("myModalInfo", { static: false }) myModalInfo: TemplateRef<any> | undefined;
  usuarioAPI: AuthAPI;


  constructor(private servicioCliente: ClienteService, private formBuilder: FormBuilder,
    private modalService: NgbModal, private servicioLogin: UsuarioApiService  )
  {
    this.usuarioAPI =
    {
      email: environment.usuarioAPI,
      password: environment.passAPI
    }
  }

  ngOnInit(): void
  {
    this.altaForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      pass: ['', Validators.required]
    })

    //Login API
    if (sessionStorage.getItem('token') == null) {
      this.servicioLogin.loginAPI(this.usuarioAPI).subscribe(res => {
        if (res.error != null && res.error != '')
          console.log("Error obtener token");

      })
    }
  }

  get f(): { [key: string]: AbstractControl } {
    return this.altaForm.controls;
  }


  public Alta()
  {
    this.enviado = true;
    if (this.altaForm.invalid) {
      console.log("Invalido");
      return;
    }

    console.log("valido");

    let cliente: Cliente =
    {
      nombre: this.altaForm.controls['nombre'].value,
      email: this.altaForm.controls['email'].value,
      pass: this.altaForm.controls['pass'].value
    };

    this.servicioCliente.agregarCliente(cliente).subscribe(res =>
     {
      if (res.error != null && res.error != '')
        this.resultadoPeticion = res.texto;
      else
        this.resultadoPeticion = "Cliente dado de alta correctamente.Inicie sesión";

      this.modalService.open(this.myModalInfo);
    });



  }


}
