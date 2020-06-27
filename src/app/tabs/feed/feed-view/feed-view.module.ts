import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { LoaderComponentModule } from '../../../loader/loader.module';

import { FeedViewPageRoutingModule } from './feed-view-routing.module';
import { FeedViewPage } from './feed-view.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoaderComponentModule,
    FeedViewPageRoutingModule
  ],
  declarations: [FeedViewPage]
})
export class FeedViewPageModule {}
