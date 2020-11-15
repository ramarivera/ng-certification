import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationsForecastPageComponent } from './locations-forecast-page.component';

describe('LocationsForecastPageComponent', () => {
  let component: LocationsForecastPageComponent;
  let fixture: ComponentFixture<LocationsForecastPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocationsForecastPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationsForecastPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
