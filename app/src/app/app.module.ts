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
import {SignUpPage} from './tabs/non-authenticated/sign-up/sign-up.page';
import {ResetPasswordPage} from './tabs/non-authenticated/reset-password/reset-password.page';
import {InputComponent} from './shared-components/input/input.component';
import {VehicleCardComponent} from "./tabs/authenticated/my-vehicles/vehicle-card/vehicle-card.component";
import {MyInsurancesPage} from "./tabs/authenticated/my-insurances/my-insurances.page";
import {InsuranceCardComponent} from "./tabs/authenticated/my-insurances/insurance-card/insurance-card.component";

@NgModule({
  declarations: [
    AppComponent,
    SignInPage,
    MainPage,
    SideMenuPage,
    MyVehiclesPage,
    SignUpPage,
    ResetPasswordPage,
    InputComponent,
    VehicleCardComponent,
    MyInsurancesPage,
    InsuranceCardComponent
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
