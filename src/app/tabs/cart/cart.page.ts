import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonService } from '../../services/common/common.service';
import { ObsService } from './../../services/observer/obs.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {

  isLoading: boolean = false;
  cartArr: any;
  userLogin: any;
  feedId: any;
  category: String;
  total: Number;
  subscription: Subscription;

  constructor(  
    private _activatedRoute: ActivatedRoute,
    private _services: CommonService,
    private _router: Router
  ) {    
  }
  

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.userLogin = this._services.getUser();
    this.getCart();
  }

  async getCart(){
    this.isLoading = true;
    if(JSON.parse(localStorage.getItem('cartItem'))){
      this.isLoading = false;
      this.cartArr = JSON.parse(localStorage.getItem('cartItem'));
      this.total = this.cartArr.reduce((result,item) => {
        return result + parseInt(item.price);
      }, 0);
      this.cartArr = JSON.parse(localStorage.getItem('cartItem'));
    }
  }

  continueForPayment(){
    this._router.navigate(['/tabs/favorite/payment']);
  }

  doRefresh(event) {
    this.getCart();
    if(event !== '')
      event.target.complete()
  }

  goToFeed(){
    this._router.navigate([`/tabs/feed`])
  }


 
}
