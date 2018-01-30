import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

// interceptor
import { HttpRequestService } from './http-request.service';
import { HttpResponseService } from './http-response.service';

// service
import { BahanService } from './bahan.service';
import { HargaBahanService } from './harga-bahan.service';
import { LoginService } from './login.service';
import { ModelService } from './model.service';
import { PesananService } from './pesanan.service';
import { ThreeService } from './three.service';
import { GitarService } from './gitar.service';
import { LoaderService } from './loader.service';
import { MessageService } from './message.service';
import { AuthService } from './auth.service';
import { PengelolaService } from './pengelola.service';

// component
import { AppComponent } from './app.component';
import { MenuUtamaComponent } from './menu-utama/menu-utama.component';
import { ModelComponent } from './model/model.component';
import { ModelTambahComponent } from './model-tambah/model-tambah.component';
import { ModelUbahComponent } from './model-ubah/model-ubah.component';
import { BahanComponent } from './bahan/bahan.component';
import { BahanTambahComponent } from './bahan-tambah/bahan-tambah.component';
import { BahanUbahComponent } from './bahan-ubah/bahan-ubah.component';
import { HargaBahanComponent } from './harga-bahan/harga-bahan.component';
import { HargaBahanTambahComponent } from './harga-bahan-tambah/harga-bahan-tambah.component';
import { HargaBahanUbahComponent } from './harga-bahan-ubah/harga-bahan-ubah.component';
import { PesananComponent } from './pesanan/pesanan.component';
import { PesananDetailComponent } from './pesanan-detail/pesanan-detail.component';
import { LoginComponent } from './login/login.component';
import { MenuUtamaAdministratorComponent } from './menu-utama-administrator/menu-utama-administrator.component';
import { PengelolaComponent } from './pengelola/pengelola.component';
import { PengelolaTambahComponent } from './pengelola-tambah/pengelola-tambah.component';
import { PengelolaUbahComponent } from './pengelola-ubah/pengelola-ubah.component';

// routes
// routes
const appRoutes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'menu-utama',
    component: MenuUtamaComponent,
    children: [
      {
        path: 'model',
        component: ModelComponent,
      },
      {
        path: 'model/tambah-data',
        component: ModelTambahComponent,
      },
      {
        path: 'model/ubah-data/:id',
        component: ModelUbahComponent
      },
      {
        path: 'bahan',
        component: BahanComponent
      },
      {
        path: 'bahan/tambah-data',
        component: BahanTambahComponent
      },
      {
        path: 'bahan/ubah-data/:id',
        component: BahanUbahComponent
      },
      {
        path: 'harga-bahan',
        component: HargaBahanComponent
      },
      {
        path: 'harga-bahan/tambah-data',
        component: HargaBahanTambahComponent
      },
      {
        path: 'harga-bahan/ubah-data/:id',
        component: HargaBahanUbahComponent
      },
      {
        path: 'pesanan',
        component: PesananComponent
      },
      {
        path: 'pesanan/detail/:id',
        component: PesananDetailComponent
      },
      {
        path: '**', 
        redirectTo: '/menu-utama/model'
      }
    ]
  },
  {
    path: 'menu-utama-administrator',
    component: MenuUtamaAdministratorComponent,
    children: [
      {
        path: 'pengelola',
        component: PengelolaComponent,
      },
      {
        path: 'pengelola/tambah-data',
        component: PengelolaTambahComponent,
      },
      {
        path: 'pengelola/ubah-data/:id',
        component: PengelolaUbahComponent
      },
      {
        path: '**', 
        redirectTo: '/menu-utama-administrator/pengelola'
      }
    ]
  },
  {
    path: '**', 
    redirectTo: '/login'
  }
];

@NgModule({
  declarations: [
    AppComponent,
    MenuUtamaComponent,
    ModelComponent,
    ModelTambahComponent,
    ModelUbahComponent,
    BahanComponent,
    BahanTambahComponent,
    BahanUbahComponent,
    HargaBahanComponent,
    HargaBahanTambahComponent,
    HargaBahanUbahComponent,
    PesananComponent,
    PesananDetailComponent,
    LoginComponent,
    MenuUtamaAdministratorComponent,
    PengelolaComponent,
    PengelolaTambahComponent,
    PengelolaUbahComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false }
    ),
  ],
  providers: [
    BahanService,
    HargaBahanService,
    LoginService,
    ModelService,
    PesananService,
    ThreeService,
    GitarService,
    LoaderService,
    MessageService,
    AuthService,
    PengelolaService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpRequestService,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpResponseService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
