import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';

import {IonicModule, IonicRouteStrategy} from '@ionic/angular';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SignInPage} from './tabs/non-authenticated/sign-in/sign-in.page';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AppInterceptor} from './config/app.interceptor';
import {AppGuard} from './config/app.guard';
import {MainPage} from './tabs/authenticated/main/main.page';
import {SideMenuPage} from './tabs/authenticated/side-menu/side-menu.page';
import {MyVehiclesPage} from './tabs/authenticated/my-vehicles/my-vehicles.page';

@NgModule({
  declarations: [
    AppComponent,
    SignInPage,
    MainPage,
    SideMenuPage,
    MyVehiclesPage
  ],
    imports: [
        BrowserModule,
        IonicModule.forRoot(),
        AppRoutingModule,
        IonicModule,
        CommonModule,
        FormsModule,
        HttpClientModule,
        ReactiveFormsModule
    ],
    providers: [
      {provide: RouteReuseStrategy, useClass: IonicRouteStrategy},
      {provide: HTTP_INTERCEPTORS, useClass: AppInterceptor, multi: true},
      AppGuard
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
