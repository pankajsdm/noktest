import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { FeedPageRoutingModule } from './feed-routing.module';
import { FeedPage } from './feed.page';
import { LoaderComponentModule } from '../../loader/loader.module';
import { IsFevoritePipeModule } from '../../_pipes/fevorite/isFevorite.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoaderComponentModule,
    FeedPageRoutingModule,
    IsFevoritePipeModule
  ],
  declarations: [FeedPage]
})
export class FeedPageModule {}
