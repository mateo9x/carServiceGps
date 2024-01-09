import {Injectable} from '@angular/core';
import {User} from '../models/user.model';
import {UserApiService} from './api/user-api.service';
import {Router} from '@angular/router';
import {ToastService, ToastType} from './common/toast.service';
import {ProgressBarService} from './common/progress-bar.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private apiService: UserApiService,
              private router: Router,
              private toastService: ToastService,
              private spinnerService: ProgressBarService) {
  }

  signUp(userRequest: User) {
    this.setSpinner(true);
    this.apiService.signUp(userRequest).subscribe({
      next: () => {
        this.setSpinner(false);
        this.router.navigate(['']).then(() => this.toastService.showToast('Użytkownik został zarejestrowany', ToastType.SUCCESS));
      },
      error: (error) => {
        this.setSpinner(false);
        if (error.error) {
          this.toastService.showToast(error.error.message, ToastType.ERROR);
        } else {
          this.toastService.showToast('Nie udało się zarejestrować użytkownika', ToastType.ERROR);
        }
      }
    });
  }

  updatePassword(password: string) {
    this.apiService.updatePassword(password).subscribe({
      next: () => this.router.navigate(['profile']).then(() => this.toastService.showToast('Hasło zostało zaktualizowane', ToastType.SUCCESS)),
      error: (error) => {
        if (error.error) {
          this.toastService.showToast(error.error.message, ToastType.ERROR);
        } else {
          this.toastService.showToast('Nie udało się zaktualizować hasła', ToastType.ERROR);
        }
      }
    });
  }

  startResetPasswordProcedure(email: string) {
    this.setSpinner(true);
    this.apiService.startResetPasswordProcedure(email).subscribe({
      next: () => {
        this.setSpinner(false);
        this.router.navigate(['']).then(() => this.toastService.showToast('Link do odzyskania konta został wysłany na wskazany email', ToastType.SUCCESS));
      },
      error: (error) => {
        this.setSpinner(false);
        if (error.error) {
          this.toastService.showToast(error.error.message, ToastType.ERROR);
        } else {
          this.toastService.showToast('Nie udało się wygenerować próby resetu hasła', ToastType.ERROR);
        }
      }
    });
  }

  isResetPasswordTokenValid(token: string) {
    this.apiService.isResetPasswordTokenValid(token).subscribe({
      next: (valid) => {
        if (!valid) {
          this.router.navigate(['']).then(() => this.toastService.showToast('Token stracił swoją ważność', ToastType.WARN));
        }
      },
      error: (error) => {
        if (error.error) {
          this.toastService.showToast(error.error.message, ToastType.ERROR);
        } else {
          this.toastService.showToast('Wygeneruj prośbę o reset hasła ponownie', ToastType.ERROR);
        }
      }
    })
  }

  finishResetPasswordProcedure(token: string, password: string) {
    this.apiService.finishResetPasswordProcedure(token, password).subscribe({
      next: () => this.router.navigate(['sign-in']).then(() => this.toastService.showToast('Hasło zostało zmienione', ToastType.SUCCESS)),
      error: () => this.toastService.showToast('Nie udało się zmienić hasła', ToastType.ERROR)
    });
  }

  private setSpinner(loading: boolean) {
    this.spinnerService.setLoading(loading);
  }
}
