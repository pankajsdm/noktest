import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { Countries } from './../statics/countres';
declare var google: any;


@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {

  
  registrationFormGroup: FormGroup;
  isloginActive: boolean = true;
  countries = [];
  latitude: Number;
  longitude: Number;
  isLoading:boolean = false;

  constructor(
    private router: Router,
    private auth: AuthService,
    formBuilder: FormBuilder,
  ) {
    this.registrationFormGroup = formBuilder.group({
      full_name: ["", [Validators.required]],
      email: ["",  [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirm_password: ['', [Validators.required,  this.passwordMatcher.bind(this)]]
    });
  }

  

  ngOnInit() {
    this.countries =  Countries;
    this.getLocationCordinates();
  }

  passwordMatcher(control: FormControl): { [s: string]: boolean } {
    if (
        this.registrationFormGroup &&
        (control.value !== this.registrationFormGroup.controls.password.value)
    ) {
        return { passwordNotMatch: true };
    }
    return null;
  }

  getLocationCordinates(){
    /* this.geolocation.getCurrentPosition().then((resp) => {
      this.latitude = resp.coords.latitude;
      this.longitude = resp.coords.longitude;
      }).catch((error) => {
        console.log('Error getting location', error);
      }); */
  }

  async register(){
    if(this.registrationFormGroup.valid){
      if(this.registrationFormGroup.value['password']!==this.registrationFormGroup.value['confirm_password']){
        this.auth.presentToast('password and confirm password not matched', 3000, 'middle');
        return;
      }
      this.isLoading = true;
      this.registrationFormGroup.value['location'] = `${this.latitude.toFixed(4)},${this.longitude.toFixed(4)}`;
      this.registrationFormGroup.value['signupType'] = `web`;
      this.auth.register(this.registrationFormGroup.value).then(res => {
        this.isLoading = false;
        if(res['code']==200){
          this.auth.presentAlert('Registration Successfull', res['message'], 'Okay')
          this.router.navigate(['/login']);
        }else{
          this.auth.presentToast(res['message'], 3000, 'middle');
        }
      })
      .catch(err => {
        this.isLoading = false;
        return this.auth.presentToast(err.error.message, 3000, 'middle');
      });
    }
  }

  action(page){
    this.router.navigate([`/${page}`])
  }


}
