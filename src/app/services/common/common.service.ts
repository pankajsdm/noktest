import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from './../../../environments/environment';
import { AlertController, ToastController } from '@ionic/angular';
import { encodeParams } from './../utils';
import { HTTP } from '@ionic-native/http/ngx';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  apiUrl:string = environment.apiUrl;
  googleMapUrl = "https://maps.googleapis.com/maps/api/geocode/json?address=";
  constructor(
    private http: HttpClient,
    private nativeHttp: HTTP,
    public alertCtrl: AlertController,
    private toastCtrl: ToastController
  ) { }


  headerDict(){
    return  {
      "Access-Control-Allow-Origin" : "*",
      "Access-Control-Allow-Methods" : "POST, GET, OPTIONS, PUT",
      "Accept" : "application/json",
      "Content-type" : "application/json",
    } 
  }

  headerUrlEncoded(){
    return  {
      "Access-Control-Allow-Origin" : "*",
      "Access-Control-Allow-Methods" : "POST, GET, OPTIONS, PUT",
      "Accept" : "application/json",
      "Content-type" : "application/x-www-form-urlencoded",
    } 
  }

 
  
  public async createFeed(data) {
    this.nativeHttp.setDataSerializer('urlencoded');
    return await this.nativeHttp.post(`${this.apiUrl}/feed/create`, data, this.headerUrlEncoded()).then(res =>{
      return JSON.parse(res.data)
    });
  }

 /*  public async createFeed(data) {
    const headers = new HttpHeaders().set("Content-Type", "application/x-www-form-urlencoded")
    return await this.http.post(`${this.apiUrl}/feed/create`, encodeParams(data), {headers}).toPromise();
  } */

  public async updateFevourite(data) {
    this.nativeHttp.setDataSerializer('json');
    return await this.nativeHttp.post(`${this.apiUrl}/feed/update-fevourite`, data, this.headerDict()).then(res =>{
      return JSON.parse(res.data)
    });
  }

  public async getFeeds(data) {
    this.nativeHttp.setDataSerializer('json');
    return await this.nativeHttp.get(`${this.apiUrl}/feed/get-feeds/`, data, this.headerDict()).then(res =>{
      return JSON.parse(res.data)
    });
  }

  public async getAddress(address) {
    this.nativeHttp.setDataSerializer('json');
    return await this.nativeHttp.get(`${this.googleMapUrl}${address}&key=${environment.googleKey}`, {},  this.headerDict()).then(res =>{
      return JSON.parse(res.data)
    });
  }

  public async getSingleFeed(data) {
    this.nativeHttp.setDataSerializer('json');
    return await this.nativeHttp.get(`${this.apiUrl}/feed/get-single-feed`, data, this.headerDict()).then(res =>{
      return JSON.parse(res.data)
    });
  }
  

  public async getCategory() {
    this.nativeHttp.setDataSerializer('json');
    return await this.nativeHttp.get(`${this.apiUrl}/feed/get-category`, {}, this.headerDict()).then(res =>{
      return JSON.parse(res.data)
    });
  }

  public async getApiUser(data) {
    this.nativeHttp.setDataSerializer('json');
    return await this.nativeHttp.get(`${this.apiUrl}/user/get-users`, data, this.headerDict()).then(res =>{
      return JSON.parse(res.data)
    });
  }

  public getUser(){
    return JSON.parse(localStorage.getItem('userData'))
  }

  async presentToast(message, duration, position) {
    let toast = await this.toastCtrl.create({
      message: message,
      duration: duration,
      position: position
    });
    await toast.present();
  }

  async presentAlert(header:string, loginMsg: string, button:string) {
    const alert = await this.alertCtrl.create({
      header: header,
      message: loginMsg,
      buttons: [button]
    });
    await alert.present();
  }

}


