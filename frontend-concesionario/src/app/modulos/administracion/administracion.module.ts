import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CrearUsuarioComponent } from './personas/crear-usuario/crear-usuario.component';
import { EditarUsuarioComponent } from './personas/editar-usuario/editar-usuario.component';
import { EliminarUsuarioComponent } from './personas/eliminar-usuario/eliminar-usuario.component';
import { BuscarUsuarioComponent } from './personas/buscar-usuario/buscar-usuario.component';
import { CrearVehiculoComponent } from './vehiculos/crear-vehiculo/crear-vehiculo.component';
import { EditarVehiculoComponent } from './vehiculos/editar-vehiculo/editar-vehiculo.component';
import { BuscarVehiculoComponent } from './vehiculos/buscar-vehiculo/buscar-vehiculo.component';
import { EliminarVehiculoComponent } from './vehiculos/eliminar-vehiculo/eliminar-vehiculo.component';



@NgModule({
  declarations: [
    CrearUsuarioComponent,
    EditarUsuarioComponent,
    EliminarUsuarioComponent,
    BuscarUsuarioComponent,
    CrearVehiculoComponent,
    EditarVehiculoComponent,
    BuscarVehiculoComponent,
    EliminarVehiculoComponent
  ],
  imports: [
    CommonModule
  ]
})
export class AdministracionModule { }
