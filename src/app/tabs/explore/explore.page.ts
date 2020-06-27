import { Component, OnInit, AfterViewInit } from '@angular/core';

import { MenuController } from '@ionic/angular';
import { CommonService } from '../../services/common/common.service';
import { Router } from '@angular/router';
declare var google: any;

@Component({
  selector: 'app-explore',
  templateUrl: './explore.page.html',
  styleUrls: ['./explore.page.scss'],
})
export class ExplorePage implements OnInit {

  latitude: Number;
  longitude: Number;
  userLogin: any;
  isShowOptions: boolean = false;
  users: any = [];
  map: any;
  markers: any = [];

  constructor(
    private _services: CommonService,
    private menu: MenuController,
    private _router: Router
  ) {}

  ngOnInit(){
    this.userLogin = this._services.getUser();
  }

  ionViewDidEnter(){
  }

  showOptions(){
    this.isShowOptions = true;
  }

  backFromOption(){
    this.isShowOptions = false;
  }

  getUsers(id){
    this._services.getApiUser({id: id}).then(res => {
      if(res['code']==200){
        this.users = res;
        this.markers = this.users['data'].reduce( (acc, arr) => {
          acc.push({
            userId: arr.id,
            lat: arr.location.split(',')[0],
            lng: arr.location.split(',')[1],
          });
          return acc;
        },[]);

      }
    }).catch(error => {
      console.log('Error getting users', error);
    })
  }


  openMenu(){
    this.menu.open('navigation');
  }

}
