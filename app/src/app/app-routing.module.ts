import {inject, NgModule} from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {SignInPage} from './tabs/sign-in/sign-in.page';
import {AppGuard} from './config/app.guard';
import {WelcomePage} from './tabs/welcome/welcome.page';

const routes: Routes = [
  {
    path: '',
    component: WelcomePage,
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
    canActivate: [() => !inject(AppGuard).isAuthenticated()],
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
