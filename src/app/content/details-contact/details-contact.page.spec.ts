import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DetailsContactPage } from './details-contact.page';

describe('DetailsContactPage', () => {
  let component: DetailsContactPage;
  let fixture: ComponentFixture<DetailsContactPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsContactPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DetailsContactPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
