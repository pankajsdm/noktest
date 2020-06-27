import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FeedSavePage } from './feed-save.page';

describe('FeedSavePage', () => {
  let component: FeedSavePage;
  let fixture: ComponentFixture<FeedSavePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeedSavePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FeedSavePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
