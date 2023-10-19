import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GovPopulationNumberComponent } from './gov-population-number.component';

describe('GovPopulationNumberComponent', () => {
  let component: GovPopulationNumberComponent;
  let fixture: ComponentFixture<GovPopulationNumberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GovPopulationNumberComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GovPopulationNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
