import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonService } from '../../../services/common/common.service';
import { ObsService } from './../../../services/observer/obs.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-feed-view',
  templateUrl: './feed-view.page.html',
  styleUrls: ['./feed-view.page.scss'],
})
export class FeedViewPage implements OnInit, OnDestroy {

  isLoading: boolean = false;
  feedArr: any;
  userLogin: any;
  feedId: any;
  category: String;
  subscription: Subscription;
  constructor(
    
    private _activatedRoute: ActivatedRoute,
    private _services: CommonService,
    private _router: Router
  ) {    

    this.subscription = this._activatedRoute.paramMap.subscribe( (res:any) => {
      if (res.params && res.params.id) {
        this.feedId = res.params.id;
      }
    });
  }
  

  ngOnInit() {
    this.userLogin = this._services.getUser();
    this.getSingleFeed(this.feedId);
  }

  getSingleFeed(id){
    this.isLoading = true;
    this._services.getSingleFeed({id: id}).then(res => { 
      this.isLoading = false;  
      if(res['code']==200){
        this.feedArr = res['data'];
        if(this.feedArr.category){
          this.category = this.feedArr.category.map(data => data.name).join(' , ')
        }
      }else{
        return this._services.presentToast(res['message'], 3000, 'middle');
      }
    }).catch(err => {
      this.isLoading = false;
      return this._services.presentToast(err.error.message, 3000, 'middle');
    });
  }

  back(){
    this._router.navigate(['/tabs/feed'])
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }


}
