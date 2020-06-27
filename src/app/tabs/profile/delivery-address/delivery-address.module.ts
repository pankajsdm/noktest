import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { DeliveryAddressPageRoutingModule } from './delivery-address-routing.module';
import { DeliveryAddressPage } from './delivery-address.page';
import { LoaderComponentModule } from '../../../loader/loader.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    LoaderComponentModule,
    DeliveryAddressPageRoutingModule
  ],
  declarations: [DeliveryAddressPage]
})
export class DeliveryAddressPageModule {}
