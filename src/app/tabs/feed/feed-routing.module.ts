import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FeedPage } from './feed.page';

const routes: Routes = [
  {
    path: '',
    component: FeedPage
  },
  {
    path: 'feed-save',
    loadChildren: () => import('./feed-save/feed-save.module').then( m => m.FeedSavePageModule)
  },
  {
    path: 'feed-view/:id',
    loadChildren: () => import('./feed-view/feed-view.module').then( m => m.FeedViewPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FeedPageRoutingModule {}
