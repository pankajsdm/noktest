import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { Countries } from './../../../statics/countres';

@Component({
  selector: 'app-delivery-address',
  templateUrl: './delivery-address.page.html',
  styleUrls: ['./delivery-address.page.scss'],
})
export class DeliveryAddressPage implements OnInit {

  addDeliveryAddressForm: FormGroup;
  isLoading:boolean = false;
  countries = [];
  userLogin: any;
  message:String = "Loading delivery address";

  constructor(
    formBuilder: FormBuilder,
    private router: Router,
    private _auth: AuthService
  ) {

    this.addDeliveryAddressForm = formBuilder.group({
      first_name: ["", [Validators.required]],
      last_name: ["", [Validators.required]],
      country: ["", [Validators.required]],
      state: ["", [Validators.required]],
      city: ["", [Validators.required]],
      pin: ["", [Validators.required]],
      phone: ["", [Validators.required]],
      address: ["", [Validators.required]]
    });

   }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.countries =  Countries;
    this.userLogin = this._auth.getUser();
    this.profile(this.userLogin.ID);
  }

  profile(id){
    this.isLoading = true;
    this._auth.getProfile(id).then(res => { 
      this.isLoading = false;  
      if(res['code']==200){
        this.addDeliveryAddressForm.patchValue(res['data']); 
      }else{
        this._auth.presentToast(res['message'],   3000, 'middle');
      }
    })
    .catch(err => {
      this.isLoading = false;
      return this._auth.presentToast(err.error.message, 3000, 'middle');
    });
  }

  submitDeliveryAddress(){
    if(this.addDeliveryAddressForm.valid){
      this.isLoading = true;
      this.message = 'Updating delivery address';
      this.addDeliveryAddressForm.value['user_id'] = this.userLogin.ID;
      this._auth.updateDeliveryAddress(this.addDeliveryAddressForm.value).then(res => { 
        this.isLoading = false;  
        if(res['code']==200){
          this.addDeliveryAddressForm.reset();
          this.router.navigate(['/tabs/profile']);
        }
      })
      .catch(err => {
        this.isLoading = false;
        return this._auth.presentToast(err.error.message, 3000, 'middle');
      });
    }
  }


}
