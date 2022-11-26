import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SeguridadRoutingModule } from './seguridad-routing.module';
import { IdentificacionComponent } from './identificacion/identificacion.component';
import { RecuperarClaveComponent } from './recuperar-clave/recuperar-clave.component';
import { CambiarClaveComponent } from './cambiar-clave/cambiar-clave.component';


@NgModule({
  declarations: [
    IdentificacionComponent,
    RecuperarClaveComponent,
    CambiarClaveComponent
  ],
  imports: [
    CommonModule,
    SeguridadRoutingModule,
    FormsModule,
    ReactiveFormsModule
    
  ]
})
export class SeguridadModule { }
