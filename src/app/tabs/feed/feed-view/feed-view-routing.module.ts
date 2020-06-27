import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FeedViewPage } from './feed-view.page';

const routes: Routes = [
  {
    path: '',
    component: FeedViewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FeedViewPageRoutingModule {}
