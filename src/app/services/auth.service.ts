import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from './../../environments/environment';
import { AlertController, ToastController } from '@ionic/angular';
import { encodeParams } from './utils';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  apiUrl:string = environment.apiUrl;

  constructor(
    private http: HttpClient,
    public alertCtrl: AlertController,
    private toastCtrl: ToastController
  ) { }

  public async login(data) {
    const headers = new HttpHeaders().set("Content-Type", "application/x-www-form-urlencoded")
    return await this.http.post(`${this.apiUrl}/user/login`, data).toPromise();
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


