import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

import { ObsService } from './services/observer/obs.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  userLogin: any;
  profilePicture = './../assets/images/dummy.png';

  constructor(
    private auth: AuthService,
    private router: Router,
    private platform: Platform,
    private _event: ObsService,

    private menu: MenuController
  ) {
    this.initializeApp();

    this._event.get().subscribe(res => {
      this.userLogin = this.auth.getUser();
      if(res && res.key.type=='profile-picture-updated'){
        this.profilePicture = res.key.profilePicture;
      }
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {

      this.menu.enable(false, 'first');
      this.userLogin = this.auth.getUser();
      if(this.userLogin)
        this.profilePicture = this.userLogin.thumbnail;
    });
  }

  logout(){
    localStorage.clear();
    this.menu.enable(false);
    this.router.navigate(['login']);
  }
}
