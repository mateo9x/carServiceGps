import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';

import {IonicModule, IonicRouteStrategy} from '@ionic/angular';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SignInPage} from './tabs/sign-in/sign-in.page';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AppInterceptor} from './config/app.interceptor';
import {AppGuard} from './config/app.guard';
import {WelcomePage} from './tabs/welcome/welcome.page';

@NgModule({
    declarations: [
      AppComponent,
      SignInPage,
      WelcomePage
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
