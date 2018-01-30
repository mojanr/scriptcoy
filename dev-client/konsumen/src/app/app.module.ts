import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

// service
// services
import { ThreeService } from './three.service';
import { LoaderService } from './loader.service';
import { GitarService } from './gitar.service';

// component
import { AppComponent } from './app.component';
import { DesignComponent } from './design/design.component';


// routes
const appRoutes: Routes = [
  // {
  //   path: '',
  //   // component: AppComponent
  //   redirectTo: '/design'
  // },
  {
    path: 'design',
    component: DesignComponent
  },
  {
    path: '**', 
    redirectTo: '/design'
  }
];

@NgModule({
  declarations: [
    AppComponent,
    DesignComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false }
    )
  ],
  providers: [
  	ThreeService,
    LoaderService,
    GitarService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
