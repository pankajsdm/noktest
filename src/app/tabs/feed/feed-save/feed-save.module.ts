import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { FeedSavePageRoutingModule } from './feed-save-routing.module';
import { LoaderComponentModule } from '../../../loader/loader.module';
import { FeedSavePage } from './feed-save.page';

@NgModule({
  
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    FeedSavePageRoutingModule,
    LoaderComponentModule
  ],

  declarations: [FeedSavePage],

  providers: [ 
  ]

})
export class FeedSavePageModule {}






