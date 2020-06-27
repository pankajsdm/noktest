import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from './../../../environments/environment';
import { AlertController, ToastController } from '@ionic/angular';
import { encodeParams } from './../utils';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  apiUrl:string = environment.apiUrl;
  googleMapUrl = "https://maps.googleapis.com/maps/api/geocode/json?address=";
  constructor(
    private http: HttpClient,
    public alertCtrl: AlertController,
    private toastCtrl: ToastController
  ) { }

 
  public async createFeed(data) {
    const headers = new HttpHeaders().set("Content-Type", "application/x-www-form-urlencoded")
    return await this.http.post(`${this.apiUrl}/feed/create`, encodeParams(data), {headers}).toPromise();
  }

  public async updateFevourite(data) {
    const headers = new HttpHeaders().set("Content-Type", "application/x-www-form-urlencoded")
    return await this.http.post(`${this.apiUrl}/feed/update-fevourite`, encodeParams(data), {headers}).toPromise();
  }

  public async getFeeds(data) {
    const headers = new HttpHeaders().set("Content-Type", "application/json")
    return await this.http.get(`${this.apiUrl}/feed/get-feeds/`, {params: data, headers: headers}).toPromise();
  }

  public async getAddress(address) {
    const headers = new HttpHeaders().set("Content-Type", "application/json")
    return await this.http.get(`${this.googleMapUrl}${address}&key=${environment.googleKey}`, {headers: headers}).toPromise();
  }

  public async getSingleFeed(data) {
    const headers = new HttpHeaders().set("Content-Type", "application/json")
    return await this.http.get(`${this.apiUrl}/feed/get-single-feed`, {params: data, headers: headers}).toPromise();
  }
  

  public async getCategory() {
    const headers = new HttpHeaders().set("Content-Type", "application/json")
    return await this.http.get(`${this.apiUrl}/feed/get-category`, {headers: headers}).toPromise();
  }

  public async getApiUser(data) {
    const headers = new HttpHeaders().set("Content-Type", "application/json")
    return await this.http.get(`${this.apiUrl}/user/get-users`, {params: data, headers: headers}).toPromise();
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


