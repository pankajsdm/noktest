import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonService } from '../../services/common/common.service';
import { ObsService } from './../../services/observer/obs.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-feed',
  templateUrl: './feed.page.html',
  styleUrls: ['./feed.page.scss'],
})
export class FeedPage implements OnInit, OnDestroy {

  
  isLoading: boolean = false;
  feedArr: any = [];
  posts: any
  currentUser: any;
  subscription: Subscription;
  cartArr = [];
  favoriteArr = [];
  isCartItem:boolean = false;
 
  constructor(
    private menu: MenuController,
    private router: Router,
    private _event: ObsService,
    private route: ActivatedRoute,
    private _services: CommonService,
  ) {

    /* this.subscription = this._event.get().subscribe(res => {
      if(res && res.key=='feed-updated'){
        this.favoriteArr = [];
        this.getFeeds();
      }
    }); */
    
  }

  ngOnInit() {}

  ionViewWillEnter() {
    this.currentUser = this._services.getUser();
    this.getFeeds();
    
    if(JSON.parse(localStorage.getItem('cartItem')))
      this.isCartItem = true;
    else
      this.isCartItem = false;
    
  }
  
  doRefresh(event) {
    this.getFeeds();
    if(event !== '')
      event.target.complete()
  }

  getFeeds(){
    this.isLoading = true;
    let  data = { userId: this.currentUser.ID }
    this._services.getFeeds(data).then(async res => { 
      this.isLoading = false;  
      if(res['code']==200){
       
        let storageFavList = JSON.parse(localStorage.getItem('favItem'));
        let storageCartList = JSON.parse(localStorage.getItem('cartItem'));
        
        let updatedFeed = await res['data'].map(data =>{
          let isFevorite = false;
          let isCart = false;
         
          if(storageFavList && storageFavList.length>0){
            storageFavList.filter( favItem =>{
              if(favItem.id===data.id) 
                isFevorite = true;
            });
            data['isFevorite'] = isFevorite;
          }

          if(storageCartList && storageCartList.length>0){
            storageCartList.filter( cartItem =>{
              if(cartItem.id===data.id) 
                isCart = true;
            });
            data['isCart'] = isCart;
          }

          return data;
        });

        this.feedArr = updatedFeed;
      }else{
        return this._services.presentToast(res['message'], 3000, 'middle');
      }
    }).catch(err => {
      this.isLoading = false;
      return this._services.presentToast(err, 3000, 'middle');
    });
  }



  setCart(index, id){
    let storageCartList = JSON.parse(localStorage.getItem('cartItem'));
    if(storageCartList && storageCartList.length>0){
      let isIdAvailable =  storageCartList.filter(storage => (storage.id==id && storage['isCart']));
      if(isIdAvailable.length==0){
        this.feedArr[index]['isCart'] = true;
        storageCartList.push(this.feedArr[index]); 
        localStorage.setItem('cartItem', JSON.stringify(storageCartList));
      }else{
        let unlist = storageCartList.filter(res => res.id!=id); 
        this.feedArr[index]['isCart'] = false;
        localStorage.setItem('cartItem', JSON.stringify(unlist))
      }
    }else{
      this.feedArr[index]['isCart'] = true;
      localStorage.setItem('cartItem', JSON.stringify([this.feedArr[index]]))
    }
  }

  setFavorite(index, id){
    let storageFavList = JSON.parse(localStorage.getItem('favItem'));
    if(storageFavList && storageFavList.length>0){
      let isIdAvailable =  storageFavList.filter(storage => (storage.id==id && storage['isFevorite']));
      if(isIdAvailable.length==0){
        this.feedArr[index]['isFevorite'] = true;
        storageFavList.push(this.feedArr[index]); 
        localStorage.setItem('favItem', JSON.stringify(storageFavList));
      }else{
        let unlist = storageFavList.filter(res => res.id!=id); 
        this.feedArr[index]['isFevorite'] = false;
        localStorage.setItem('favItem', JSON.stringify(unlist))
      }
    }else{
      this.feedArr[index]['isFevorite'] = true;
      localStorage.setItem('favItem', JSON.stringify([this.feedArr[index]]))
    }
  }

  addFeed(){
    this.router.navigate(['/tabs/feed/feed-save'])
  }

  viewFeed(id){
    this.router.navigate([`/tabs/feed/feed-view/${id}`])
  }

  viewCart(){
    this.router.navigate([`/tabs/cart`])
  }

  ngOnDestroy(){
    //this.subscription.unsubscribe();
  }

}
