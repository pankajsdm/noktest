import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {

  user: any;
  userId: any;
  isLoading: boolean = true;
  selectedFile = "assets/icon/mail.png";

  constructor(
    private auth: AuthService,
    private _router: Router,
    private _route: ActivatedRoute
  ) { 
    this.userId = this._route.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this.profile(this.userId);
  }

  doRefresh(event) {
    this.profile(this.userId);
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

  backToExplore(){
    this._router.navigate(['/tabs/explore']);
  }

}
