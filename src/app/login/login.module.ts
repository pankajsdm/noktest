import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { LoginPage } from './login.page';
import { LoaderComponentModule } from '../loader/loader.module';

const routes: Routes = [
  {
    path: '',
    component: LoginPage
  }
];

@NgModule({
  imports: [
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    IonicModule,
    LoaderComponentModule,
    RouterModule.forChild(routes)
  ],
  declarations: [LoginPage]
})
export class LoginPageModule {}
