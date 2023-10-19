import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GovorgassetComponent } from './govorgasset.component';

describe('GovorgassetComponent', () => {
  let component: GovorgassetComponent;
  let fixture: ComponentFixture<GovorgassetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GovorgassetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GovorgassetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
