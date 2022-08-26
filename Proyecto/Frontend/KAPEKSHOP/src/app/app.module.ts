import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistrarUsuarioComponent } from './Components/registrar-usuario/registrar-usuario.component';
import { InicioComponent } from './Components/inicio/inicio.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LandingComponent } from './Components/landing/landing.component';
import { MatInputModule } from '@angular/material/input'
import { MatRadioModule} from '@angular/material/radio'
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { HeaderComponent } from './Components/landing/header/header.component';
import { BodyComponent } from './Components/landing/body/body.component';
import { FooterComponent } from './Components/landing/footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModalErrorComponent } from './Components/modal-error/modal-error.component';
import { ModalExitoComponent } from './Components/modal-exito/modal-exito.component';
import { ValidarCorreoComponent } from './Components/validar-correo/validar-correo.component';
import { IniciarSesionComponent } from './Components/iniciar-sesion/iniciar-sesion.component';
import { CategoriaComponent } from './Components/categoria/categoria.component';
import { CardProductoComponent } from './Components/card-producto/card-producto.component';
import { TiendaComponent } from './Components/tienda/tienda.component';
import { RecuperarContraseniaComponent } from './Components/recuperar-contrasenia/recuperar-contrasenia.component';
import { SolicitarRecuperarContraseniaComponent } from './Components/solicitar-recuperar-contrasenia/solicitar-recuperar-contrasenia.component';
import { CategoriasComponent } from './Components/categorias/categorias.component';
import { ProductoComponent } from './Components/producto/producto.component';
//import { formDenunciaComponent } from './Components/formDenuncia/formDenuncia.component';
import { CardCategoriaComponent } from './Components/card-categoria/card-categoria.component';
import { DialogoUsuarioComponent } from './Components/dialogo-usuario/dialogo-usuario.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import {MatTooltipModule} from '@angular/material/tooltip';
import { ModalNuevaCategoriaComponent } from './Components/modal-nueva-categoria/modal-nueva-categoria.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BtnImagenComponent } from './Components/btn-imagen/btn-imagen.component';
import { ImagenesProductoComponent } from './Components/imagenes-producto/imagenes-producto.component';
import { AdminComponent } from './Components/admin/admin.component';
import { AnunciosComponent } from './Components/admin/anuncios/anuncios.component';
import { CategoriasAdminComponent } from './Components/admin/categorias-admin/categorias-admin.component';
import { DenunciasComponent } from './Components/admin/denuncias/denuncias.component';
import { EstadisticasComponent } from './Components/admin/estadisticas/estadisticas.component';
import { SidebarComponent } from './Components/admin/sidebar/sidebar.component';
import { BarrasComponent } from './Components/admin/estadisticas/barras/barras.component';
import { CircularComponent } from './Components/admin/estadisticas/circular/circular.component';
import { DonaComponent } from './Components/admin/estadisticas/dona/dona.component';
import { LinealComponent } from './Components/admin/estadisticas/lineal/lineal.component';
import { PolarComponent } from './Components/admin/estadisticas/polar/polar.component';
import { ScatterComponent } from './Components/admin/estadisticas/scatter/scatter.component';
import { NgChartsModule } from 'ng2-charts';
import { ModalConfirmacionComponent } from './Components/modal-confirmacion/modal-confirmacion.component';
import { DetalleDeProductoComponent } from './Components/detalle-de-producto/detalle-de-producto.component';


 

import { PaginadorComponent } from './Components/paginador/paginador.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MisProductosComponent } from './Components/mis-productos/mis-productos.component';
import { CarouselComponent } from './Components/carousel/carousel.component';
import { NgbCarouselModule} from '@ng-bootstrap/ng-bootstrap';
import { FormDenunciaComponent } from './Components/form-denuncia/form-denuncia.component';
import { ListaDeDeseosComponent } from './Components/lista-de-deseos/lista-de-deseos.component';
import { MensajeComponent } from './Components/mensaje/mensaje.component';
import { BuscarComponent } from './Components/buscar/buscar.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { BuscarProductoComponent } from './Components/buscar-producto/buscar-producto.component';
import {MatButtonToggleModule} from '@angular/material/button-toggle';

@NgModule({
  declarations: [
    AppComponent,
    RegistrarUsuarioComponent,
    InicioComponent,
    LandingComponent,
    HeaderComponent,
    BodyComponent,
    FooterComponent,
    ModalErrorComponent,
    ModalExitoComponent,
    ValidarCorreoComponent,
    IniciarSesionComponent,
    CategoriaComponent,
    ProductoComponent,
    CardProductoComponent,
    TiendaComponent,
    RecuperarContraseniaComponent,
    SolicitarRecuperarContraseniaComponent,
    CategoriasComponent,
    CardCategoriaComponent,
    DialogoUsuarioComponent,
    ModalNuevaCategoriaComponent,
    ProductoComponent,
    BtnImagenComponent,
    ImagenesProductoComponent,
    AdminComponent,
    AnunciosComponent,
    CategoriasAdminComponent,
    DenunciasComponent,
    EstadisticasComponent,
    SidebarComponent,
    BarrasComponent,
    CircularComponent,
    DonaComponent,
    LinealComponent,
    PolarComponent,
    ScatterComponent,
    DetalleDeProductoComponent,
    FormDenunciaComponent,
    
    AdminComponent,
    AnunciosComponent,
    CategoriasAdminComponent,
    DenunciasComponent,
    EstadisticasComponent,
    SidebarComponent,
    CircularComponent,
    PolarComponent,
    BarrasComponent,
    DonaComponent,
    ScatterComponent,
    LinealComponent,
    ModalConfirmacionComponent,
    PaginadorComponent,
    
    MisProductosComponent,
    CarouselComponent,
    ListaDeDeseosComponent,
    MensajeComponent,
    BuscarComponent,
    BuscarProductoComponent
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatInputModule,
    MatCheckboxModule,
    MatRadioModule,
    MatButtonModule,
    ReactiveFormsModule,
    NgbModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    BrowserAnimationsModule,
    MatMenuModule,
    HttpClientModule,
    FormsModule,
    MatDialogModule,
    MatSelectModule,
    MatTooltipModule,
    MatToolbarModule,
    NgChartsModule,
    MatPaginatorModule,
    NgbCarouselModule,
    MatAutocompleteModule,
    MatButtonToggleModule
    

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
