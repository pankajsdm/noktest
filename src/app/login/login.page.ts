import { Component, OnInit } from '@angular/core';
import { MenuController} from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AlertController} from '@ionic/angular';
import { ObsService } from './../services/observer/obs.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  banner: any;
  loginFormGroup: FormGroup;
  isloginActive: boolean = true;
  isLoading: boolean = false;
  titleLabel = 'Login';
  

  constructor(
    private router: Router,
    private auth: AuthService,  
    formBuilder: FormBuilder,
    private _event: ObsService,
    public _sanitizer: DomSanitizer,
    private menu: MenuController,
    public alertController: AlertController
  ) {
    this.loginFormGroup = formBuilder.group({
      username: ["", [Validators.required]],
      email: [""],
      password: ['', [Validators.required]]
    });
    
   }

  async ngOnInit() {
    this.banner = "assets/images/nok-banner.png";
    this.menu.enable(false);

  }

  login(){
    this.isLoading = true;
    console.log("this.loginFormGroup.value",this.loginFormGroup.value);
    this.auth.login(this.loginFormGroup.value).then(res => {   
      alert("res"+JSON.stringify(res))
      this.isLoading = false;
      if(res['code']==200){
        this.menu.enable(true);
        localStorage.setItem('userData', JSON.stringify(res['data']));
        this.router.navigate(['/tabs']);
      }else{
        this.auth.presentToast(res['message'], 3000, 'middle');
      }
    })
    .catch(err => {
      alert("err"+JSON.stringify(err))
      this.isLoading = false;
      return this.auth.presentToast(err, 3000, 'middle');
    });
  }

  action(page){
    if(page=='forget-password'){
      this.titleLabel = 'Forget Password'
      this.isloginActive = false;
    }else{
      this.titleLabel = 'Login'
      this.isloginActive = true;
    }

    if(page=='sign-up'){
      this.router.navigate([`/${page}`])
    }
  }

}
