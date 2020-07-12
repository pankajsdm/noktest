import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from './../../environments/environment';
import { AlertController, ToastController } from '@ionic/angular';
import { encodeParams } from './utils';
import { HTTP } from '@ionic-native/http/ngx';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl:string = environment.apiUrl;

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


  public async login(data) {
    this.nativeHttp.setDataSerializer('json');
    return await this.nativeHttp.post(`${this.apiUrl}/user/login`, data, this.headerDict()).then(res =>{
      return JSON.parse(res.data)
    });
  }

  public async register(data) {
    return await this.nativeHttp.post(`${this.apiUrl}/user/register`, data, this.headerDict()).then(res =>{
      return JSON.parse(res.data)
    });

  }

  public async getProfile(id) {
    const headers = new HttpHeaders().set("Content-Type", "application/json")
    return await this.http.get(`${this.apiUrl}/user/get-profile?id=${id}`, {headers}).toPromise();
  }

  public async updateProfilePicture(data){
    const headers = new HttpHeaders().set("Content-Type", "application/x-www-form-urlencoded")
    return await this.http.post(`${this.apiUrl}/user/update-profile-pic`, encodeParams(data), {headers}).toPromise();
  }

  public async updateProfile(data) {
    const headers = new HttpHeaders().set("Content-Type", "application/x-www-form-urlencoded")
    return await this.http.post(`${this.apiUrl}/user/update-profile`, encodeParams(data), {headers}).toPromise();
  }

  public async updateDeliveryAddress(data) {
    const headers = new HttpHeaders().set("Content-Type", "application/x-www-form-urlencoded")
    return await this.http.post(`${this.apiUrl}/user/update-delivery-address`, encodeParams(data), {headers}).toPromise();
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


