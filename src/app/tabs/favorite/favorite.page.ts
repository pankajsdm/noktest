import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
import { CommonService } from '../../services/common/common.service';
import { ObsService } from './../../services/observer/obs.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.page.html',
  styleUrls: ['./favorite.page.scss'],
})
export class FavoritePage implements OnInit {

 
  isLoading: boolean = false;
  favoriteArr = [];
  posts: any
  subscription: Subscription;

  constructor(
    private menu: MenuController,
    private _router: Router,
    private _event: ObsService,
    private _services: CommonService,
  ) {

    this.subscription = this._event.get().subscribe(res => {
      if(res && res.key=='fevourite-updated'){
        this.getFavorite();
      }
    });
    
  }

  ngOnInit(){}
  
  ionViewWillEnter() {
    this.getFavorite();
  }

  doRefresh(event) {
    this.getFavorite();
    if(event !== '')
      event.target.complete()
  }

  getFavorite(){
    this.isLoading = true;
    if(JSON.parse(localStorage.getItem('favItem'))){
      this.isLoading = false;
      this.favoriteArr = JSON.parse(localStorage.getItem('favItem'));
    }else{
      this.isLoading = false;
    }
  }

  viewFeed(id){
    this._router.navigate([`/tabs/feed/feed-view/${id}`])
  }

  viewCart(){
    this._router.navigate([`/tabs/cart`])
  }

  goToFeed(){
    this._router.navigate([`/tabs/feed`])
  }

  delete(index){
    this.favoriteArr.splice(index, 1);
    localStorage.setItem('favItem', JSON.stringify(this.favoriteArr));
    this._event.set('true', 'feed-updated');
  }

  ngOnDestroy(){
    this.favoriteArr = [];
    this.subscription.unsubscribe();
  }

}
