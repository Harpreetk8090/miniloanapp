import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeclinedlistComponent } from './declinedlist.component';

describe('DeclinedlistComponent', () => {
  let component: DeclinedlistComponent;
  let fixture: ComponentFixture<DeclinedlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeclinedlistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeclinedlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
