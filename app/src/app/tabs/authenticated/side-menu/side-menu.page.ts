import {Component, EventEmitter, Output} from '@angular/core';
import {MenuController} from '@ionic/angular';

@Component({
  selector: 'side-menu',
  templateUrl: 'side-menu.page.html',
  styleUrls: ['side-menu.page.scss']
})
export class SideMenuPage {
  @Output()
  logoutEmitter: EventEmitter<void> = new EventEmitter<void>();

  constructor(private menuController: MenuController) {
  }

  closeMenu() {
    this.menuController.close('side-menu');
  }

  logout() {
    this.logoutEmitter.emit();
  }
}
