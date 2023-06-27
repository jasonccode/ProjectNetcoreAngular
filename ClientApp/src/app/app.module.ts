import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { InicioComponent } from './inicio/inicio.component';
import { ClienteComponent } from './cliente/cliente.component';
import { LoginComponent } from './Login/Login.component';
import { ProductoComponent } from './Productos/Productos.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { AutenticacionGuard } from './Seguridad/autenticacion.guard';
import { TokenInterceptor } from './Seguridad/token.interceptor';
import { HistoricoPedidosComponent } from './HistoricoPedidos/HistoricoPedidos.component';
import { MisDatosComponent } from './MisDatos/misdatos.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    InicioComponent,
    ClienteComponent,
    LoginComponent,
    ProductoComponent,
    HistoricoPedidosComponent,
    MisDatosComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    RouterModule.forRoot([
      { path: '', component: InicioComponent, pathMatch: 'full' },
      { path: 'inicio', component: InicioComponent },
      { path: 'cliente', component: ClienteComponent },
      { path: 'login', component: LoginComponent },
      { path: 'Productos', component: ProductoComponent, canActivate: [AutenticacionGuard]},
      { path: 'HistoricoPedidos', component: HistoricoPedidosComponent, canActivate: [AutenticacionGuard] },
      { path: 'MisDatos', component: MisDatosComponent, canActivate: [AutenticacionGuard]},
    ])

  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
