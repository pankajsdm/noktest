import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FeedSavePage } from './feed-save.page';

const routes: Routes = [
  {
    path: '',
    component: FeedSavePage
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class FeedSavePageRoutingModule {}
