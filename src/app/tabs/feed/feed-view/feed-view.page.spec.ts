import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FeedViewPage } from './feed-view.page';

describe('FeedViewPage', () => {
  let component: FeedViewPage;
  let fixture: ComponentFixture<FeedViewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeedViewPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FeedViewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
