import { Component, ViewChild, ElementRef } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Countries } from './../../statics/countres';
import { ObsService } from './../../services/observer/obs.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: 'profile.page.html',
  styleUrls: ['profile.page.scss']
})
export class ProfilePage {
  user: any;
  userLogin: any;
  isLoading: boolean = true;
  isProfileView: boolean = true;
  isPictureUploading: boolean = false;
  updateProfileForm: FormGroup;
  countries = [];
  uploadType: string = 'library';
  targetedFile: any;
  isSelected: boolean = false;
  selectedFile = "assets/icon/mail.png";
  @ViewChild('fileInput', {static: true}) fileInput: ElementRef;
  formData =  new FormData();

  constructor(
    private auth: AuthService,
    formBuilder: FormBuilder,
    private router: Router,
    private _event: ObsService,
    private menu: MenuController,
  ) {
    this.updateProfileForm = formBuilder.group({
      first_name: ["", [Validators.required]],
      last_name: ["", [Validators.required]],
      artist_seller: ["", [Validators.required]],
      country: ["", [Validators.required]]
    });
  }


  ionViewDidEnter() {
    this.countries =  Countries;
    this.userLogin = this.auth.getUser();
    this.profile(this.userLogin.user_id);
  }

  doRefresh(event) {
    this.profile(this.userLogin.ID);
    if(event !== '')
      event.target.complete()
  }

  profile(id){
    this.auth.getProfile(id).then(res => { 
      this.isLoading = false;  
      if(res['code']==200){
        this.user = res['data'];
        if(this.user.profilePic)
        this.selectedFile = this.user.thumbnail;
      }else{
        this.auth.presentToast(res['message'],   3000, 'middle');
      }
    })
    .catch(err => {
      this.isLoading = false;
      return this.auth.presentToast(err.error.message, 3000, 'middle');
    });
  }

  openFileChoose():void {
    document.getElementById("upfile").click();
  }

  fileSelected($event){
    /* console.log("the data is", $event.target.files[0])
    return; */ 
    if($event && $event.target){
      this.uploadType = 'library';
      var reader = new FileReader();
      this.targetedFile = $event.target.files[0];
      this.previewUpladImage(this.targetedFile, reader);
      this.isSelected = true;
    }
  }

  previewUpladImage(file, reader){
    reader.readAsDataURL(file);
    reader.onload = (ev) => { 
      this.formData.append('user_id', this.userLogin.ID);
      this.formData.append('file', file);
      this.updateProfilePicture(this.formData);
    }
  }

  updateProfilePicture(data){
    this.isPictureUploading = true;
    this.auth.updateProfilePicture(data).then(res => { 
      this.isLoading = false;  
      this.isPictureUploading = false;
      if(res['code']==200){
        this.selectedFile = res['data']['thumbnail'];
        this.userLogin.thumbnail = res['data']['thumbnail']
        this.userLogin.profilePic = res['data']['profilePic']
        localStorage.setItem('userData', JSON.stringify(this.userLogin));
        var eventData = {type: 'profile-picture-updated', profilePicture: this.selectedFile};
        this._event.set('true', eventData);
        
        return this.auth.presentToast(res['message'], 3000, 'middle');
      }
    })
    .catch(err => {
      this.isLoading = false;
      this.isPictureUploading = false;
      return this.auth.presentToast(err.error.message, 3000, 'middle');
    });
  }

  editProfile(){
    this.updateProfileForm.patchValue({
      first_name: this.user.first_name,
      last_name: this.user.last_name,
      artist_seller: this.user.artist_seller,
      country: this.user.country
    })
    this.isProfileView = false;
  }

  updateProfile(){
    if(this.updateProfileForm.invalid){
      return;
    }
      
    this.isLoading = true;
    this.updateProfileForm.value['user_id'] = this.userLogin.ID;
    this.auth.updateProfile(this.updateProfileForm.value).then(res => { 
      this.isLoading = false;  
      if(res['code']==200){
        this.user = this.updateProfileForm.value;
        this.isProfileView = true;
      }else{
        this.auth.presentToast(res['message'],   3000, 'middle');
      }
    })
    .catch(err => {
      this.isLoading = false;
      return this.auth.presentToast(err.error.message, 3000, 'middle');
    });
  }

  addDeliveryAddress(){
    this.router.navigate(['/tabs/profile/delivery-address'])
  }

  viewPages(){
    this.router.navigate(['/tabs/profile/pages'])
  }

  viewProfile(){
    this.isProfileView = true;
  }

  logout(){
    localStorage.clear()
    this.router.navigate(['/login']);
  }

}
