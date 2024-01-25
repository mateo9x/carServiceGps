import {inject, NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {SignInPage} from './tabs/non-authenticated/sign-in/sign-in.page';
import {AppGuard} from './config/app.guard';
import {MainPage} from './tabs/authenticated/main/main.page';
import {MyVehiclesPage} from './tabs/authenticated/my-vehicles/my-vehicles.page';
import {SignUpPage} from './tabs/non-authenticated/sign-up/sign-up.page';
import {ResetPasswordPage} from './tabs/non-authenticated/reset-password/reset-password.page';
import {MyInsurancesPage} from "./tabs/authenticated/my-insurances/my-insurances.page";

const routes: Routes = [
  {
    path: '',
    component: MainPage,
    title: 'Witaj'
  },
  {
    path: '',
    component: SignInPage,
    title: 'Zaloguj się',
    outlet: 'nonAuthenticated'
  },
  {
    path: 'sign-in',
    title: 'Zaloguj się',
    component: SignInPage,
    canActivate: [() => !inject(AppGuard).isAuthenticated()]
  },
  {
    path: 'my-vehicles',
    component: MyVehiclesPage,
    title: 'Moje pojazdy',
    canActivate: [() => inject(AppGuard).isAuthenticated()]
  },
  {
    path: 'my-insurances',
    component: MyInsurancesPage,
    title: 'Moje ubezpieczenia',
    canActivate: [() => inject(AppGuard).isAuthenticated()]
  },
  {
    path: 'sign-up',
    component: SignUpPage,
    title: 'Zarejestruj się',
    canActivate: [() => !inject(AppGuard).isAuthenticated()],
    outlet: 'nonAuthenticated'
  },
  {
    path: 'reset-password',
    component: ResetPasswordPage,
    title: 'Resetuj hasło',
    canActivate: [() => !inject(AppGuard).isAuthenticated()],
    outlet: 'nonAuthenticated'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
