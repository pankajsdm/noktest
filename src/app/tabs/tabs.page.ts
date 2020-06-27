import { Component, ViewChild } from '@angular/core';
import { IonTabs } from '@ionic/angular';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  @ViewChild('tabs', {read: "", static: true}) tabs: IonTabs;
  resetStackTabs = ['favorite'];

  constructor(
  ) {
  }

  handleTabClick(event: MouseEvent){
    const { tab } = event.composedPath().find((element: any) =>
    element.tagName === 'ION-TAB-BUTTON') as EventTarget & { tab: string };
    // without checking resetStackTabs this will work for any tab
    if (this.resetStackTabs.includes(tab) &&
        this.tabs.outlet.canGoBack(1, tab)) {
          console.log("i am going back")
        event.stopImmediatePropagation();
        // here we may need pop depth more than one if we handle deeper nav for a tab
        return this.tabs.outlet.pop(1, tab);
    }
  }

}
